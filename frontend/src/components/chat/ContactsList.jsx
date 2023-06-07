/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useApi from "../../services/useApi";

function ContactsList({ setContactSelected }) {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const { state } = useLocation();
  const api = useApi();
  const urlFile = import.meta.env.VITE_APP_URL;

  const getContacts = () => {
    api
      .get(`/messages/chat/${state?.id}`)
      .then((response) => {
        console.warn(response.data);
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Error receiving contacts:", error);
      });
  };
  useEffect(() => {
    getContacts();
  }, []);

  const selectContact = (id) => {
    setContactSelected(id);
    setSelectedContact(id);
  };

  return (
    <div className="chat-contact_list">
      <h3 className="chat-contact_list-title">contacts</h3>
      {contacts.map((contact) => (
        <div
          className={`chat-contact_list-container ${
            selectedContact === contact.candidateId ? "active-contact" : ""
          }`}
          key={contact.candidateId}
        >
          <img
            src={`${urlFile}${contact.picture}`}
            className="chat-messenger_box_image"
            alt={contact.name}
          />
          <p onClick={() => selectContact(contact.candidateId)}>
            {contact.name} {contact.firstname}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ContactsList;
