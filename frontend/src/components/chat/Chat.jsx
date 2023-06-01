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
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    console.warn(formattedDate);
    console.warn(formattedTime);

    const messageData = {
      person1: 1,
      person1REF: "candidate",
      person2: 2,
      person2REF: "consultant",
      date: formattedDate,
      hour: formattedTime,
      message: newMessage,
    };
    api
      .post("/messages", messageData)
      .then(() => {
        setNewMessage("");
        getMessages();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
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
          onKeyDown={handleKeyDown}
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
