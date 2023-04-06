const router = require("express").Router();

const recruitmentControllers = require("../controllers/recruitmentControllers");

router.get("/", recruitmentControllers.browse);
router.get("/:id", recruitmentControllers.read);
// router.put("//:id", recruitmentControllers.edit);
// router.post("/", recruitmentControllers.add);
// router.delete("//:id", recruitmentControllers.destroy);
module.exports = router;
