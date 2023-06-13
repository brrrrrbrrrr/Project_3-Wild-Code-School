/* eslint-disable import/no-extraneous-dependencies */
const router = require("express").Router();
const multer = require("multer");
const {
  storageCandidate,
  UpdateStorageCandidate,
} = require("../utils/multerCandidate");

const candidateControllers = require("../controllers/candidateControllers");
const { verifyToken } = require("../utils/auth");

const upload = multer({ storage: storageCandidate });
const edit = multer({ storage: UpdateStorageCandidate });
router.get("/files/:id", candidateControllers.readFile);

router.get("/", candidateControllers.browse);
router.get("/:id", candidateControllers.read);
router.post(
  "/",
  upload.fields([
    {
      name: "resume",
      maxCount: 1,
    },
    {
      name: "picture",
      maxCount: 1,
    },
  ]),
  candidateControllers.add
);

router.put(
  "/:id",
  verifyToken,
  edit.fields([
    {
      name: "resume",
      maxCount: 1,
    },
    {
      name: "picture",
      maxCount: 1,
    },
  ]),
  candidateControllers.edit
);
router.delete(
  "/:id",
  verifyToken,
  candidateControllers.getCandidateByIdToNext,
  candidateControllers.destroy
);

module.exports = router;
