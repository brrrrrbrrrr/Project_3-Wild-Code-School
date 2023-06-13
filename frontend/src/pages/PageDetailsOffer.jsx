import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../services/useApi";

import DetailsOfferHero from "../components/detailsOfferHero/DetailsOfferHero";
import DetailsOfferBody from "../components/detailsOfferBody/DetailsOfferBody";
import DetailsOfferConsultant from "../components/detailsOfferConsultant/DetailsOfferConsultant";

export default function PageDetailsOffer() {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const api = useApi();

  useEffect(() => {
    api
      .get(`/offers/${id}`)
      .then((response) => {
        setOffer(response.data);
      })
      .catch(() => {
        toast.error("Une erreur s'est produite", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }, []);

  return (
    <div>
      <DetailsOfferHero offer={offer} />
      <DetailsOfferBody offer={offer} />
      <DetailsOfferConsultant offer={offer} />
    </div>
  );
}
