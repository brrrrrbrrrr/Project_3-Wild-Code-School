/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";
import LikedOffer from "./LikedOffer";
import "./LikedOffers.css";

const LikedOffers = () => {
  const [offers, setOffers] = useState([]);
  const [activeButton, setActiveButton] = useState("en attente"); // Ajout de l'état pour suivre le bouton actif

  const api = useApi();
  const user = useUser();

  useEffect(() => {
    console.warn("user : ", user);
    api
      .get(`/offers/like`)
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  // Filter the offers based on the active button
  const filteredOffers = offers.filter((offer) => {
    if (activeButton === "en attente") {
      return offer.offer_status_id === 1;
    }
    if (activeButton === "valide") {
      return offer.offer_status_id === 2;
    }
    if (activeButton === "termine") {
      return offer.offer_status_id === 3;
    }
    return false;
  });

  return (
    <div className="likedoffers-container">
      <div className="likedoffers-status">
        <button
          type="button"
          className={`likedoffers-button_candidate ${
            activeButton === "en attente" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("en attente")}
        >
          En attente (
          {offers.filter((offer) => offer.offer_status_id === 1).length})
        </button>
        <button
          type="button"
          className={`likedoffers-button_candidate ${
            activeButton === "valide" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("valide")}
        >
          Validé ({offers.filter((offer) => offer.offer_status_id === 2).length}
          )
        </button>
        <button
          type="button"
          className={`likedoffers-button_candidate ${
            activeButton === "termine" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("termine")}
        >
          Terminé (
          {offers.filter((offer) => offer.offer_status_id === 3).length})
        </button>
      </div>
      <div className="likedoffers-offers">
        {filteredOffers.map((offer) => (
          <LikedOffer key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default LikedOffers;
