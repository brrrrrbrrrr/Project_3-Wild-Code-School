const router = require("express").Router();
const consultantControllers = require("../controllers/consultantControllers");

const { verifyPassword } = require("../utils/authConsultant");

// ici vos routes
router.post(
  "/",
  consultantControllers.validateConsultantLoginData,
  consultantControllers.login,
  verifyPassword
);

module.exports = router;
