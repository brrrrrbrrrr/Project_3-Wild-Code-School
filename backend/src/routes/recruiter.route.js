const router = require("express").Router();
const { verifyToken } = require("../utils/auth");
const recruiterControllers = require("../controllers/recruiterControllers");

router.get("/", recruiterControllers.browse);
router.get("/:id", recruiterControllers.read);
// Route protégé
router.put("/:id", recruiterControllers.edit);
router.post("/", recruiterControllers.add);
router.delete("/:id", verifyToken, recruiterControllers.destroy);
module.exports = router;
