const router = require("express").Router();
const { verifyToken } = require("../utils/auth");

const offerControllers = require("../controllers/offerControllers");
const candidateControllers = require("../controllers/candidateControllers");

router.get("/", offerControllers.browse);
router.get("/like", verifyToken, offerControllers.getLikedOffers);
router.post("/:offerId/like", candidateControllers.likeOffer);
router.get("/job_title", offerControllers.getjobtitle);
router.get("/remote", offerControllers.remotefilter);
router.get("/contract", offerControllers.contractfilter);
router.get("/city", offerControllers.cityfilter);
router.get("/filterall", offerControllers.multifilter);
router.get("/:id", offerControllers.read);

module.exports = router;
