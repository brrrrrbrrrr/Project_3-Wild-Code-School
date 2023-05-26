/* eslint-disable import/no-extraneous-dependencies */
const Joi = require("joi").extend(require("@joi/date"));
const path = require("path");
const fs = require("fs");
const models = require("../models");
const { hashPassword } = require("../utils/auth");

const validateConsultant = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    name: Joi.string().max(45).presence(presence),
    firstname: Joi.string().max(45).presence(presence),
    mail: Joi.string().max(45).email().presence(presence),
    phone: Joi.string().max(45).presence(presence),
    birthday: Joi.date().format("YYYY-MM-DD").presence(presence),
    password: Joi.string().max(200).presence(presence),
    street: Joi.string().max(45).presence(presence),
    city: Joi.string().max(45).presence(presence),
    postalCode: Joi.string().max(45).presence(presence),
    picture: Joi.string().max(45).presence("optional"),
    superAdmin: Joi.number().integer().min(0).max(1).presence(presence),
    gender: Joi.string().max(45).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const validateConsultantCreationData = (req, res, next) => {
  const consultant = req.body;
  const errors = validateConsultant(consultant, true);
  if (errors) {
    console.warn(errors);
    res.sendStatus(422);
  } else {
    next();
  }
};

const validateConsultantLoginData = (req, res, next) => {
  const loginData = req.body;
  const errors = Joi.object({
    mail: Joi.string().max(45).email().required(),
    password: Joi.string().max(200).required(),
  }).validate(loginData, { abortEarly: false }).error;
  if (errors) {
    console.warn(errors);
    res.sendStatus(422);
  } else {
    next();
  }
};

const browse = (req, res) => {
  models.consultant
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.consultant
    .find(parseInt(req.params.id, 10))
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const item = req.body;

  // TODO validations (length, format...)

  item.id = parseInt(req.params.id, 10);

  models.item
    .update(item)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const login = (req, res, next) => {
  const { mail } = req.body;
  console.warn("Info authentif : ", mail);
  // TODO validations (length, format...)

  models.consultant
    .getUserWithPassword(mail)
    .then(([result]) => {
      if (result.length === 0) {
        res.sendStatus(404);
      } else {
        [req.consultant] = result;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = async (req, res) => {
  // TODO validations (length, format...)
  // Valider les données avec Joi
  // Si les données sont valides, continuer le traitement
  const {
    name,
    firstname,
    mail,
    phone,
    birthday,
    password,
    street,
    city,
    postalCode,
    valide,
    superAdmin,
    gender,
  } = req.body;
  const filePicture = req.file;

  const consultantFolderDefault = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "recruiter"
  );
  const consultantFolder = req.pathFolder;
  const picture = `consultant/${filePicture.filname}`;
  const validationError = validateConsultant(req.body);
  if (validationError) {
    // Si les données ne sont pas valides, renvoyer une erreur 400
    res.status(422).json({ error: validationError.message }); // Utiliser validationError.message pour obtenir le message d'erreur
  }
  const hashedPassword = await hashPassword(password);
  models.consultant
    .insert({
      name,
      firstname,
      mail,
      picture,
      phone,
      birthday,
      password: hashedPassword,
      street,
      city,
      postalCode,
      valide,
      superAdmin,
      gender,
    })
    .then(([result]) => {
      // Je recupere l'id de mon nouvel utilisateur
      const idNewUser = result.insertId.toString();
      // console.log("result :", result);
      const newFolder = path.join(consultantFolderDefault, idNewUser);
      fs.renameSync(consultantFolder, newFolder, (err) => {
        console.warn("rename folder :", err);
      });
      // Je recupere le nom des fichiers et j'enleve les caractères spéciaux et je rajoute l'extention

      const extension = filePicture.originalname.split(".").pop();
      const newOriginalNamePicture = `${filePicture.originalname
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "")}.${extension}`;
      const originalNamePicture = path.join(newFolder, newOriginalNamePicture);
      const fileNamePicture = path.join(newFolder, filePicture.filename);
      const newFileNamePicture = `uploads/consultant/${idNewUser}/${newOriginalNamePicture}`;
      fs.renameSync(fileNamePicture, originalNamePicture, (err) => {
        if (err) {
          console.warn("erreur Picture :", err);
        }
      });
      models.consultant
        .updatePicture(newFileNamePicture, idNewUser)
        .then(() => {
          console.warn("Update successful");
          return res.location(`/consultant/${result.insertId}`).sendStatus(201);
        })
        .catch((error) => {
          console.error(error);
          return res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).send("Mail already exists"); // Ajouter le mot-clé 'return' avant d'appeler res.status()
      }
      return res.sendStatus(500); // Ajouter le mot-clé 'return' avant d'appeler res.sendStatus()
    });
};

const destroy = (req, res) => {
  models.consultant
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  login,
  validateConsultantCreationData,
  validateConsultantLoginData,
};
