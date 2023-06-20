/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const joi = require("joi");
const path = require("path");
const fs = require("fs");
const models = require("../models");
const { hashPassword } = require("../utils/auth");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      compagny_id: joi.number().integer().presence(presence),
      name: joi.string().max(45).presence(presence),
      firstname: joi.string().max(45).presence(presence),
      mail: joi.string().email().presence(presence),
      phone: joi.string().max(45).presence(presence),
      birthday: joi.date().iso().presence(presence),
      password: joi.string().max(200).presence(presence),
      newPassword: joi.string().max(45).presence("optional"),
      street: joi.string().max(45).presence(presence),
      city: joi.string().max(45).presence(presence),
      postalCode: joi.string().max(45).presence(presence),
      valide: joi.number().valid(0, 1).presence("optional"),
      gender: joi.string().max(45).presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

const browse = (req, res) => {
  models.recruiter
    .findAll()
    .then(([rows]) => {
      const recruiters = rows.map((recruiter) => ({
        ...recruiter,
        userType: "recruiters",
      }));
      res.send(recruiters); // Inclure la propriété userType dans la réponse
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.recruiter
    .find(parseInt(req.params.id, 10))
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        const recruiter = { ...rows[0], userType: "recruiters" };
        res.send(recruiter);
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
    compagny_id,
    gender,
  } = req.body;
  const filePicture = req.file;

  const recruiterFolderDefault = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "recruiter"
  );
  const recruiterFolder = req.pathFolder;
  const picture = `recruiter/${filePicture.filname}`;
  const validationError = validate(req.body);
  if (validationError) {
    // Si les données ne sont pas valides, renvoyer une erreur 400
    res.status(422).json({ error: validationError.message }); // Utiliser validationError.message pour obtenir le message d'erreur
  }
  const hashedPassword = await hashPassword(password);
  models.recruiter
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
      compagny_id,
      gender,
    })
    .then(([result]) => {
      // Je recupere l'id de mon nouvel utilisateur
      const idNewUser = result.insertId.toString();

      const newFolder = path.join(recruiterFolderDefault, idNewUser);
      fs.renameSync(recruiterFolder, newFolder, (err) => {
        console.warn("rename folder :", err);
      });
      // Je recupere le nom des fichiers et j'enleve les caractères spéciaux et je rajoute l'extention

      const extension = filePicture.originalname.split(".").pop();
      const newOriginalNamePicture = `${filePicture.originalname
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "")}.${extension}`;
      const originalNamePicture = path.join(newFolder, newOriginalNamePicture);
      const fileNamePicture = path.join(newFolder, filePicture.filename);
      const newFileNamePicture = `uploads/recruiter/${idNewUser}/${newOriginalNamePicture}`;
      fs.renameSync(fileNamePicture, originalNamePicture, (err) => {
        if (err) {
          console.warn("erreur Picture :", err);
        }
      });
      models.recruiter
        .updatePicture(newFileNamePicture, idNewUser)
        .then(() => {
          return res.location(`/recruiter/${result.insertId}`).sendStatus(201);
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
  const idPayload = req.payload.sub.id;
  const { id } = req.params;
  if (id !== idPayload) {
    return res.sendStatus(401);
  }
  models.recruiter
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

const getRecruiterByIdToNext = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const idPayload = req.payload.sub.id;
  if (id !== idPayload) {
    return res.sendStatus(401);
  }
  const [result] = await models.recruiter.findById(id);
  if (result) {
    if (result[0] != null) {
      // eslint-disable-next-line prefer-destructuring
      req.recruiter = result[0];
      next();
    } else return res.sendStatus(401);
  } else return res.sendStatus(500);
};

const edit = async (req, res) => {
  const recruiter = req.body;
  const errors = validate(recruiter, false);
  if (errors) {
    console.error(errors);
    return res.status(422).send(errors);
  }

  if (recruiter.password) {
    const hashedPassword = await hashPassword(req.body.password);
    recruiter.password = hashedPassword;
  }

  recruiter.id = parseInt(req.params.id, 10);

  try {
    const [result] = await models.recruiter.update(recruiter);

    if (result.affectedRows === 0) {
      return res.sendStatus(404);
    }
    if (req.file) {
      const filePicture = req.file;

      const extension = filePicture.originalname.split(".").pop();
      const newOriginalNamePicture = `${filePicture.originalname
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "")}.${extension}`;
      const recruiterFolder = req.pathFolder;
      const newFileNamePicture = `uploads/recruiter/${req.params.id}/${newOriginalNamePicture}`;

      const originalNamePicture = path.join(
        recruiterFolder,
        newOriginalNamePicture
      );
      const fileNamePicture = path.join(recruiterFolder, filePicture.filename);

      fs.renameSync(fileNamePicture, originalNamePicture, (err) => {
        if (err) {
          console.warn("erreur Picture :", err);
        }
      });
      await models.recruiter.updatePicture(newFileNamePicture, recruiter.id);
    }
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

const editPassword = async (req, res) => {
  const { newPassword } = req.body;
  const id = parseInt(req.params.id, 10);
  const errors = validate({ newPassword }, false);

  const hashedPassword = await hashPassword(newPassword);
  if (errors) {
    console.error(errors);
    return res.status(422).send(errors);
  }

  models.recruiter
    .updatePassword(hashedPassword, id)
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

const getRecruiterByLoginToNext = async (req, res, next) => {
  const { mail } = req.body;
  if (!mail) {
    return res.sendStatus(422);
  }
  const result = await models.recruiter.getRecruiterByLogin(mail);
  if (result) {
    if (result[0] != null) {
      const userType = "recruiters";
      req.recruiter = { ...result[0], userType };
      next();
    } else return res.sendStatus(401);
  } else return res.sendStatus(500);
};

const adminDelete = (req, res) => {
  models.recruiter
    .deleteadmin(req.params.id)
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
  add,
  destroy,
  getRecruiterByLoginToNext,
  edit,
  getRecruiterByIdToNext,
  editPassword,
  adminDelete,
};
