const router = require("express").Router();
const chatController = require("../controllers/chatController");
const { verifyToken } = require("../utils/auth");

router.get("/chat/:id", verifyToken, chatController.getContact);
router.get(
  "/:id/:candidateId",
  verifyToken,
  chatController.getMessagesConsultant
);
router.post("/", verifyToken, chatController.sendMessagesConsultant);
router.post("/:id", verifyToken, chatController.sendMessages);
router.delete("/:id/:messageId", chatController.deleteMessage);
router.get("/:id", verifyToken, chatController.getMessages);

module.exports = router;
