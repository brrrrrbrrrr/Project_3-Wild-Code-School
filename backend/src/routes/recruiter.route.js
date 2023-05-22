const router = require("express").Router();
const multer = require("multer");

const { storageRecruiter } = require("../utils/multerRecruiter");
const { verifyToken } = require("../utils/auth");
const recruiterControllers = require("../controllers/recruiterControllers");

const upload = multer({ storage: storageRecruiter });

router.get("/", recruiterControllers.browse);
router.get("/:id", recruiterControllers.read);
// Route protégé
router.put("/:id", recruiterControllers.edit);
router.post("/", upload.single("picture"), recruiterControllers.add);
router.delete("/:id", verifyToken, recruiterControllers.destroy);
module.exports = router;
