/* eslint-disable import/no-extraneous-dependencies */
const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const candidateControllers = require("../controllers/candidateControllers");
const { verifyToken } = require("../utils/auth");

const uploadFolder = path.join(__dirname, "..", "..", "public", "uploads");

const upload = multer({ dest: uploadFolder });

router.get("/", candidateControllers.browse);
router.get("/:id", candidateControllers.read);
router.post("/", upload.single("resume"), candidateControllers.add);
router.put("/:id", verifyToken, candidateControllers.edit);
router.delete("/:id", verifyToken, candidateControllers.destroy);

module.exports = router;
