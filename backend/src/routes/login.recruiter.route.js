const router = require("express").Router();
const recruiterControllers = require("../controllers/recruiterControllers");
const { verifyPasswordRecruiter } = require("../utils/auth");

router.post(
  "/",
  recruiterControllers.getRecruiterByLoginToNext,
  verifyPasswordRecruiter
);

module.exports = router;
