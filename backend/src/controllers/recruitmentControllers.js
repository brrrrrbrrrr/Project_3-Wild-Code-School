/* eslint-disable import/no-extraneous-dependencies */
const joi = require("joi");
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      Entreprise_id: joi.number().integer().presence(presence),
      Nom: joi.string().max(45).presence(presence),
      Prenom: joi.string().max(45).presence(presence),
      Email: joi.string().email().presence(presence),
      Telephone: joi.string().max(45).presence(presence),
      Date_naissance: joi.date().iso().presence(presence),
      Mot_de_passe: joi.string().max(45).presence(presence),
      Adresse_rue: joi.string().max(45).presence(presence),
      Adresse_ville: joi.string().max(45).presence(presence),
      Adresse_CP: joi.string().max(45).presence(presence),
      Valide: joi.number().integer().presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

const browse = (req, res) => {
  models.recruitment
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
  models.recruitment
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

const add = (req, res) => {
  // TODO validations (length, format...)
  // Valider les données avec Joi
  const validationError = validate(req.body);

  if (validationError) {
    // Si les données ne sont pas valides, renvoyer une erreur 400
    res.status(400).json({ error: validationError.message }); // Utiliser validationError.message pour obtenir le message d'erreur
  } else {
    // Si les données sont valides, continuer le traitement
    const item = req.body;

    models.recruitment
      .insert(item)
      .then(([result]) => {
        res.location(`/items/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};
module.exports = {
  browse,
  read,
  add,
};
