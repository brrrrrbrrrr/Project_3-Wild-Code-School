const router = require("express").Router();
const consultant = require("./consultant.route");
const loginConsultant = require("./login.consultant.route");

router.use("/consultants", consultant);
router.use("/consultants-login", loginConsultant);

module.exports = router;
