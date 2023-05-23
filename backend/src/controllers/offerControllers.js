const models = require("../models");

const browse = (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  const { filter, typeFilter } = req.query;
  const { allOffers } = req.query;
  const limit2 = parseInt(limit, 10);

  if (allOffers) {
    models.offer
      .findAllFilter()
      .then(([rows]) => {
        return res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        return res.sendStatus(500);
      });
  } else if (typeFilter) {
    // est ce que typefilter existe ?
    // si oui on fait un switch sur type filter
    // et dans ce switch on appelle le modèle avec la bonne requête
    switch (parseInt(typeFilter, 10)) {
      case 1:
        models.offer
          .findAllJobs(filter)
          .then(([rows]) => {
            res.send(rows);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
        break;
      case 2:
        models.offer
          .findAllRemote(filter)
          .then(([rows]) => {
            res.send(rows);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
        break;
      case 3:
        models.offer
          .findAllContract(filter)
          .then(([rows]) => {
            res.send(rows);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
        break;
      default:
        res.sendStatus(422);
    }
  }
  // sinon
  else {
    models.offer
      .findAll(page, limit2)
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const getjobtitle = (req, res) => {
  models.offer
    .getjobs()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const remotefilter = (req, res) => {
  models.offer
    .getremote()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const contractfilter = (req, res) => {
  models.offer
    .getcontract()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.offer
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

const getLikedOffers = (req, res) => {
  console.warn("getLikedOffers - candidat : ", req.query.candidateId);

  models.offer
    .findLikedCandidateOffers(parseInt(req.query.candidateId, 10))
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  getjobtitle,
  remotefilter,
  contractfilter,
  read,
  getLikedOffers,
};
