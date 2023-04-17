const router = require("express").Router();

const candidate = require("./candidate.route");
const login = require("./loginCandidate.route");

router.use("/candidates", candidate);
router.use("/login/candidates", login);

module.exports = router;
