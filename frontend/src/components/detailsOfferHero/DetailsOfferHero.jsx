/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";
import { FiMapPin } from "react-icons/fi";
import { CgEuro } from "react-icons/cg";
import { SiReacthookform } from "react-icons/si";
import "./DetailsOfferHero.css";

const DetailsOfferHero = (props) => {
  const { offre } = props;

  return (
    <div className="detailsOfferHero-container">
      <h2 className="detailsOfferHero-logo">Logo</h2>
      <h2 className="detailsOfferHero-title">{offre.jobTitleDetails}</h2>
      <div className="detailsOfferHero-subtitles">
        <h3 className="detailsOfferHero-city detailsOfferHero-subtitle_title">
          <FiMapPin /> {offre.cityName} - {offre.recruiterPostalCode}
        </h3>
        <h3 className="detailsOfferHero-contrat detailsOfferHero-subtitle_title">
          <SiReacthookform />
          {offre.contratType}{" "}
          {offre.remoteWork === 1 ? "- Télétravail complet" : ""}
        </h3>
        <h3 className="detailsOfferHero-salary detailsOfferHero-subtitle_title">
          <CgEuro size={30} /> {offre.salary} Eur par an
        </h3>
      </div>
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
