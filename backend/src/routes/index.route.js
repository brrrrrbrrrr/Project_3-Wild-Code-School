const router = require("express").Router();
const consultantControllers = require("../controllers/consultantControllers");

// ici vos routes
router.post("/consultants", consultantControllers.add);

module.exports = router;
