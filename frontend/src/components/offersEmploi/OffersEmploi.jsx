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
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedRemoteType, setSelectedRemoteType] = useState("");
  const [selectedContractType, setSelectedContractType] = useState("");
  const [jobTitleOptions, setJobTitleOptions] = useState([]);
  const [remoteOptions, setRemoteOptions] = useState([]);
  const [contractOptions, setContractOptions] = useState([]);

  const api = useApi();

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    api.get("/offers/job_title").then((response) => {
      setJobTitleOptions(
        response.data.map((jobTitle) => (
          <option value={jobTitle.id} key={jobTitle.name}>
            {jobTitle.name}
          </option>
        ))
      );
    });
  }, []);

  useEffect(() => {
    api.get("/offers/remote").then((response) => {
      setRemoteOptions(
        response.data.map((remote) => (
          <option value={remote.id} key={remote.type}>
            {remote.type}
          </option>
        ))
      );
    });
  }, []);

  useEffect(() => {
    api.get("/offers/contract").then((response) => {
      setContractOptions(
        response.data.map((contract) => (
          <option key={contract.type}>{contract.type}</option>
        ))
      );
    });
  }, []);

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

  const resetFilters = () => {
    setSelectedJobTitle("0");
    setSelectedRemoteType("0");
    setSelectedContractType("0");
    api
      .get("/offers", {
        params: {
          allOffers: "marchestp",
        },
      })
      .then((response) => {
        const sortedOffers = response.data.sort((a, b) => b.id - a.id);
        setOffers([...sortedOffers]);
        setIsAllLoaded(true);
        setPage(page + 1);
        setIsLoading(false);
        setIsFirstLoad(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleChangeX = (e) => {
    const filter = e.target.value;
    if (filter === "0") {
      setIsLoading(true);
      api
        .get("/offers", {
          params: {
            allOffers: "marchestp",
          },
        })
        .then((response) => {
          const sortedOffers = response.data.sort((a, b) => b.id - a.id);
          setOffers([...sortedOffers]);
          setIsAllLoaded(true);
          setPage(page + 1);
          setIsLoading(false);
          setIsFirstLoad(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    } else {
      setSelectedJobTitle(filter);
      api
        .get("/offers", {
          params: {
            filter,
            typeFilter: 1,
          },
        })
        .then((response) => {
          const sortedOffers = response.data.sort((a, b) => b.id - a.id);
          setOffers([...sortedOffers]);
          setIsAllLoaded(true);
          setIsLoading(false);
          setIsFirstLoad(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="offersemploi-container">
      <div className="offersemploi-filters">
        <select
          value={selectedJobTitle}
          onChange={(event) => handleChangeX(event)}
        >
          <option value="0">Job Title</option>
          {jobTitleOptions}
        </select>
        <select
          value={selectedRemoteType}
          onChange={(event) => setSelectedRemoteType(event.target.value)}
        >
          <option value="0">Remote Type</option>
          {remoteOptions}
        </select>
        <select
          value={selectedContractType}
          onChange={(event) => setSelectedContractType(event.target.value)}
        >
          <option value="0">Contract Type</option>
          {contractOptions}
        </select>
        <button type="button" onClick={resetFilters}>
          Réinitialiser
        </button>
      </div>
      <div className="offersemploi-offer_wrapper">
        {offers
          // .filter(
          //   (offer) =>
          //     selectedJobTitle === "" || offer.job_title === selectedJobTitle
          // )
          // .filter(
          //   (offer) =>
          //     selectedRemoteType === "" ||
          //     offer.remote_type === selectedRemoteType
          // )
          // .filter(
          //   (offer) =>
          //     selectedContractType === "" ||
          //     offer.contract_type === selectedContractType
          // )
          .map((offer) => (
            <div className="offersemploi-offer_container" key={offer.id}>
              <div className="offersemploi-offer_logo">logo</div>
              <div className="offersemploi-offer_info">
                <div className="offersemploi-offer_info-main">
                  <h3 className="offersemploi-offer_title">
                    {offer.job_title}
                  </h3>
                  <h3 className="offersemploi-offer_salary">
                    {offer.salary} euro/an
                  </h3>
                </div>
                <div className="offersemploi-offer_info-contract">
                  <h3 className="offersemploi-offer_type-contract">
                    {offer.contract_type}
                  </h3>
                  <h3 className="offersemploi-offer_remote">
                    {offer.remote_type}
                  </h3>
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
