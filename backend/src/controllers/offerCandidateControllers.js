const Joi = require("joi").extend(require("@joi/date"));
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    valide: Joi.number().integer().min(0).max(1).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const getCountAllCandidates = (req, res) => {
  models.offercandidate
    .countAllCandidates()
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

const getCandidateWithStatus = (req, res) => {
  const { status, candidateId } = req.params;
  models.offercandidate
    .candidateWithStatus(status, candidateId)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.send([]);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const countOfferLikes = (req, res) => {
  const { status } = req.params;
  models.offercandidate
    .countOfferLikes(status)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.send([]);
      } else res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editOfferStatusCandidate = (req, res) => {
  const { status, candidateId, offerId } = req.params;
  const { valide } = req.body;
  const errors = validate({ valide }, false);
  if (errors) {
    console.error(errors);
    return res.status(422).json({ error: errors.message });
  }
  models.offercandidate
    .editOfferStatusWithCandidate(valide, status, candidateId, offerId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  return null;
};

module.exports = {
  getCountAllCandidates,
  getCandidateWithStatus,
  editOfferStatusCandidate,
  countOfferLikes,
};
