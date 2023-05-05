const router = require("express").Router();

const offerControllers = require("../controllers/offerControllers");
const candidateControllers = require("../controllers/candidateControllers");

router.get("/", offerControllers.browse);
router.post("/:offerId/like", candidateControllers.likeOffer);

module.exports = router;
