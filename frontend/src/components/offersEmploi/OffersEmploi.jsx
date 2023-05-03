/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useApi from "../../services/useApi";
import Loader from "../loader/Loader";

import "./OffersEmploi.css";

const OffersEmploi = () => {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isAllLoaded, setIsAllLoaded] = useState(false);

  const api = useApi();

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if ((inView || isFirstLoad) && !isLoading && !isAllLoaded) {
      setIsLoading(true);
      api
        .get("/offers", {
          params: {
            page,
            limit: 2,
          },
        })
        .then((response) => {
          const sortedOffers = response.data.sort((a, b) => b.id - a.id);
          console.warn(sortedOffers.length);
          setOffers([...offers, ...sortedOffers]);
          if (sortedOffers.length < 2) {
            setIsAllLoaded(true);
          }
          setPage(page + 1);
          setIsLoading(false);
          setIsFirstLoad(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [inView, isFirstLoad]);

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
                  {offer.salary} euro/mois
                </h3>
              </div>
              <div className="offersemploi-offer_info-contract">
                <h3 className="offersemploi-offer_type-contract">
                  type de contrat
                </h3>
                <h3 className="offersemploi-offer_remote">travail: remote</h3>
                <h3 className="offersemploi-offer_city">{offer.city_name}</h3>
              </div>
            </div>
            <button type="button" className="offersemploi-offer_button-info">
              Plus d'infos
            </button>
          </div>
        ))}
        {isLoading && (
          <div>
            <Loader color="var(--primary-color)" />
          </div>
        )}
        {isAllLoaded && (
          <div className="offersemploi-all_loaded">
            Aujourd'hui, il n'y a plus d'offres.
          </div>
        )}
        <div ref={ref} className="offersemploi-fef_div" />
      </div>
    </div>
  );
};

export default OffersEmploi;
