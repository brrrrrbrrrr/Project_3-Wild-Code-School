const router = require("express").Router();
const consultantControllers = require("../controllers/consultantControllers");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  isConsultantAdmin,
} = require("../auth");

// ici vos routes
router.post("/consultants/login", consultantControllers.login, verifyPassword);

router.use(verifyToken);
router.post(
  "/consultants",
  isConsultantAdmin,
  hashPassword,
  consultantControllers.add
);

module.exports = router;
