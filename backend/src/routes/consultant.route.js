/* eslint-disable prettier/prettier */
const router = require("express").Router();
const multer = require("multer");
const consultantControllers = require("../controllers/consultantControllers");
const { storageConsultant } = require("../utils/multerConsultant");

const upload = multer({ storage: storageConsultant });
const {
  // hashPassword,
  verifyToken,
  isConsultantAdmin,
} = require("../utils/authConsultant");

router.get("/", consultantControllers.browse);

router.get("/:id", consultantControllers.read);

// router.use(verifyToken);

router.post(
  "/",
  // verifyToken,
  // isConsultantAdmin,
  upload.single("picture"),
  // consultantControllers.validateConsultantCreationData,
  // hashPassword,
  consultantControllers.add
);

router.delete(
  "/:id",
  verifyToken,
  isConsultantAdmin,
  consultantControllers.destroy
);

module.exports = router;
