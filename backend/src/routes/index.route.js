const router = require("express").Router();

const candidate = require("./candidate.route");
const login = require("./loginCandidate.route");

router.use("/candidate", candidate);
router.use("/login/candidate", login);

module.exports = router;
