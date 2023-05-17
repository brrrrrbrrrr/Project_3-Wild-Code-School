/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
const joi = require("joi");
const path = require("path");
const fs = require("fs");
const models = require("../models");
const { hashPassword } = require("../utils/auth");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      name: joi.string().max(45).presence(presence),
      firstname: joi.string().max(45).presence(presence),
      birthday: joi.date().iso().presence(presence),
      street: joi.string().max(45).presence(presence),
      city: joi.string().max(45).presence(presence),
      postalAdress: joi.string().max(45).presence(presence),
      mail: joi.string().email().presence(presence),
      phone: joi.string().max(45).presence(presence),
      password: joi.string().max(45).presence(presence),
      newPassword: joi.string().max(45).presence("optional"),
      jobSeeker: joi.number().integer().min(0).max(1).presence(presence),
      contactPreference: joi.string().max(45).presence(presence),
      gender: joi.string().max(45).presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

const browse = (req, res) => {
  models.candidate
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
  const id = parseInt(req.params.id, 10);
  models.candidate
    .find(id)
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
const readFile = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.candidate
    .findFiles(id)
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

const edit = async (req, res) => {
  const candidate = req.body;

  const errors = validate(candidate, false);
  if (errors) {
    console.error(errors);
    return res.status(422).send(errors);
  }

  if (candidate.password) {
    const hashedPassword = await hashPassword(req.body.password);
    candidate.password = hashedPassword;
  }

  candidate.id = parseInt(req.params.id, 10);

  try {
    const [result] = await models.candidate.update(candidate);

    if (result.affectedRows === 0) {
      return res.sendStatus(404);
    }
    if (req.files.picture) {
      const filePicture = req.files.picture;

      const extension = filePicture[0].originalname.split(".").pop();
      const newOriginalNamePicture = `${filePicture[0].originalname
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "")}.${extension}`;
      const candidateFolder = req.pathFolder;
      const newFileNamePicture = `uploads/candidate/${req.params.id}/${newOriginalNamePicture}`;

      const originalNamePicture = path.join(
        candidateFolder,
        newOriginalNamePicture
      );
      const fileNamePicture = path.join(
        candidateFolder,
        filePicture[0].filename
      );

      fs.renameSync(fileNamePicture, originalNamePicture, (err) => {
        if (err) {
          console.warn("erreur Picture :", err);
        }
      });

      await models.candidate.updatePicture(newFileNamePicture, candidate.id);
    }

    if (req.files.resume) {
      const fileResume = req.files.resume;
      console.warn("fileresume :", fileResume);

      const extension = fileResume[0].originalname.split(".").pop();
      const newOriginalNameResume = `${fileResume[0].originalname
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "")}.${extension}`;
      const candidateFolder = req.pathFolder;
      const newFileNameResume = `uploads/candidate/${req.params.id}/${newOriginalNameResume}`;

      const originalNameResume = path.join(
        candidateFolder,
        newOriginalNameResume
      );
      const fileNameResume = path.join(candidateFolder, fileResume[0].filename);

      fs.renameSync(fileNameResume, originalNameResume, (err) => {
        if (err) {
          console.warn("erreur Resume:", err);
        }
      });

      await models.candidate.updateResume(newFileNameResume, candidate.id);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

// TODO validations (length, format...)

// eslint-disable-next-line consistent-return
const add = async (req, res) => {
  // Je recupère le req.body sans les fichiers a telecharger
  const {
    name,
    firstname,
    birthday,
    street,
    city,
    postalAdress,
    mail,
    phone,
    password,
    jobSeeker,
    contactPreference,
    gender,
  } = req.body;
  // Je recupere mes fichiers
  const fileResume = req.files.resume;
  const filePicture = req.files.picture;
  const candidateFolderDefault = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "candidate"
  );
  console.warn(req);
  const candidateFolder = req.pathFolder;

  const resume = `candidate/${fileResume[0].filename}`;
  const picture = `candidate/${filePicture[0].filename}`;

  const errors = validate(req.body);
  if (errors) {
    console.error(errors);

    res.status(422).json({ error: errors.message });
  }
  const hashedPassword = await hashPassword(req.body.password);

  models.candidate
    .insert({
      name,
      firstname,
      birthday,
      street,
      city,
      postalAdress,
      mail,
      phone,
      password: hashedPassword,
      jobSeeker,
      picture,
      resume,
      contactPreference,
      gender,
    })
    .then(([result]) => {
      // Je recupere l'id de mon nouvel utilisateur
      const idNewUser = result.insertId.toString();
      const newFolder = path.join(candidateFolderDefault, idNewUser);
      fs.renameSync(candidateFolder, newFolder, (err) => {
        console.warn("rename folder :", err);
      });

      // Je recupere le nom des fichiers et j'enleve les caractères spéciaux et je rajoute l'extention
      let extension = fileResume[0].originalname.split(".").pop();
      const newOriginalNameResume = `${fileResume[0].originalname
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "")}.${extension}`;
      extension = filePicture[0].originalname.split(".").pop();
      const newOriginalNamePicture = `${filePicture[0].originalname
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "")}.${extension}`;

      // Je recupere mon ancien et nouveau chemin
      const originalNameResume = path.join(newFolder, newOriginalNameResume);
      const fileNameResume = path.join(
        newFolder,

        fileResume[0].filename
      );

      const originalNamePicture = path.join(newFolder, newOriginalNamePicture);
      const fileNamePicture = path.join(newFolder, filePicture[0].filename);
      const newFileNamePicture = `uploads/candidate/${idNewUser}/${newOriginalNamePicture}`;
      const newFileNameResume = `uploads/candidate/${idNewUser}/${newOriginalNameResume}`;

      fs.renameSync(fileNameResume, originalNameResume, (err) => {
        if (err) {
          console.warn("erreur CV :", err);
        }
      });
      fs.renameSync(fileNamePicture, originalNamePicture, (err) => {
        if (err) {
          console.warn("erreur Picture :", err);
        }
      });

      models.candidate
        .updateFiles(newFileNameResume, newFileNamePicture, idNewUser)
        .then(() => {
          console.warn("Update successful");
          return res.location(`/candidates/${result.insertId}`).sendStatus(201);
        })
        .catch((error) => {
          console.error(error);
          return res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.errno === 1062) {
        return res.status(409).send("User already exist");
        // eslint-disable-next-line no-else-return
      } else {
        return res.sendStatus(500);
      }
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.candidate
    .delete(id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

const getCandidateByMailToNext = async (req, res, next) => {
  const { mail } = req.body;
  if (!mail) {
    return res.sendStatus(422);
  }
  const [result] = await models.candidate.findByMail(mail);
  if (result) {
    if (result[0] != null) {
      // eslint-disable-next-line prefer-destructuring
      req.candidate = result[0];
      next();
    } else return res.sendStatus(401);
  } else return res.sendStatus(500);
};

const getCandidateByIdToNext = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const idPayload = req.payload.sub.id;
  if (id !== idPayload) {
    return res.sendStatus(422);
  }
  const [result] = await models.candidate.findById(id);
  if (result) {
    if (result[0] != null) {
      // eslint-disable-next-line prefer-destructuring
      req.candidate = result[0];
      next();
    } else return res.sendStatus(401);
  } else return res.sendStatus(500);
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

  models.candidate
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

const likeOffer = (req, res) => {
  const offerId = req.params.offerId;
  const { candidateId } = req.body;
  if (!candidateId || !offerId) {
    return res.status(400).send("Missing candidateId or offerId");
  }
  models.candidate.findLike(candidateId, offerId).then(([rows]) => {
    if (rows[0] == null) {
      models.candidate
        .likeOffer(candidateId, offerId)
        .then((result) => {
          if (result.affectedRows === 0) {
            return res.sendStatus(404);
          }
          return res.sendStatus(204);
        })
        .catch((error) => {
          console.error(error);
          return res.sendStatus(500);
        });
      // add like
    } else {
      models.candidate
        .deleteLike(candidateId, offerId)
        .then((result) => {
          if (result.affectedRows === 0) {
            return res.sendStatus(404);
          }
          return res.sendStatus(204);
        })
        .catch((error) => {
          console.error(error);
          return res.sendStatus(500);
        });
      // suprime like
    }
  });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getCandidateByMailToNext,
  readFile,
  likeOffer,
  getCandidateByIdToNext,
  editPassword,
};
