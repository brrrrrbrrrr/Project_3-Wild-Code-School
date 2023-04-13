const router = require("express").Router();

const candidate = require("./candidate.route");

router.use("/candidate", candidate);

module.exports = router;
