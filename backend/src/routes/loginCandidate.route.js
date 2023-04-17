/* eslint-disable prettier/prettier */
const router = require("express").Router();
const candidateControllers = require("../controllers/candidateControllers");
const { verifyPasswordCandidate } = require("../utils/auth");

router.post(
  "/",
  candidateControllers.getCandidateByMailToNext,
  verifyPasswordCandidate
);

module.exports = router;
