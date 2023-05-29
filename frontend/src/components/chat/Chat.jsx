import { useEffect, useState } from "react";
import useApi from "../../services/useApi";
import "./Сhat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const api = useApi();

  const getMessages = () => {
    api
      .get("/messages")
      .then((response) => {
        console.warn(response.data);
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error receiving messages:", error);
      });
  };

  useEffect(() => {
    getMessages();
  }, []);

  const sendMessage = () => {
    api
      .post("/messages", { message: newMessage })
      .then(() => {
        setNewMessage("");
        getMessages();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div className="chat-container">
      <h2>Messenger</h2>
      <div className="chat-messenger_box">
        {messages.map((message) => (
          <div key={message.id} className="chat-messenger_box-message">
            {message.message}
          </div>
        ))}
      </div>
      <div className="chat-input_box">
        <input
          className="chat-input_box-input"
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button
          className="chat-input_box-button"
          type="button"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
