/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
const joi = require("joi");
const path = require("path");
const fs = require("fs");
const models = require("../models");
const { hashPassword } = require("../utils/compagnyAuth");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      siretNumber: joi.string().max(45).presence(presence),
      name: joi.string().max(45).presence(presence),
      mail: joi.string().email().presence(presence),
      phone: joi.string().max(45).presence(presence),
      password: joi.string().max(200).presence(presence),
      Valide: joi.number().valid(0, 1).presence("optional"),
      Logo: joi.string().allow(null, "").presence("optional"),
    })
    .validate(data, { abortEarly: false }).error;
};

const getCompagny = (req, res) => {
  models.compagny
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
  models.compagny
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

const postCompagny = async (req, res) => {
  // TODO validations (length, format...)
  // Valider les données avec Joi
  const validationError = validate(req.body);

  if (validationError) {
    // Si les données ne sont pas valides, renvoyer une erreur 400
    res.status(422).json({ error: validationError.message }); // Utiliser validationError.message pour obtenir le message d'erreur
  } else {
    // Si les données sont valides, continuer le traitement
    const { siretNumber, name, mail, phone, password, Valide } = req.body;
    const hashedPassword = await hashPassword(password);
    const compagnyFolderDefault = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "uploads",
      "compagny"
    );
    const compagnyFolder = req.pathFolder;
    const fileLogo = req.file;
    const logo = `compagny/${fileLogo.filename}`;

    models.compagny
      .insertCompagny({
        siretNumber,
        name,
        mail,
        phone,
        password: hashedPassword,
        Valide,
        Logo: logo,
      })
      .then(([result]) => {
        // Je recupere l'id de mon nouvel utilisateur
        const idNewUser = result.insertId.toString();

        const newFolder = path.join(compagnyFolderDefault, idNewUser);
        fs.renameSync(compagnyFolder, newFolder, (err) => {
          console.warn("rename folder :", err);
        });
        // Je recupere le nom des fichiers et j'enleve les caractères spéciaux et je rajoute l'extention
        const extension = fileLogo.originalname.split(".").pop();
        const newOriginalNameLogo = `${fileLogo.originalname
          .split(".")[0]
          .replace(/[^a-zA-Z0-9]/g, "")}.${extension}`;
        // Je recupere mon ancien et nouveau chemin
        const originalNameLogo = path.join(newFolder, newOriginalNameLogo);
        const fileNameLogo = path.join(newFolder, fileLogo.filename);
        const newFileNameLogo = `uploads/compagny/${idNewUser}/${newOriginalNameLogo}`;
        fs.renameSync(fileNameLogo, originalNameLogo, (err) => {
          console.warn("erreur Logo :", err);
        });

        models.compagny
          .updateFiles(newFileNameLogo, idNewUser)
          .then(() => {
            console.warn("Update succesful");
            return res
              .location(`/candidates/${result.insertId}`)
              .sendStatus(201);
          })
          .catch((error) => {
            console.error(error);
            return res.sendStatus(500);
          });
      })
      .catch((err) => {
        console.error(err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).send("Mail already exist"); // Ajouter le mot-clé 'return' avant d'appeler res.status()
        }
        return res.sendStatus(500); // Ajouter le mot-clé 'return' avant d'appeler res.sendStatus()
      });
  }
};

const updateCompagny = (req, res) => {
  const item = req.body;

  // TODO validations (length, format...)

  item.id = parseInt(req.params.id, 10);

  models.compagny
    .updateCompagny(item)
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

const deleteCompagny = (req, res) => {
  models.compagny
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

const getUserByEmailWithPasswordAndPassToNext = async (req, res, next) => {
  const { mail } = req.body;
  if (!mail) {
    return res.sendStatus(422);
  }
  const result = await models.compagny.getUserByLogin(mail);
  if (result) {
    if (result[0] != null) {
      const userType = "compagny";
      req.compagny = { ...result[0], userType };
      next();
    } else return res.sendStatus(401);
  } else return res.sendStatus(500);
};

module.exports = {
  getCompagny,
  read,
  postCompagny,
  updateCompagny,
  deleteCompagny,
  getUserByEmailWithPasswordAndPassToNext,
};
