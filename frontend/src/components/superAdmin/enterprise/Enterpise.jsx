/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import useApi from "../../../services/useApi";
import "./Enterprise.css";

const Enterprise = ({ enterprise, refresh, setRefresh }) => {
  const urlFile = import.meta.env.VITE_APP_URL;
  const api = useApi();
  const handleValid = () => {
    api
      .put(`/compagny/valid`, {
        compagnyId: enterprise.id,
      })
      .then(() => {
        setRefresh(!refresh);
      });
  };
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
        <Button
          id="superadmin-enterprise_button-info"
          variant="contained"
          onClick={() => {
            api.delete(`/compagny/admin/${enterprise.id}`).then(() => {
              setRefresh(!refresh);
            });
          }}
        >
          Supprimer
        </Button>
        {enterprise.Valide === 0 ? (
          <Button
            id="superadmin-enterprise_button-info"
            variant="contained"
            onClick={handleValid}
          >
            Valider
          </Button>
        ) : null}
      </div>
    </div>
  );
};
Enterprise.propTypes = {
  enterprise: PropTypes.shape({
    id: PropTypes.number,
    siretNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    Logo: PropTypes.string.isRequired,
    Valide: PropTypes.number.isRequired,
  }).isRequired,
  refresh: PropTypes.bool.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default Enterprise;
