/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
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
      <div className="chat-contact_list-box">
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
              onClick={() => selectContact(contact.candidateId)}
            />
            <p
              className="chat-contact_list-name"
              onClick={() => selectContact(contact.candidateId)}
            >
              {contact.name} {contact.firstname}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
ContactsList.propTypes = {
  setContactSelected: PropTypes.func.isRequired,
};

export default ContactsList;
