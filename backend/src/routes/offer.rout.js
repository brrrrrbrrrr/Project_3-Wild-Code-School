const router = require("express").Router();
const multer = require("multer");
const { verifyToken } = require("../utils/auth");

const { storageOffer, UpdateStorageOffer } = require("../utils/multerOffer");

const upload = multer({ storage: storageOffer });
const edit = multer({ storage: UpdateStorageOffer });
const offerControllers = require("../controllers/offerControllers");
const candidateControllers = require("../controllers/candidateControllers");

const { isConsultantAdmin } = require("../utils/authConsultant");

router.post(
  "/",
  verifyToken,
  upload.single("teamPicture"),
  offerControllers.add
);
router.get("/recruiters/:id", verifyToken, offerControllers.getMyOffers);
router.delete("/:id", verifyToken, isConsultantAdmin, offerControllers.destroy);
router.get("/", offerControllers.browse);
router.get("/valid", offerControllers.validcheck);
router.get("/findall", offerControllers.alloffers);
router.get("/like", verifyToken, offerControllers.getLikedOffers);
router.post("/:offerId/like", candidateControllers.likeOffer);
router.get("/job_title", offerControllers.getjobtitle);
router.get("/remote", offerControllers.remotefilter);
router.get("/contract", offerControllers.contractfilter);
router.get("/city", offerControllers.cityfilter);
router.get("/filterall", offerControllers.multifilter);
router.put("/valid", offerControllers.updatevalid);
router.get("/:id", offerControllers.read);
router.put(
  "/recruiters/:id/edit/:id",
  verifyToken,
  offerControllers.getMyOfferForUpdate,
  edit.single("teamPicture"),
  offerControllers.edit
);

module.exports = router;
