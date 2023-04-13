const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const compagnyControllers = require("./controllers/compagnyControllers");
const {
  hashPassword,
  verifyPassword,
  // verifyToken,
} = require("./auth/compagnyAuth");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);
router.get("/compagny", compagnyControllers.getCompagny);
router.post("/compagny", hashPassword, compagnyControllers.postCompagny);
router.put("/compagny/:id", compagnyControllers.updateCompagny);
router.delete("/compagny/:id", compagnyControllers.deleteCompagny);
// router.use(verifyToken);
router.post(
  "/login",
  compagnyControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
module.exports = router;
