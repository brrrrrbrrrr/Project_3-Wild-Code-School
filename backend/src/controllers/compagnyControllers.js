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
      newPassword: joi.string().max(45).presence("optional"),
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

const getCompagnyByIdToNext = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const idPayload = req.payload.sub.id;
  if (id !== idPayload) {
    return res.sendStatus(401);
  }
  const [result] = await models.compagny.findById(id);
  if (result) {
    if (result[0] != null) {
      // eslint-disable-next-line prefer-destructuring
      req.compagny = result[0];
      next();
    } else return res.sendStatus(401);
  } else return res.sendStatus(500);
};

const validCompagny = (req, res) => {
  models.compagny
    .findvalid(parseInt(req.query.valid, 10))
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const validUpdate = (req, res) => {
  models.compagny
    .updatevalid(req.body.compagnyId)
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

const getMyRecruiters = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idPayload = req.payload.sub.id;

  if (id === idPayload) {
    models.compagny
      .findMyRecruiters(id)
      .then(([rows]) => {
        const recruiters = rows.map((recruiter) => ({
          ...recruiter,
          userType: "recruiters",
        }));
        res.send(recruiters);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(422);
  }
};

const getRecruiter = (req, res) => {
  const idRecruiter = parseInt(req.params.id, 10);
  const idCompagny = req.payload.sub.id;
  models.compagny
    .findRecruiter(idRecruiter, idCompagny)
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

const GetForDeleteRecruiter = (req, res, next) => {
  const idRecruiter = parseInt(req.params.id, 10);
  const idCompagny = req.payload.sub.id;
  models.compagny
    .findRecruiter(idRecruiter, idCompagny)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteRecruiter = (req, res) => {
  models.compagny
    .deleteRcruiter(req.params.id)
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

const updateCompagny = async (req, res) => {
  const compagny = req.body;
  const errors = validate(compagny, false);
  if (errors) {
    console.error(errors);
    return res.status(422).send(errors);
  }

  if (compagny.password) {
    const hashedPassword = await hashPassword(req.body.password);
    compagny.password = hashedPassword;
  }

  compagny.id = parseInt(req.params.id, 10);

  try {
    const [result] = await models.compagny.updateCompagny(compagny);

    if (result.affectedRows === 0) {
      return res.sendStatus(404);
    }
    if (req.file) {
      const fileLogo = req.file;

      const extension = fileLogo.originalname.split(".").pop();
      const newOriginalNameLogo = `${fileLogo.originalname
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "")}.${extension}`;
      const compagnyFolder = req.pathFolder;
      const newFileNameLogo = `uploads/compagny/${req.params.id}/${newOriginalNameLogo}`;

      const originalNameLogo = path.join(compagnyFolder, newOriginalNameLogo);
      const fileNameLogo = path.join(compagnyFolder, fileLogo.filename);

      fs.renameSync(fileNameLogo, originalNameLogo, (err) => {
        if (err) {
          console.warn("erreur Logo :", err);
        }
      });
      await models.compagny.updateFiles(newFileNameLogo, compagny.id);
    }
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

const deleteCompagny = (req, res) => {
  const idPayload = req.payload.sub.id;
  const { id } = req.params;
  if (id !== idPayload) {
    return res.sendStatus(401);
  }
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

const editPassword = async (req, res) => {
  const { newPassword } = req.body;
  const id = parseInt(req.params.id, 10);
  const errors = validate({ newPassword }, false);

  const hashedPassword = await hashPassword(newPassword);
  if (errors) {
    console.error(errors);
    return res.status(422).send(errors);
  }

  models.compagny
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

const adminDelete = (req, res) => {
  models.compagny
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
  getCompagny,
  read,
  postCompagny,
  updateCompagny,
  deleteCompagny,
  getUserByEmailWithPasswordAndPassToNext,
  getMyRecruiters,
  getRecruiter,
  GetForDeleteRecruiter,
  deleteRecruiter,
  validCompagny,
  validUpdate,
  getCompagnyByIdToNext,
  editPassword,
  adminDelete,
};
