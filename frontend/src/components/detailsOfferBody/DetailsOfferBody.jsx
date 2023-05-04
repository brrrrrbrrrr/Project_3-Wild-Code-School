/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { CgEuro } from "react-icons/cg";
import { SiReacthookform } from "react-icons/si";
import "./DetailsOfferBody.css";

const DetailsOfferBody = (props) => {
  const { offre } = props;

  return (
    <div className="detailsOfferBody-container">
      <div className="detailsOfferBody-left">
        <div className="detailsOfferBody-left_top  detailsOfferBody-textOne ">
          <h2 className="detailsOfferBody-logo"> Logo </h2>
          <h3 className="detailsOfferBody-desiredProfile">
            {offre.desiredProfile}
          </h3>
          <h3 className="detailsOfferBody-employee">
            <HiOutlineUserGroup /> {offre.numberOfEmployees} employés
          </h3>
        </div>

        <div className="detailsOfferBody-left_bottom  detailsOfferBody-textOne">
          <h2 className="detailsOfferBody-poste">LE POSTE</h2>
          <h3 className="detailsOfferBody-jobTitle">{offre.jobTitleDetails}</h3>
          <h3 className="detailsOfferBody-contrat">
            <SiReacthookform />
            {offre.contratType}
            {offre.remoteWork === 1 ? "- Télétravail complet" : ""}
          </h3>
          <h3 className="detailsOfferBody-salary">
            <CgEuro /> {offre.salary} Eur par an
          </h3>
        </div>
      </div>

      <div className="detailsOfferBody-right">
        <div className="detailsOfferBody-right_top detailsOfferBody-text">
          <h2 className="detailsOfferBody-title">
            Présentation entreprise/ Info d'offre:
          </h2>
          <p>{offre.jobOfferPresentation}</p>
        </div>
        <div className="detailsOfferBody-right_center detailsOfferBody-text">
          <h2 className="detailsOfferBody-title">
            Le profil que nous recherchons:
          </h2>
          <p>{offre.desiredProfile}</p>
        </div>
        <div className="detailsOfferBody-right_bottom detailsOfferBody-text">
          <h2 className="detailsOfferBody-title">Le process de recrutement:</h2>
          <p>{offre.recruitmentProcess}</p>
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
