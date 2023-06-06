const router = require("express").Router();

const multer = require("multer");

const compagnyControllers = require("../controllers/compagnyControllers");
const { verifyToken } = require("../utils/auth");
const {
  storageCompagny,
  UpdateStorageCompagny,
} = require("../utils/multerCompagny");

const upload = multer({ storage: storageCompagny });
const edit = multer({ storage: UpdateStorageCompagny });
router.get("/", compagnyControllers.getCompagny);
router.get("/:id", compagnyControllers.read);
router.post("/", upload.single("Logo"), compagnyControllers.postCompagny);
router.put("/:id", edit.single("Logo"), compagnyControllers.updateCompagny);
router.delete("/:id", compagnyControllers.deleteCompagny);

router.get(
  "/:id/my-recruiters",
  verifyToken,
  compagnyControllers.getMyRecruiters
);
router.get(
  "/:id/my-recruiters/:id",
  verifyToken,
  compagnyControllers.getRecruiter
);
router.delete(
  "/:id/my-recruiters/:id",
  verifyToken,
  compagnyControllers.GetForDeleteRecruiter,
  compagnyControllers.deleteRecruiter
);

module.exports = router;
