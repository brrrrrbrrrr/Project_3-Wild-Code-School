const router = require("express").Router();
const recruitment = require("./recruitment.route");

router.use("/recruteur", recruitment);
router.use("/consultant", recruitment);

module.exports = router;
