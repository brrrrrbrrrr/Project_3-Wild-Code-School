const joi = require("joi");
const path = require("path");
const fs = require("fs");
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      salary: joi.string().max(45).presence(presence),
      remoteId: joi.number().integer().presence(presence),
      jobOfferPresentation: joi.string().max(1000).presence(presence),
      desiredProfile: joi.string().max(1000).presence(presence),
      recruitmentProcess: joi.string().max(1000).presence(presence),
      numberOfEmployees: joi.string().max(45).presence(presence),
      jobTitleDetails: joi.string().max(1000).presence(presence),
      cityId: joi.number().integer().presence(presence),
      consultantId: joi.number().integer().presence(presence),
      recruiterId: joi.number().integer().presence(presence),
      contratId: joi.number().integer().presence(presence),
      jobTitleId: joi.number().integer().presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};
const add = (req, res) => {
  const {
    salary,
    remoteId,
    jobOfferPresentation,
    desiredProfile,
    recruitmentProcess,
    numberOfEmployees,
    jobTitleDetails,
    cityId,
    consultantId,
    recruiterId,
    contratId,
    jobTitleId,
  } = req.body;

  const fileTeamPicture = req.file;

  const offerFolderDefault = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "offer"
  );

  const offerFolder = req.pathFolder;
  const teamPicture = `offer/${fileTeamPicture.filename}`;
  const validationError = validate(req.body);
  if (validationError) {
    // Si les données ne sont pas valides, renvoyer une erreur 400
    res.status(422).json({ error: validationError.message }); // Utiliser validationError.message pour obtenir le message d'erreur
  }
  models.offer
    .insert({
      salary,
      remoteId,
      teamPicture,
      jobOfferPresentation,
      desiredProfile,
      recruitmentProcess,
      numberOfEmployees,
      jobTitleDetails,
      cityId,
      consultantId,
      recruiterId,
      contratId,
      jobTitleId,
    })
    .then(([result]) => {
      const idNewOffer = result.insertId.toString();
      const newFolder = path.join(offerFolderDefault, idNewOffer);
      fs.renameSync(offerFolder, newFolder, (err) => {
        console.warn("rename folder :", err);
      });

      const extension = fileTeamPicture.originalname.split(".").pop();
      const newOriginalNameTeamPicture = `${fileTeamPicture.originalname
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "")}.${extension}`;
      const originalNameTeamPicture = path.join(
        newFolder,
        newOriginalNameTeamPicture
      );
      const fileNamePicture = path.join(newFolder, fileTeamPicture.filename);
      const newFileNameTeamPicture = `uploads/offer/${idNewOffer}/${newOriginalNameTeamPicture}`;
      fs.renameSync(fileNamePicture, originalNameTeamPicture, (err) => {
        if (err) {
          console.warn("erreur Picture :", err);
        }
      });
      models.offer
        .updateTeamPicture(newFileNameTeamPicture, idNewOffer)
        .then(() => {
          return res.location(`/offer/${result.insertId}`).sendStatus(201);
        })
        .catch((error) => {
          console.error(error);
          return res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.offer
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

const getMyOffers = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.offer
    .findMyOffers(id)
    .then(([rows]) => {
      return res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

const getMyOfferForUpdate = (req, res, next) => {
  const recruiterId = req.payload.sub.id;
  const offerId = parseInt(req.params.id, 10);
  models.offer
    .findMyOfferByIdAndRecruiter(offerId, recruiterId)
    .then(([offer]) => {
      // Vérifiez si l'offre est vide ou ne contient pas la propriété 'recruiterId'
      if (!offer || offer.length === 0 || !offer[0].recruiterId) {
        return res
          .status(404)
          .json({ error: "Offre non trouvée ou accès non autorisé" });
      }
      return next();
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

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
      case 4:
        models.offer
          .findAllCity(filter)
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

const edit = async (req, res) => {
  const offer = req.body;
  const errors = validate(offer, false);
  if (errors) {
    console.error(errors);
    return res.status(422).send(errors);
  }

  offer.id = parseInt(req.params.id, 10);

  try {
    const [result] = await models.offer.update(offer);

    if (result.affectedRows === 0) {
      return res.sendStatus(404);
    }
    if (req.file) {
      const fileTeamPicture = req.file;

      const extension = fileTeamPicture.originalname.split(".").pop();
      const newOriginalNameTeamPicture = `${fileTeamPicture.originalname
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "")}.${extension}`;
      const offerFolder = req.pathFolder;
      const newFileNameTeamPicture = `uploads/offer/${req.params.id}/${newOriginalNameTeamPicture}`;

      const originalNamePicture = path.join(
        offerFolder,
        newOriginalNameTeamPicture
      );
      const fileNameTeamPicture = path.join(
        offerFolder,
        fileTeamPicture.filename
      );

      fs.renameSync(fileNameTeamPicture, originalNamePicture, (err) => {
        if (err) {
          console.warn("erreur Picture :", err);
        }
      });
      await models.offer.updateTeamPicture(newFileNameTeamPicture, offer.id);
    }
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
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

const cityfilter = (req, res) => {
  models.offer
    .getcity()
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

const multifilter = (req, res) => {
  const {
    jobmultifilter,
    remotemultifilter,
    contractmultifilter,
    citymultifilter,
  } = req.query.filter;
  models.offer
    .getmultifilter(
      parseInt(jobmultifilter, 10),
      parseInt(remotemultifilter, 10),
      parseInt(contractmultifilter, 10),
      parseInt(citymultifilter, 10)
    )
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  add,
  getMyOffers,
  destroy,
  browse,
  getjobtitle,
  remotefilter,
  contractfilter,
  read,
  cityfilter,
  multifilter,
  edit,
  getMyOfferForUpdate,
};
