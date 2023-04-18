/* eslint-disable react/function-component-definition */
import "./BodyOffres.css";

const BodyOffres = () => {
  return (
    <div className="body-container">
      <h2 className="body-title">Les dernières offres</h2>
      <div className="offre-wrapper">
        <div className="offre-container">
          <h3 className="offre-title">Ingénieur réseaux / H/F – Industrie</h3>
          <h3 className="offre-city">Saint-Nazaire</h3>
          <button type="button" className="offre-button_info">
            Plus d'infos
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodyOffres;
