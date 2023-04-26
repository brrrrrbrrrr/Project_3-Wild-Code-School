/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const joi = require("joi");
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
      street: joi.string().max(45).presence(presence),
      city: joi.string().max(45).presence(presence),
      postalCode: joi.string().max(45).presence(presence),
      valide: joi.number().valid(0, 1).presence("optional"),
    })
    .validate(data, { abortEarly: false }).error;
};

const browse = (req, res) => {
  models.recruiter
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
  models.recruiter
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
  } = req.body;

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
      phone,
      birthday,
      password: hashedPassword,
      street,
      city,
      postalCode,
      valide,
      compagny_id,
    })
    .then((result) => {
      res.location(`/items/${result.Id}`).sendStatus(201);
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
const edit = (req, res) => {
  const item = req.body;

  // TODO validations (length, format...)

  item.id = parseInt(req.params.id, 10);

  models.recruiter
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
const getRecruiterByLoginToNext = async (req, res, next) => {
  const { mail } = req.body;
  if (!mail) {
    return res.sendStatus(422);
  }
  const [result] = await models.recruiter.getRecruiterByLogin(mail);
  if (result) {
    if (result[0] != null) {
      req.recruiter = { ...result[0] };
      next();
    } else return res.sendStatus(401);
  } else return res.sendStatus(500);
};

module.exports = {
  browse,
  read,
  add,
  destroy,
  getRecruiterByLoginToNext,
  edit,
};
