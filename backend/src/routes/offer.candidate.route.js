const router = require("express").Router();
const offerCandidateControllers = require("../controllers/offerCandidateControllers");

router.put(
  "/offer-status/:status/offer/:offerId/candidate/:candidateId",
  offerCandidateControllers.editOfferStatusCandidate
);

router.get(
  "/offer-status/:status/offer/:offerId/candidate/:candidateId",
  offerCandidateControllers.statusOfferCandidate
);
router.get(
  "/offer-status/:status/offer/:offerId",
  offerCandidateControllers.statusOffer
);
router.get("/offer-status/:status", offerCandidateControllers.statusAllOffers);

module.exports = router;
