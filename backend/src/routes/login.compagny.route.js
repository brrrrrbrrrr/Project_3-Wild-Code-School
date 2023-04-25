const router = require("express").Router();
const compagnyControllers = require("../controllers/compagnyControllers");
const { verifyPassword } = require("../utils/compagnyAuth");

router.post(
  "/",
  compagnyControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

module.exports = router;
