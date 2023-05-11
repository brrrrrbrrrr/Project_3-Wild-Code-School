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
router.post(
  "/:id/changepassword",
  verifyToken,
  candidateControllers.getCandidateByIdToNext,
  verifyPasswordCandidateWithoutToken
);
module.exports = router;
