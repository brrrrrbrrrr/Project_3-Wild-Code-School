const router = require("express").Router();
const recruitment = require("./recruitment.route");

router.use("/recruteur", recruitment);

module.exports = router;
