const router = require("express").Router();
const consultant = require("./consultant.route");
const loginConsultant = require("./login.consultant.route");
const recruiter = require("./recruiter.route");
const loginRecruiter = require("./login.recruiter.route");
const compagny = require("./compagny.route");
const loginCompagny = require("./login.compagny.route");
const candidate = require("./candidate.route");
const login = require("./loginCandidate.route");
const offer = require("./offer.rout");
const filter = require("./filter.route");

const message = require("./chatting.route");

router.use("/messages", message);

router.use("/consultants", consultant);
router.use("/login/consultants", loginConsultant);
router.use("/candidates", candidate);
router.use("/login/candidates", login);
router.use("/offers", offer);
router.use("/recruiters", recruiter);
router.use("/login/recruiters", loginRecruiter);
router.use("/compagny", compagny);
router.use("/login/compagny", loginCompagny);
router.use("/filter", filter);

module.exports = router;
