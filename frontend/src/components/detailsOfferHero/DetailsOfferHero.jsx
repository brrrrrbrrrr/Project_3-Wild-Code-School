/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../services/useApi";

const DetailsOfferHero = () => {
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
  }, [api, id]);

  return (
    <div>
      <h2>{offre.jobTitleDetails}</h2>
      <h3>{offre.company}</h3>
      <p>{offre.jobOfferPresentation}</p>
      <p>{offre.city_id}</p>
      <p>{offre.salary} euro/day</p>
    </div>
  );
};

export default DetailsOfferHero;
