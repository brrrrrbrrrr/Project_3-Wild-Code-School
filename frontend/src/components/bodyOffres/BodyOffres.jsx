/* eslint-disable react/function-component-definition */
import { useEffect, useState } from "react";
import useApi from "../../services/useApi";
import "./BodyOffres.css";

const BodyOffres = () => {
  const [offres, setOffres] = useState([]);
  const api = useApi();

  useEffect(() => {
    api
      .get("/offres")
      .then((response) => {
        const sortedOffres = response.data.sort((a, b) => b.id - a.id);
        setOffres(sortedOffres);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="body-container">
      <h2 className="body-title">Les dernières offres</h2>
      <div className="offre-wrapper">
        {offres.slice(0, 4).map((offre) => (
          <div className="offre-container" key={offre.id}>
            <h3 className="offre-title">{offre.jobTitleDetails}</h3>
            <h3 className="offre-city">{offre.city_name}</h3>
            <h3 className="offre-salary">{offre.salary} euro/day</h3>
            <button type="button" className="offre-button_info">
              Plus d'infos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyOffres;
