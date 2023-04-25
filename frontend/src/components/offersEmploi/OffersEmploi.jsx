/* eslint-disable react/function-component-definition */
import "./OffersEmploi.css";

const OffersEmploi = () => {
  return (
    <div className="body-container">
      <h2 className="body-title">Les dernières offres</h2>
      <div className="offre-wrapper">
        <div className="offre-container" key={1}>
          <h3 className="offre-title">title</h3>
          <h3 className="offre-city">city</h3>
          <h3 className="offre-salary">salary euro/day</h3>
          <button type="button" className="offre-button_info">
            Plus d'infos
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffersEmploi;
