/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";
import "./LikedOffer.css";

const LikedOffer = ({ offer }) => {
  return (
    <div className="likedoffer_container">
      <div className="likedoffer_info-main">
        <h3 className="likedoffer_title">{offer.job_title}</h3>
        <div className="likedoffer_city-remote">
          <h3 className="likedoffer_city">{offer.city_name}</h3>
          <h3 className="likedoffer_remote">{offer.remote_type}</h3>
        </div>
        <div className="likedoffer_contract-salary">
          <h3 className="likedoffer_contract">{offer.contrat_type}</h3>
          <h3 className="likedoffer_salary">{offer.salary} euro/an</h3>
        </div>
      </div>
      <div className="likedoffer_status">
        <h2 className="likedoffer_status-title">STATUT</h2>
        <h3 className="likedoffer_status-text"> {offer.offer_status_text}</h3>
      </div>
    </div>
  );
};
LikedOffer.propTypes = {
  offer: PropTypes.shape({
    job_title: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    contrat_type: PropTypes.string.isRequired,
    remote_type: PropTypes.string.isRequired,
    city_name: PropTypes.string.isRequired,
    offer_status_text: PropTypes.string.isRequired,
  }).isRequired,
};

export default LikedOffer;
