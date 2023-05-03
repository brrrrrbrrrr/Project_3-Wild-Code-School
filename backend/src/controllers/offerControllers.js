const models = require("../models");

const browse = (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  const limit2 = parseInt(limit, 10);
  models.offer
    .findAll(page, limit2)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
};
