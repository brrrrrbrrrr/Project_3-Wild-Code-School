const router = require("express").Router();

const offreControllers = require("../controllers/offreControllers");

router.get("/", offreControllers.browse);

module.exports = router;
