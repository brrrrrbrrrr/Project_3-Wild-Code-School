/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";
import { FiMapPin } from "react-icons/fi";
import { CgEuro } from "react-icons/cg";

const DetailsOfferHero = (props) => {
  const { offre } = props;

  return (
    <div className="body-container">
      <h2>{offre.Logo}</h2>
      <h2>{offre.jobTitleDetails}</h2>
      <p>
        <FiMapPin /> {offre.cityName} - {offre.recruiterPostalCode}
      </p>
      <h3>
        {offre.contratType}-
        {offre.remoteWork === 1 ? "Télétravail complet" : ""}
      </h3>
      <p>
        <CgEuro /> {offre.salary} Euro par an
      </p>
    </div>
  );
};

DetailsOfferHero.propTypes = {
  offre: PropTypes.shape({
    Logo: PropTypes.string.isRequired,
    jobTitleDetails: PropTypes.string.isRequired,
    cityName: PropTypes.string.isRequired,
    recruiterPostalCode: PropTypes.string.isRequired,
    contratType: PropTypes.string.isRequired,
    remoteWork: PropTypes.number.isRequired,
    salary: PropTypes.number.isRequired,
  }).isRequired,
};

export default DetailsOfferHero;
