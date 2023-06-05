const models = require("../models");

const getMessages = (req, res) => {
  const candidateId = req.payload.sub.id;
  const offerId = req.params.id;
  console.warn(candidateId);
  models.message
    .getAllMessages(offerId, candidateId)
    .then(([rows]) => {
      console.warn(rows);
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const sendMessages = (req, res) => {
  const message = req.body;
  models.message
    .insert(message)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getMessages,
  sendMessages,
};
