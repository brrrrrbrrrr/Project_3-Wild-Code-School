const router = require("express").Router();

const offerControllers = require("../controllers/offerControllers");

router.get("/", offerControllers.browse);

module.exports = router;
