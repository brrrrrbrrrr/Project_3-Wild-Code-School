/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";
import "./DetailsOfferConsultant.css";

const DetailsOfferConsultant = (props) => {
  const { offer } = props;
  console.warn(offer);
  const urlFile = import.meta.env.VITE_APP_URL;
  return (
    <div className="detailsOfferConsultant-container">
      <h2 className="detailsOfferConsultant-title">
        Votre contact pour ce job
      </h2>
      <div className="detailsOfferConsultant-subtitle">
        {offer?.consultantPicture && (
          <img
            src={`${urlFile}/${offer.consultantPicture}`}
            alt="consultant"
            className="detailsOfferConsultant-picture"
          />
        )}

        <div className="detailsOfferConsultant-contact">
          <h2 className="detailsOfferConsultant-identity">
            {offer.consultantFirstname} {offer.consultantName}
          </h2>
          <h2 className="detailsOfferConsultant-city">
            Consultant recrutement IT à {offer.city_name}
          </h2>
        </div>
      </div>
    </div>
  );
};

DetailsOfferConsultant.propTypes = {
  offer: PropTypes.shape({
    consultantPicture: PropTypes.string,
    consultantFirstname: PropTypes.string,
    consultantName: PropTypes.string,
    city_name: PropTypes.string,
  }).isRequired,
};

export default DetailsOfferConsultant;
