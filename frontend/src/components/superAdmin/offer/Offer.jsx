/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import useApi from "../../../services/useApi";
import "./Offer.css";

const Offer = ({ offer, refresh, setRefresh }) => {
  const urlFile = import.meta.env.VITE_APP_URL;
  const api = useApi();
  const handleValid = () => {
    api
      .put(`/offers/valid`, {
        offerId: offer.id,
      })
      .then(() => {
        setRefresh(!refresh);
      });
  };

  return (
    <div className="superadmin-offer_container">
      <div className="superadmin-offer_logo">
        <img
          src={`${urlFile}${offer.Logo}`}
          alt="logo"
          className="offersemploi-offer_logo"
        />
      </div>

      <div className="superadmin-offer_info-main">
        <h3 className="superadmin-offer_title">{offer.job_title}</h3>
        <h3 className="superadmin-offer_salary">{offer.salary} euro/an</h3>
      </div>
      <div className="superadmin-offer_info-contract">
        <h3 className="superadmin-offer_type-contract">
          {offer.contract_type}
        </h3>
        <h3 className="superadmin-offer_remote">{offer.remote_type}</h3>
        <h3 className="superadmin-offer_city">{offer.city_name}</h3>
      </div>

      <div className="superadmin-offer_buttons-box">
        <Button id="superadmin-offer_button-info" variant="contained">
          Candidats ()
        </Button>
        <Button id="superadmin-offer_button-info" variant="contained">
          Modifier
        </Button>
        {offer.valid === 0 ? (
          <Button
            id="superadmin-offer_button-info"
            variant="contained"
            onClick={handleValid}
          >
            Valider
          </Button>
        ) : null}
        <ToastContainer />
      </div>
    </div>
  );
};

Offer.propTypes = {
  offer: PropTypes.shape({
    Logo: PropTypes.string,
    id: PropTypes.number,
    salary: PropTypes.string.isRequired,
    job_title: PropTypes.string.isRequired,
    contract_type: PropTypes.string.isRequired,
    remote_type: PropTypes.string.isRequired,
    city_name: PropTypes.string.isRequired,
    valid: PropTypes.number.isRequired,
  }).isRequired,
  refresh: PropTypes.bool.isRequired,
  setRefresh: PropTypes.func.isRequired,
};
export default Offer;
