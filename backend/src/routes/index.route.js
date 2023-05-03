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
router.use("/consultants-login", loginConsultant);

router.use("/candidates", candidate);
router.use("/login/candidates", login);

const offer = require("./offer.rout");

router.use("/offers", offer);

router.use("/recruiter", recruiter);
router.use("/consultant", recruiter);
router.use("/login-recruiter", loginRecruiter);

router.use("/compagny", compagny);
router.use("/login/compagny", loginCompagny);

module.exports = router;
