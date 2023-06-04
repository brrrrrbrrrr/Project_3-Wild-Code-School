const router = require("express").Router();
const filterControllers = require("../controllers/filterControllers");
const { verifyToken } = require("../utils/auth");

router.post("/", filterControllers.addFilter);
router.get("/", verifyToken, filterControllers.compareFilter);
router.get("/update", verifyToken, filterControllers.updateFilter);

module.exports = router;
