/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Button from "@mui/material/Button";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";
import Loader from "../loader/Loader";
import OfferEmploi from "./offerEmpoi/OfferEmploi";
import "./OffersEmploi.css";

const OffersEmploi = () => {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [jobTitleOptions, setJobTitleOptions] = useState([]);
  const [remoteOptions, setRemoteOptions] = useState([]);
  const [contractOptions, setContractOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const jobRef = useRef();
  const remoteRef = useRef();
  const contractRef = useRef();
  const cityRef = useRef();
  const api = useApi();
  const user = useUser();

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    api.get("/offers/job_title").then((response) => {
      setJobTitleOptions(
        response.data.map((jobTitle) => (
          <option value={jobTitle.id} key={jobTitle.id}>
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
          <option value={remote.id} key={remote.id}>
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
          <option value={contract.id} key={contract.id}>
            {contract.type}
          </option>
        ))
      );
    });
  }, []);

  useEffect(() => {
    api.get("/offers/city").then((response) => {
      setCityOptions(
        response.data.map((city) => (
          <option value={city.id} key={city.id}>
            {city.name}
          </option>
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
            candId: user?.user?.id,
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
    jobRef.current.value = 0;
    remoteRef.current.value = 0;
    contractRef.current.value = 0;
    cityRef.current.value = 0;
    const Filters = {
      jobmultifilter: 0,
      remotemultifilter: 0,
      contractmultifilter: 0,
      citymultifilter: 0,
    };
    api
      .get("/offers/filterall", {
        params: {
          allOffers: "marchestp",
          filter: Filters,
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

  const MultiFilter = () => {
    const jobmultifilter = jobRef.current.value;
    const remotemultifilter = remoteRef.current.value;
    const contractmultifilter = contractRef.current.value;
    const citymultifilter = cityRef.current.value;
    const Filters = {
      jobmultifilter,
      remotemultifilter,
      contractmultifilter,
      citymultifilter,
    };
    api
      .get("/offers/filterall", {
        params: {
          filter: Filters,
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

  return (
    <div className="offersemploi-container">
      <div className="offersemploi-filters">
        <select
          className="offersemploi-select"
          ref={jobRef}
          onChange={() => MultiFilter()}
        >
          <option value="0">Job Title</option>
          {jobTitleOptions}
        </select>
        <select
          className="offersemploi-select"
          ref={remoteRef}
          onChange={() => MultiFilter()}
        >
          <option value="0">Remote Type</option>
          {remoteOptions}
        </select>
        <select
          className="offersemploi-select"
          ref={contractRef}
          onChange={() => MultiFilter()}
        >
          <option value="0">Contract Type</option>
          {contractOptions}
        </select>
        <select
          className="offersemploi-select"
          ref={cityRef}
          onChange={() => MultiFilter()}
        >
          <option value="0">City Type</option>
          {cityOptions}
        </select>
        <Button
          id="offersemploi-offer_button-info-filter"
          variant="contained"
          onClick={resetFilters}
        >
          Réinitialiser
        </Button>
      </div>
      <div className="offersemploi-offer_wrapper">
        {offers.map((offer) => {
          return (
            <OfferEmploi key={offer.id} offer={offer} userId={user?.user?.id} />
          );
        })}
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
