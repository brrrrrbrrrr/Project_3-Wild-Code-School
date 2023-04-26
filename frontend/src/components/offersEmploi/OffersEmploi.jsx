/* eslint-disable react/function-component-definition */
import { useEffect, useState } from "react";
import useApi from "../../services/useApi";

import "./OffersEmploi.css";

const OffersEmploi = () => {
  const [offers, setOffers] = useState([]);
  const api = useApi();

  useEffect(() => {
    api
      .get("/offers")
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <div className="offersemploi-container">
      <div className="offersemploi-offer_wrapper">
        {offers.map((offer) => (
          <div className="offersemploi-offer_container" key={offer.id}>
            <div className="offersemploi-offer_logo">logo</div>
            <div className="offersemploi-offer_info">
              <div className="offersemploi-offer_info-main">
                <h3 className="offersemploi-offer_title">
                  {offer.jobTitleDetails}
                </h3>
                <h3 className="offersemploi-offer_salary">
                  {offer.salary} euro/day
                </h3>
              </div>
              <div className="offersemploi-offer_info-contract">
                <h3 className="offersemploi-offer_type-contract">
                  type of contract
                </h3>
                <h3 className="offersemploi-offer_remote">work: remote</h3>
                <h3 className="offersemploi-offer_city">{offer.city_name}</h3>
              </div>
            </div>
            <button type="button" className="offersemploi-offer_button-info">
              Plus d'infos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersEmploi;
