const router = require("express").Router();
const recruiterControllers = require("../controllers/recruiterControllers");
const {
  verifyPasswordRecruiter,
  verifyToken,
  verifyPasswordRecruiterWithoutToken,
} = require("../utils/auth");

router.post(
  "/",
  recruiterControllers.getRecruiterByLoginToNext,
  verifyPasswordRecruiter
);
router.put(
  "/:id/changepassword",
  verifyToken,
  recruiterControllers.getRecruiterByIdToNext,
  verifyPasswordRecruiterWithoutToken,
  recruiterControllers.editPassword
);

module.exports = router;
