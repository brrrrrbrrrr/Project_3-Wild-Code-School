/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */

import { Button } from "@mui/material";
import "./Offer.css";

const OfferEmploi = ({ offer }) => {
  return (
    <div className="superadmin-offer_container">
      <div className="superadmin-offer_logo">logo</div>

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
      </div>
    </div>
  );
};

export default OfferEmploi;
