const router = require("express").Router();
const offerCandidateControllers = require("../controllers/offerCandidateControllers");

router.put(
  "/offer-status/:status/candidate/:candidateId/offer/:offerId",
  offerCandidateControllers.editOfferStatusCandidate
);

router.get(
  "/offer-status/:status/candidate/:candidateId",
  offerCandidateControllers.getCandidateWithStatus
);
router.get("/offer-status/:status", offerCandidateControllers.countOfferLikes);
router.get("/offer-status", offerCandidateControllers.getCountAllCandidates);

module.exports = router;
