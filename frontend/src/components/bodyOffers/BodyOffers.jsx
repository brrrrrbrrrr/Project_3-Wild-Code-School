/* eslint-disable react/function-component-definition */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useApi from "../../services/useApi";
import { useUser } from "../../contexts/UserContext";
import "./BodyOffers.css";
import BodyOffer from "./BodyOffer";

const BodyOffers = () => {
  const [offers, setOffers] = useState([]);

  const api = useApi();
  const user = useUser();

  useEffect(() => {
    api
      .get("/offers", {
        params: {
          candId: user?.user?.id,
        },
      })
      .then((response) => {
        const sortedOffers = response.data.sort((a, b) => b.id - a.id);
        setOffers(sortedOffers);
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
    <div className="bodyoffers-container">
      <h2 className="bodyoffers-title">Les dernières offres</h2>
      <div className="bodyoffers-offer_wrapper">
        {offers.slice(0, 4).map((offer) => (
          <BodyOffer key={offer.id} offer={offer} userId={user?.user?.id} />
        ))}
      </div>
    </div>
  );
};

export default BodyOffers;
