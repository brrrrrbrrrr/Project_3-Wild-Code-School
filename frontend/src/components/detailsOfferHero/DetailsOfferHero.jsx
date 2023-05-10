/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";
import { FiMapPin } from "react-icons/fi";
import { CgEuro } from "react-icons/cg";
import { SiReacthookform } from "react-icons/si";
import "./DetailsOfferHero.css";
import Logo from "../../assets/logo.png";
import Bgemployees from "../../assets/bg_employeesbis.jpg";

const DetailsOfferHero = (props) => {
  const { offre } = props;

  return (
    <div className="detailsOfferHero-container">
      <div
        className="detailsOfferHero-image"
        style={{ backgroundImage: `url(${Bgemployees})` }}
      >
        <img
          src={Logo}
          alt="Logo de l'entreprise"
          className="detailsOfferHero-logo"
        />

        <h2 className="detailsOfferHero-title">{offre.jobTitleDetails}</h2>
        <div className="detailsOfferHero-subtitles">
          <h3 className="detailsOfferHero-city detailsOfferHero-subtitle_title">
            <FiMapPin className="detailsOfferHero-icon" /> {offre.cityName} -{" "}
            {offre.cityPostalCode}
          </h3>
          <h3 className="detailsOfferHero-contrat detailsOfferHero-subtitle_title">
            <SiReacthookform className="detailsOfferHero-icon" />
            {offre.contratType}
            {offre.remoteWork === 1 ? " -Télétravail complet" : ""}
          </h3>
          <h3 className="detailsOfferHero-salary detailsOfferHero-subtitle_title">
            <CgEuro size={30} className="detailsOfferHero-icon" />
            {offre.salary} Eur par an
          </h3>
        </div>
      </div>
    </div>
  );
};

DetailsOfferHero.propTypes = {
  offre: PropTypes.shape({
    Logo: PropTypes.string.isRequired,
    jobTitleDetails: PropTypes.string.isRequired,
    cityName: PropTypes.string.isRequired,
    cityPostalCode: PropTypes.string.isRequired,
    recruiterPostalCode: PropTypes.string.isRequired,
    contratType: PropTypes.string.isRequired,
    remoteWork: PropTypes.number.isRequired,
    salary: PropTypes.number.isRequired,
  }).isRequired,
};

export default DetailsOfferHero;
