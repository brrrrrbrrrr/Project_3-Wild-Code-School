/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const joi = require("joi");
const models = require("../models");
const { hashPassword } = require("../utils/auth");

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
      Mot_de_passe: joi.string().max(200).presence(presence),
      Adresse_rue: joi.string().max(45).presence(presence),
      Adresse_ville: joi.string().max(45).presence(presence),
      Adresse_CP: joi.string().max(45).presence(presence),
      valide: joi.number().valid(0, 1).presence(presence),
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
const add = async (req, res) => {
  // TODO validations (length, format...)
  // Valider les données avec Joi
  const validationError = validate(req.body);

  if (validationError) {
    // Si les données ne sont pas valides, renvoyer une erreur 400
    res.status(422).json({ error: validationError.message }); // Utiliser validationError.message pour obtenir le message d'erreur
  } else {
    // Si les données sont valides, continuer le traitement
    const {
      Entreprise_id,
      Nom,
      Prenom,
      Email,
      Telephone,
      Date_naissance,
      Mot_de_passe,
      Adresse_rue,
      Adresse_ville,
      Adresse_CP,
    } = req.body;
    const hashedPassword = await hashPassword(Mot_de_passe);

    models.recruitment
      .insert({
        Entreprise_id,
        Nom,
        Prenom,
        Email,
        Telephone,
        Date_naissance,
        Mot_de_passe: hashedPassword,
        Adresse_rue,
        Adresse_ville,
        Adresse_CP,
      })
      .then(([result]) => {
        res.location(`/items/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).send("Email already exists"); // Ajouter le mot-clé 'return' avant d'appeler res.status()
        }
        return res.sendStatus(500); // Ajouter le mot-clé 'return' avant d'appeler res.sendStatus()
      });
  }
};

const destroy = (req, res) => {
  models.item
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
  add,
  destroy,
};
