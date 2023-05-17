const router = require("express").Router();
const consultantControllers = require("../controllers/consultantControllers");

const { verifyPassword } = require("../utils/authConsultant");

router.post(
  "/",
  consultantControllers.validateConsultantLoginData,
  consultantControllers.login,
  verifyPassword
);

module.exports = router;
