const router = require("express").Router();
const recruiter = require("./recruiter.route");
const loginRecruiter = require("./login.recruiter.route");

router.use("/recruiter", recruiter);
router.use("/consultant", recruiter);
router.use("/login-recruiter", loginRecruiter);

module.exports = router;
