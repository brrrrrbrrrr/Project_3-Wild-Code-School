import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../services/useApi";

import DetailsOfferHero from "../components/detailsOfferHero/DetailsOfferHero";
import DetailsOfferBody from "../components/detailsOfferBody/DetailsOfferBody";
import DetailsOfferConsultant from "../components/detailsOfferConsultant/DetailsOfferConsultant";

export default function PageDetailsOffer() {
  const { id } = useParams();
  const [offre, setOffre] = useState({});
  const api = useApi();

  useEffect(() => {
    api
      .get(`/offres/${id}`)
      .then((response) => {
        setOffre(response.data);
        console.warn(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <DetailsOfferHero offre={offre} />
      <DetailsOfferBody offre={offre} />
      <DetailsOfferConsultant offre={offre} />
    </div>
  );
}
