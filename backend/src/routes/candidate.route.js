const router = require("express").Router();

const candidateControllers = require("../controllers/candidateControllers");
const { verifyToken } = require("../utils/auth");

router.get("/", candidateControllers.browse);
router.get("/:id", candidateControllers.read);
router.post("/", candidateControllers.add);
router.put("/:id", verifyToken, candidateControllers.edit);
router.delete("/:id", verifyToken, candidateControllers.destroy);

module.exports = router;
