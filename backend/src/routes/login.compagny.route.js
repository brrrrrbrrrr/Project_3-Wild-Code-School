const router = require("express").Router();
const compagnyControllers = require("../controllers/compagnyControllers");
const { verifyPassword } = require("../utils/compagnyAuth");
const {
  verifyToken,
  verifyPasswordCompagnyWithoutToken,
} = require("../utils/auth");

router.post(
  "/",
  compagnyControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

router.put(
  "/:id/changepassword",
  verifyToken,
  compagnyControllers.getCompagnyByIdToNext,
  verifyPasswordCompagnyWithoutToken,
  compagnyControllers.editPassword
);

module.exports = router;
