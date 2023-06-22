import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../services/useApi";
import { useUser } from "../contexts/UserContext";

import DetailsOfferHero from "../components/detailsOfferHero/DetailsOfferHero";
import DetailsOfferBody from "../components/detailsOfferBody/DetailsOfferBody";
import DetailsOfferConsultant from "../components/detailsOfferConsultant/DetailsOfferConsultant";

export default function PageDetailsOffer() {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const api = useApi();
  const user = useUser();

  useEffect(() => {
    api
      .get(`/offers/${id}`, {
        params: {
          candId: user?.user?.id,
        },
      })
      .then((response) => {
        setOffer(response.data);
      })
      .catch(() => {
        toast.error("Une erreur s'est produite", {
          position: "top-left",
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
      <DetailsOfferBody offer={offer} userId={user?.user?.id} />
      <DetailsOfferConsultant offer={offer} />
    </div>
  );
}
