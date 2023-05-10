/* eslint-disable import/no-extraneous-dependencies */
const Joi = require("joi").extend(require("@joi/date"));
const models = require("../models");

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
    superAdmin: Joi.boolean().presence(presence),
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

const add = (req, res) => {
  const consultant = req.body;

  // TODO validations (length, format...)

  models.consultant
    .insert(consultant)
    .then(([result]) => {
      res.location(`/consultants/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
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
