/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";

const DetailsOfferConsultant = (props) => {
  const { offre } = props;

  return (
    <div>
      <h2>{offre.consultantPicture}</h2>
      <h2>Votre contact pour ce job </h2>
      <h3>
        {offre.consultantFirstname} {offre.consultantName}
      </h3>
      <h3>Consultant recrutement IT à {offre.cityName}</h3>
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
