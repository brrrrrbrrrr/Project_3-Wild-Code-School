const router = require("express").Router();
const consultantControllers = require("../controllers/consultantControllers");

const {
  verifyPassword,
  verifyToken,
  verifyPasswordConsultantWithoutToken,
} = require("../utils/authConsultant");

router.post(
  "/",
  consultantControllers.validateConsultantLoginData,
  consultantControllers.login,
  verifyPassword
);

router.put(
  "/:id/changepassword",
  verifyToken,
  consultantControllers.getConsultantByIdToNext,
  verifyPasswordConsultantWithoutToken,
  consultantControllers.editPassword
);

module.exports = router;
