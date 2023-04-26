const router = require("express").Router();
const consultant = require("./consultant.route");
const loginConsultant = require("./login.consultant.route");
const recruiter = require("./recruiter.route");
const loginRecruiter = require("./login.recruiter.route");

const compagny = require("./compagny.route");
const loginCompagny = require("./login.compagny.route");

const candidate = require("./candidate.route");
const login = require("./loginCandidate.route");

router.use("/consultants", consultant);
router.use("/login/consultants", loginConsultant);

router.use("/candidates", candidate);
router.use("/login/candidates", login);

const offre = require("./offre.rout");

router.use("/offres", offre);

router.use("/recruiters", recruiter);

router.use("/login/recruiters", loginRecruiter);

router.use("/compagny", compagny);
router.use("/login/compagny", loginCompagny);

module.exports = router;
