/* eslint-disable prettier/prettier */
const router = require("express").Router();
const multer = require("multer");
const consultantControllers = require("../controllers/consultantControllers");
const {
  storageConsultant,
  updateStorageConsultant,
} = require("../utils/multerConsultant");

const upload = multer({ storage: storageConsultant });
const edit = multer({ storage: updateStorageConsultant });
const {
  hashPassword,
  verifyToken,
  isConsultantAdmin,
} = require("../utils/authConsultant");

router.get("/", consultantControllers.browse);

router.get("/:id", consultantControllers.read);

router.post(
  "/add-admin",
  verifyToken,
  isConsultantAdmin,
  upload.single("picture"),
  consultantControllers.validateConsultantCreationData,
  hashPassword,
  consultantControllers.add
);

router.post(
  "/",
  upload.single("picture"),
  consultantControllers.validateConsultantCreationData,
  consultantControllers.add
);

router.put(
  "/:id",
  edit.single("picture"),
  verifyToken,
  consultantControllers.edit
);

router.delete(
  "/:id",
  verifyToken,
  isConsultantAdmin,
  consultantControllers.destroy
);

module.exports = router;
