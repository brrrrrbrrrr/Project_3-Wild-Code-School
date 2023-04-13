const router = require("express").Router();

const candidateControllers = require("../controllers/candidateControllers");

router.get("/", candidateControllers.browse);
router.get("/:id", candidateControllers.read);
router.post("/", candidateControllers.add);
router.put("/:id", candidateControllers.edit);
router.delete("/:id", candidateControllers.destroy);

module.exports = router;
