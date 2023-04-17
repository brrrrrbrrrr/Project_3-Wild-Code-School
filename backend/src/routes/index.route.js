const router = require("express").Router();
const consultant = require("./consultant.route");
const loginConsultant = require("./login.consultant.route");

router.use("/consultants", consultant);
router.use("/consultants-login", loginConsultant);

const candidate = require("./candidate.route");
const login = require("./loginCandidate.route");

router.use("/candidates", candidate);
router.use("/login/candidates", login);

const recruiter = require("./recruiter.route");
const loginRecruiter = require("./login.recruiter.route");

router.use("/recruiter", recruiter);
router.use("/consultant", recruiter);
router.use("/login-recruiter", loginRecruiter);

const compagny = require("./compagny.route");
const loginCompagny = require("./login.compagny.route");

router.use("/compagny", compagny);
router.use("/login/compagny", loginCompagny);

module.exports = router;
