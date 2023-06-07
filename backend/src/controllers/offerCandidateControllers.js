const Joi = require("joi").extend(require("@joi/date"));
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    valide: Joi.number().integer().min(0).max(1).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const statusAllOffers = (req, res) => {
  const { status } = req.params;
  models.offercandidate
    .findAllOffersStatus(status)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.sendStatus(404);
      } else res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const statusOffer = (req, res) => {
  const { status, offerId } = req.params;
  models.offercandidate
    .findOfferStatus(status, offerId)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.sendStatus(404);
      } else res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editOfferStatusCandidate = (req, res) => {
  const { status, offerId, candidateId } = req.params;
  const { valide } = req.body;
  const errors = validate({ valide }, false);
  if (errors) {
    console.error(errors);
    return res.status(422).json({ error: errors.message });
  }
  models.offercandidate
    .editOfferStatusWithCandidate(valide, status, offerId, candidateId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  return null;
};

const statusOfferCandidate = (req, res) => {
  const { status, offerId, candidateId } = req.params;
  models.offercandidate
    .findOfferStatusWithCandidate(status, offerId, candidateId)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.sendStatus(404);
      } else res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  statusAllOffers,
  statusOffer,
  editOfferStatusCandidate,
  statusOfferCandidate,
};
