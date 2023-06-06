/* eslint-disable consistent-return */
const models = require("../models");

const addFilter = (req, res) => {
  models.filter.postFilter(
    req.body.candidateId,
    1,
    parseInt(req.body.filters[0], 10)
  );
  models.filter.postFilter(
    req.body.candidateId,
    2,
    parseInt(req.body.filters[1], 10)
  );
  models.filter.postFilter(
    req.body.candidateId,
    3,
    parseInt(req.body.filters[2], 10)
  );
  models.filter
    .postFilter(req.body.candidateId, 4, parseInt(req.body.filters[3], 10))
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const compareFilter = (req, res) => {
  models.filter
    .getUserFilters(req.payload.sub.id)
    .then(([rows]) => {
      if (rows.length !== 0) {
        models.filter.checkFilter(rows).then(([value]) => {
          if (value[0]?.filterempty) return res.json([{ offerNumber: -1 }]);
          res.send(value);
        });
      } else return res.json([{ offerNumber: -1 }]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateFilter = (req, res) => {
  models.filter
    .updateUserFilters(req.payload.sub.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  addFilter,
  compareFilter,
  updateFilter,
};
