/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import "./Enterprise.css";

const Enterprise = ({ enterprise }) => {
  const urlFile = import.meta.env.VITE_APP_URL;
  return (
    <div className="superadmin-enterprise_container">
      <img
        src={`${urlFile}/${enterprise.Logo}`}
        className="superadmin-enterprise_logo"
        alt=""
      />
      <div className="superadmin-enterprise_info-main">
        <h3 className="superadmin-enterprise_name">{enterprise.name}</h3>
        <h3 className="superadmin-enterprise_siret">
          {enterprise.siretNumber}
        </h3>
      </div>

      <div className="superadmin-enterprise_buttons-box">
        <Button id="superadmin-enterprise_button-info" variant="contained">
          Candidats ()
        </Button>
        <Button id="superadmin-enterprise_button-info" variant="contained">
          Modifier
        </Button>
        <Button id="superadmin-enterprise_button-info" variant="contained">
          Modifier
        </Button>
      </div>
    </div>
  );
};
Enterprise.propTypes = {
  enterprise: PropTypes.shape({
    siretNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    Logo: PropTypes.string.isRequired,
  }).isRequired,
};

export default Enterprise;
