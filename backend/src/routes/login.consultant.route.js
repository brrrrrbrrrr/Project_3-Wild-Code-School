const router = require("express").Router();
const consultantControllers = require("../controllers/consultantControllers");

const { verifyPassword } = require("../authConsultant");

// ici vos routes
router.post(
  "/",
  consultantControllers.validateConsultantLoginData,
  consultantControllers.login,
  verifyPassword
);

module.exports = router;
