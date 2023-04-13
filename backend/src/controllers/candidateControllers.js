// eslint-disable-next-line import/no-extraneous-dependencies
const joi = require("joi");
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
      jobSeeker: joi.boolean().invalid(false).presence(presence),
      picture: joi.string().presence("optional"),
      resume: joi.string().presence("optional"),
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
  const candidate = req.body;
  const errors = validate(candidate);
  if (errors) {
    console.error(errors);
    return res.status(422);
  }
  const hashedPassword = await hashPassword(req.body.password);
  // TODO validations (length, format...)
  candidate.password = hashedPassword;
  if (!hashedPassword) {
    return res.sendStatus(500);
  }
  models.candidate
    .insert(candidate)
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

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
