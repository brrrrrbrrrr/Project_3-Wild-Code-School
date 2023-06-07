const router = require("express").Router();

const offerControllers = require("../controllers/offerControllers");
const candidateControllers = require("../controllers/candidateControllers");

router.get("/", offerControllers.browse);
router.get("/valid", offerControllers.validcheck);
router.get("/findall", offerControllers.alloffers);
router.post("/:offerId/like", candidateControllers.likeOffer);
router.get("/job_title", offerControllers.getjobtitle);
router.get("/remote", offerControllers.remotefilter);
router.get("/contract", offerControllers.contractfilter);
router.get("/city", offerControllers.cityfilter);
router.get("/filterall", offerControllers.multifilter);
router.put("/valid", offerControllers.updatevalid);
router.get("/:id", offerControllers.read);

module.exports = router;
