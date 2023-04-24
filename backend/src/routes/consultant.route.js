/* eslint-disable prettier/prettier */
const router = require("express").Router();
const consultantControllers = require("../controllers/consultantControllers");

const {
  hashPassword,
  verifyToken,
  isConsultantAdmin,
} = require("../utils/authConsultant");

router.get("/", consultantControllers.browse);

router.get("/:id", consultantControllers.read);

// router.use(verifyToken);

router.post(
  "/",
  verifyToken,
  isConsultantAdmin,
  consultantControllers.validateConsultantCreationData,
  hashPassword,
  consultantControllers.add
);

router.delete(
  "/:id",
  verifyToken,
  isConsultantAdmin,
  consultantControllers.destroy
);

module.exports = router;
