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
      // jobSeeker: joi.boolean().invalid(false).presence(presence),
      jobSeeker: joi.string().max(45).presence("optional"),
      picture: joi.string().allow(null, "").presence("optional"),
      // resume: joi.string().allow(null, "").presence("optional"),
      contactPreference: joi.string().max(45).presence(presence),
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
  models.candidate
    .find(req.params.id)
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

// eslint-disable-next-line consistent-return
const edit = async (req, res) => {
  const candidate = req.body;
  const errors = validate(candidate, false);
  if (errors) {
    console.error(errors);
    return res.status(422);
  }
  if (candidate.password) {
    const hashedPassword = await hashPassword(req.body.password);
    candidate.password = hashedPassword;
  }

  // TODO validations (length, format...)

  candidate.id = parseInt(req.params.id, 10);

  models.candidate
    .update(candidate)
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
  } = req.body;
  // Je recupere mes fichiers

  const fileResume = req.files.resume;
  const filePicture = req.files.picture;

  // if (!fileResume) {
  //   return res.sendStatus(500);
  // }

  const candidateFolder = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "candidate",
    mail
  );

  const originalNameResume = path.join(
    candidateFolder,
    fileResume[0].originalname
  );
  const fileNameResume = path.join(candidateFolder, fileResume[0].filename);

  const originalNamePicture = path.join(
    candidateFolder,
    filePicture[0].originalname
  );
  const fileNamePicture = path.join(candidateFolder, filePicture[0].filename);

  fs.rename(fileNameResume, originalNameResume, (err) => {
    if (err) {
      console.warn(err);
    }
  });
  fs.rename(fileNamePicture, originalNamePicture, (err) => {
    if (err) {
      console.warn(err);
    }
  });

  const resume = `${mail}/${fileResume[0].filename}`;
  const picture = `${mail}/${filePicture[0].filename}`;
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
    })
    .then(([result]) => {
      return res.location(`/candidates/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      if (err.errno === 1062) {
        return res.status(409).send("User already exists");
        // eslint-disable-next-line no-else-return
      } else {
        return res.sendStatus(500);
      }
    });
};
// const add = async (req, res) => {
//   const {
//     name,
//     firstname,
//     birthday,
//     street,
//     city,
//     postalAdress,
//     mail,
//     phone,
//     password,
//     jobSeeker,
//     contactPreference,
//   } = req.body;

//   const fileResume = req.files.resume;
//   const filePicture = req.files.picture;

//   const candidateFolder = path.join(
//     __dirname,
//     "..",
//     "..",
//     "public",
//     "uploads",
//     "candidate",
//     name
//   );

//   // fonction pour renommer un fichier
//   const renameFile = (file) => {
//     const originalName = path.join(candidateFolder, file[0].originalname);
//     const fileName = path.join(candidateFolder, file[0].filename);
//     fs.rename(fileName, originalName, (err) => {
//       if (err) throw err;
//     });
//     return `${name}/${file[0].filename}`;
//   };

//   const resume = renameFile(fileResume);
//   const picture = renameFile(filePicture);

//   const errors = validate(req.body);
//   if (errors) {
//     console.error(errors);
//     res.status(422).json({ error: errors.message });
//   }
//   const hashedPassword = await hashPassword(req.body.password);

//   models.candidate
//     .insert({
//       name,
//       firstname,
//       birthday,
//       street,
//       city,
//       postalAdress,
//       mail,
//       phone,
//       password: hashedPassword,
//       jobSeeker,
//       picture,
//       resume,
//       contactPreference,
//     })
//     .then(([result]) => {
//       return res.location(`/candidates/${result.insertId}`).sendStatus(201);
//     })
//     .catch((err) => {
//       console.error(err);
//       if (err.errno === 1062) {
//         return res.status(409).send("User already exists");
//       }
//       return res.sendStatus(500);
//     });
// };

const destroy = (req, res) => {
  models.candidate
    .delete(req.params.id)
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

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getCandidateByMailToNext,
};
