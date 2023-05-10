/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";
import "./DetailsOfferConsultant.css";
import PictureConsultant from "../../assets/picture-consultantbis.jpg";

const DetailsOfferConsultant = (props) => {
  const { offre } = props;

  return (
    <div className="detailsOfferConsultant-container">
      <h2 className="detailsOfferConsultant-title">
        Votre contact pour ce job
      </h2>
      <div className="detailsOfferConsultant-subtitle">
        <img
          src={PictureConsultant}
          alt="consultant"
          className="detailsOfferConsultant-picture"
        />
        <div className="detailsOfferConsultant-contact">
          <h2 className="detailsOfferConsultant-identity">
            {offre.consultantFirstname} {offre.consultantName}
          </h2>
          <h2 className="detailsOfferConsultant-city">
            Consultant recrutement IT à {offre.cityName}
          </h2>
        </div>
      </div>
    </div>
  );
};

DetailsOfferConsultant.propTypes = {
  offre: PropTypes.shape({
    consultantPicture: PropTypes.string,
    consultantFirstname: PropTypes.string,
    consultantName: PropTypes.string,
    cityName: PropTypes.string,
  }).isRequired,
};

export default DetailsOfferConsultant;
