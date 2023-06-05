const router = require("express").Router();
const chatController = require("../controllers/chatController");
const { verifyToken } = require("../utils/auth");

// router.get("/", verifyToken, chatController.getMessages);
router.get("/:id", verifyToken, chatController.getMessages);
router.post("/:id", verifyToken, chatController.sendMessages);

module.exports = router;
