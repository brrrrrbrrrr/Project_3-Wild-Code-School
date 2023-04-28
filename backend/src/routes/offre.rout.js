const router = require("express").Router();

const offreControllers = require("../controllers/offreControllers");

router.get("/", offreControllers.browse);
router.get("/:id", offreControllers.read);

module.exports = router;
