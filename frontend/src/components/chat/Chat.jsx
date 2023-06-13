import { useState } from "react";
import { useLocation } from "react-router-dom";

import "./Сhat.css";

import ContactsList from "./ContactsList";
import MessageContainer from "./MessageContainer";

function Chat() {
  const { state } = useLocation();
  const [contactSelected, setContactSelected] = useState(0);

  return (
    <div className="chat-consultant">
      <ContactsList setContactSelected={setContactSelected} />

      <MessageContainer contactSelected={contactSelected} offerId={state.id} />
    </div>
  );
}

export default Chat;
