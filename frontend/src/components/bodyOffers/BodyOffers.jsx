/* eslint-disable react/function-component-definition */
import { useEffect, useState } from "react";
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
      .catch((error) => {
        console.error(error);
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
            <h3 className="bodyoffers-offer_salary">{offer.salary} euro/day</h3>
            <button type="button" className="bodyoffers-offer_button-info">
              Plus d'infos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyOffers;
