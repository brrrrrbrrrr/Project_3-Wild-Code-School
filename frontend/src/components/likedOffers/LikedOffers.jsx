/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useUser } from "../../contexts/UserContext";

import useApi from "../../services/useApi";
import LikedOffer from "./LikedOffer";

import "./LikedOffers.css";

const LikedOffers = (props) => {
  const { candidateId } = props;
  const [offers, setOffers] = useState([]);
  const api = useApi();
  const user = useUser();

  useEffect(() => {
    console.warn("user : ", user);
    api
      .get(`/offers/like?candidateId=${candidateId}`)
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="likedoffers-container">
      <div className="likedoffers-status">
        <button type="button" className="likedoffers-button_candidate">
          En attente ({offers.length})
        </button>
        <button type="button" className="likedoffers-button_candidate">
          Validé
        </button>
        <button type="button" className="likedoffers-button_candidate">
          Terminé
        </button>
      </div>
      <div className="likedoffers-offers">
        {offers.map((offer) => {
          return <LikedOffer key={offer.id} offer={offer} />;
        })}
      </div>
    </div>
  );
};

LikedOffers.propTypes = {
  candidateId: PropTypes.string.isRequired,
};

export default LikedOffers;
