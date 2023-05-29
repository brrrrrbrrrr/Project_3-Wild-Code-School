const router = require("express").Router();
const multer = require("multer");
const { storageOffer } = require("../utils/multerOffer");

const upload = multer({ storage: storageOffer });
const offerControllers = require("../controllers/offerControllers");
const candidateControllers = require("../controllers/candidateControllers");

router.post("/", upload.single("teamPicture"), offerControllers.add);
router.get("/recruiters/:id", offerControllers.getMyOffers);
router.delete("/:id", offerControllers.destroy);
router.get("/", offerControllers.browse);
router.post("/:offerId/like", candidateControllers.likeOffer);
router.get("/job_title", offerControllers.getjobtitle);
router.get("/remote", offerControllers.remotefilter);
router.get("/contract", offerControllers.contractfilter);
router.get("/city", offerControllers.cityfilter);
router.get("/filterall", offerControllers.multifilter);
router.get("/:id", offerControllers.read);

module.exports = router;
