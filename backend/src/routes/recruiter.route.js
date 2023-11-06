const router = require("express").Router();
const multer = require("multer");

const {
  storageRecruiter,
  UpdateStorageRecruiter,
} = require("../utils/multerRecruiter");
const { isConsultantAdmin } = require("../utils/authConsultant");

const { verifyToken } = require("../utils/auth");
const recruiterControllers = require("../controllers/recruiterControllers");

const upload = multer({ storage: storageRecruiter });
const edit = multer({ storage: UpdateStorageRecruiter });

router.get("/", recruiterControllers.browse);
router.get("/:id", recruiterControllers.read);

router.put("/:id", edit.single("picture"), recruiterControllers.edit);
router.post("/", upload.single("picture"), recruiterControllers.add);
// Route protégé
router.delete(
  "/:id",
  verifyToken,
  recruiterControllers.getRecruiterByIdToNext,
  recruiterControllers.destroy
);

router.delete(
  "/admin/:id",
  verifyToken,
  isConsultantAdmin,
  recruiterControllers.adminDelete
);

module.exports = router;
