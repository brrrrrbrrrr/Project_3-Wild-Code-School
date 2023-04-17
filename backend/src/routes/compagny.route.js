const router = require("express").Router();
const compagnyControllers = require("../controllers/compagnyControllers");

router.get("/", compagnyControllers.getCompagny);
router.get("/:id", compagnyControllers.read);
router.post("/", compagnyControllers.postCompagny);
router.put("/:id", compagnyControllers.updateCompagny);
router.delete("/:id", compagnyControllers.deleteCompagny);

module.exports = router;
