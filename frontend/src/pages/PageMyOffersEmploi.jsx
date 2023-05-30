import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import useApi from "../services/useApi";
import OfferEmploi from "../components/offersEmploi/offerEmpoi/OfferEmploi";

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
    <div>
      <Link to="/new-offer">
        <button type="button">Ajouter une offre</button>
      </Link>

      {myOffers?.map((offer) => (
        <OfferEmploi key={offer.id} offer={offer} userId={id} />
      ))}
    </div>
  );
}

export default PageMyOffersEmploi;
