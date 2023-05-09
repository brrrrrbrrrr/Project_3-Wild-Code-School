const router = require("express").Router();

const offerControllers = require("../controllers/offerControllers");

router.get("/", offerControllers.browse);
router.get("/job_title", offerControllers.getjobtitle);
router.get("/remote", offerControllers.remotefilter);
router.get("/contract", offerControllers.contractfilter);

module.exports = router;
