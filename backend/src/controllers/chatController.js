/* eslint-disable prefer-destructuring */
const models = require("../models");

const getMessages = (req, res) => {
  const candidateId = req.payload.sub.id;
  const offerId = req.params.id;
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

const getMessagesConsultant = (req, res) => {
  const candidateId = req.params.candidateId;
  const offerId = req.params.id;
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
const sendMessagesConsultant = (req, res) => {
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

const getContact = (req, res) => {
  const offerId = req.params.id;
  models.message
    .getContact(offerId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteMessage = (req, res) => {
  const offerId = req.params.id;
  const messageId = req.params.messageId;
  models.message
    .delete(offerId, messageId)
    .then((result) => {
      if (result.affectedRows === 0) {
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getMessages,
  sendMessages,
  deleteMessage,
  getContact,
  getMessagesConsultant,
  sendMessagesConsultant,
};
