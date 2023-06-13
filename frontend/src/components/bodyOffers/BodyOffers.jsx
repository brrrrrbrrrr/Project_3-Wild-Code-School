/* eslint-disable react/function-component-definition */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../../services/useApi";
import "./BodyOffers.css";

const BodyOffers = () => {
  const [offers, setOffers] = useState([]);
  const api = useApi();

  useEffect(() => {
    api
      .get("/offers")
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
          <div className="bodyoffers-offer_container" key={offer.id}>
            <h3 className="bodyoffers-offer_title">{offer.jobTitleDetails}</h3>
            <h3 className="bodyoffers-offer_city">{offer.city_name}</h3>
            <h3 className="bodyoffers-offer_salary">{offer.salary} euro/an</h3>
            <Link to={`/offers/${offer.id}`}>
              <button type="button" className="bodyoffers-offer_button-info">
                Plus d'infos
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyOffers;
