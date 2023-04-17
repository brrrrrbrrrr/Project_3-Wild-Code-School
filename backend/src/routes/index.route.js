const router = require("express").Router();
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
