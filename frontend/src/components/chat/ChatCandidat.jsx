import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";

import "./Сhat.css";

function ChatCandidat() {
  const user = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isAutor, setIsAutor] = useState(false);
  const { state } = useLocation();

  const api = useApi();
  const urlFile = import.meta.env.VITE_APP_URL;
  const getMessages = () => {
    api
      .get(`/messages/${state?.id}`)

      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error receiving messages:", error);
      });
  };

  useEffect(() => {
    if (user.user) {
      if (user.user.userType === "candidates") {
        setIsAutor(true);
      } else if (user.user.userType === "consultants") {
        setIsAutor(false);
      }
    }
    getMessages();
  }, [user.user]);

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

    const messageData = {
      candidateId: user.user.id,
      offerId: state.id,
      date: formattedDate,
      hour: formattedTime,
      message: newMessage,
      candidateAutor: isAutor,
    };
    api
      .post(`/messages/${state.id}`, messageData)
      .then(() => {
        setNewMessage("");
        getMessages();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const deleteMessage = (messageId) => {
    api
      .delete(`/messages/${state.id}/${messageId}`)
      .then(() => {
        getMessages();
      })
      .catch((error) => {
        console.error("Error deleting message:", error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <div className="chat-container">
        <h2 className="chat-container_title">{state.job_title}</h2>
        <h2 className="chat-container_title">Messagerie</h2>
        {messages.slice(0, 1).map((message) => (
          <h2 key={message.messageId} className="chat-container_title">
            avec votre consultant {message.firstname} {message.name}
          </h2>
        ))}
        <div className="chat-messenger_box">
          {messages.map((message) => (
            <div>
              {message.candidateAutor ? (
                <div className="chat-messenger_box-line_candidate">
                  <img
                    src={`${urlFile}${message.pictureCan}`}
                    className="chat-messenger_box_image"
                    alt={message.name}
                  />

                  <div
                    key={message.messageId}
                    className="chat-messenger_box-message"
                  >
                    {message.message}

                    <RiDeleteBin5Line
                      className="chat-messenger_box-delete_button"
                      size={30}
                      onClick={() => deleteMessage(message.messageId)}
                    />
                  </div>
                </div>
              ) : (
                <div className="chat-messenger_box-line">
                  <img
                    src={`${urlFile}${message.picture}`}
                    className="chat-messenger_box_image"
                    alt={message.name}
                  />

                  <div
                    key={message.messageId}
                    className="chat-messenger_box-message"
                  >
                    {message.message}

                    <RiDeleteBin5Line
                      className="chat-messenger_box-delete_button"
                      size={30}
                      onClick={() => deleteMessage(message.messageId)}
                    />
                  </div>
                </div>
              )}
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
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatCandidat;
