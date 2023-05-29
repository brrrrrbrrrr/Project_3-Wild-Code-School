const router = require("express").Router();
const chatController = require("../controllers/chatController");

router.get("/", chatController.getMessages);
router.post("/", chatController.sendMessages);

module.exports = router;
