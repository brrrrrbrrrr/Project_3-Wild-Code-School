const router = require("express").Router();

const offerControllers = require("../controllers/offerControllers");
const candidateControllers = require("../controllers/candidateControllers");

router.get("/", offerControllers.browse);
router.get("/like", offerControllers.getLikedOffers);
router.post("/:offerId/like", candidateControllers.likeOffer);
router.get("/job_title", offerControllers.getjobtitle);
router.get("/remote", offerControllers.remotefilter);
router.get("/contract", offerControllers.contractfilter);
router.get("/:id", offerControllers.read);

module.exports = router;
