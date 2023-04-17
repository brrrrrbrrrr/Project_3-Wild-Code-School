const router = require("express").Router();
const recruiterControllers = require("../controllers/recruiterControllers");
const { verifyPassword } = require("../utils/auth");

router.post(
  "/",
  recruiterControllers.getRecruiterByLoginToNext,
  verifyPassword
);

module.exports = router;
