/* eslint-disable prettier/prettier */
const router = require("express").Router();
const candidateControllers = require("../controllers/candidateControllers");
const {
  verifyPasswordCandidate,
  verifyToken,
  verifyPasswordCandidateWithoutToken,
} = require("../utils/auth");

router.post(
  "/",
  candidateControllers.getCandidateByMailToNext,
  verifyPasswordCandidate
);
router.put(
  "/:id/changepassword",
  verifyToken,
  candidateControllers.getCandidateByIdToNext,
  verifyPasswordCandidateWithoutToken,
  candidateControllers.editPassword
);

module.exports = router;
