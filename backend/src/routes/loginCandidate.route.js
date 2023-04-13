const router = require("express").Router();
const candidateControllers = require("../controllers/candidateControllers");
const { verifyPassword } = require("../utils/auth");

router.post("/", candidateControllers.getCandidateByMailToNext, verifyPassword);

module.exports = router;
