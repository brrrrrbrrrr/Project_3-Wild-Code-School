import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import useApi from "../services/useApi";
import OfferEmploi from "../components/offersEmploi/offerEmpoi/OfferEmploi";
import "./PageMyOffersEmploi.css";

function PageMyOffersEmploi() {
  const api = useApi();
  const { user } = useUser();
  const userType = user?.userType;
  const id = user?.id;
  const [myOffers, setMyOffers] = useState();

  useEffect(() => {
    api
      .get(`/offers/${userType}/${id}`)
      .then((res) => {
        setMyOffers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="page-my-offers-emploi_container">
      <div className="page-my-offers-emploi_btn-container">
        <Link to="/new-offer">
          <button type="button" className="page-my-offers-emploi_btn">
            Ajouter une offre
          </button>
        </Link>
      </div>

      {myOffers?.map((offer) => (
        <OfferEmploi key={offer.id} offer={offer} userId={id} />
      ))}
    </div>
  );
}

export default PageMyOffersEmploi;
