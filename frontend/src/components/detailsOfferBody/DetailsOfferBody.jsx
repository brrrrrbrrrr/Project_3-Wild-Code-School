/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { CgEuro } from "react-icons/cg";
import { SiReacthookform } from "react-icons/si";
import "./DetailsOfferBody.css";
import Logo from "../../assets/logo.png";

const DetailsOfferBody = (props) => {
  const { offre } = props;

  return (
    <div className="detailsOfferBody-container">
      <div className="detailsOfferBody-left">
        <div className="detailsOfferBody-left_top  detailsOfferBody-textOne ">
          <img
            src={Logo}
            alt="Logo de l'entreprise"
            className="detailsOfferBody-logo"
          />
          <h3 className="detailsOfferBody-employee  detailsOfferBody-subtitle">
            <HiOutlineUserGroup size={30} className="detailsOfferBody-icon" />
            {offre.numberOfEmployees} employés
          </h3>
        </div>

        <div className="detailsOfferBody-left_bottom  detailsOfferBody-textOne">
          <h2 className="detailsOfferBody-poste">LE POSTE</h2>
          <h3 className="detailsOfferBody-jobTitle">{offre.jobTitleDetails}</h3>
          <h3 className="detailsOfferBody-contrat detailsOfferBody-subtitle  ">
            <SiReacthookform className="detailsOfferBody-icon" />
            {offre.contratType}
            {offre.remoteWork === 1 ? " -Télétravail complet" : ""}
          </h3>
          <h3 className="detailsOfferBody-salary detailsOfferBody-subtitle">
            <CgEuro size={30} /> {offre.salary} Eur par an
          </h3>
        </div>
      </div>

      <div className="detailsOfferBody-right">
        <div className="detailsOfferBody-right_top detailsOfferBody-text">
          <h2 className="detailsOfferBody-title">
            Présentation entreprise/ Info d'offre:
          </h2>
          <p className="detailsOfferBody-paragraph">
            {offre.jobOfferPresentation}
          </p>
        </div>
        <div className="detailsOfferBody-right_center detailsOfferBody-text">
          <h2 className="detailsOfferBody-title">
            Le profil que nous recherchons:
          </h2>
          <p className="detailsOfferBody-paragraph">{offre.desiredProfile}</p>
        </div>
        <div className="detailsOfferBody-right_bottom detailsOfferBody-text">
          <h2 className="detailsOfferBody-title">Le process de recrutement:</h2>
          <p className="detailsOfferBody-paragraph">
            {offre.recruitmentProcess}
          </p>
        </div>

        <button type="button" className="detailsOfferBody-button_candidate">
          Je postule
        </button>
      </div>
    </div>
  );
};

DetailsOfferBody.propTypes = {
  offre: PropTypes.shape({
    Logo: PropTypes.string.isRequired,
    jobTitleDetails: PropTypes.string.isRequired,
    contratType: PropTypes.string.isRequired,
    remoteWork: PropTypes.number.isRequired,
    numberOfEmployees: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    jobOfferPresentation: PropTypes.string.isRequired,
    desiredProfile: PropTypes.string.isRequired,
    recruitmentProcess: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailsOfferBody;
