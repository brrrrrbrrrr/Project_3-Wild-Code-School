/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import useApi from "../../../services/useApi";
import "./Consultant.css";

const Consultant = ({ consultant, refresh, setRefresh }) => {
  const urlFile = import.meta.env.VITE_APP_URL;
  const api = useApi();

  return (
    <div className="superadmin-consultant_container">
      <img
        src={`${urlFile}${consultant.picture}`}
        className="superadmin-consultant_image"
        alt="consultant"
      />

      <div className="superadmin-consultant_info">
        <h3 className="superadmin-consultant_name">
          {consultant.name} {consultant.firstname}
        </h3>
        <h3 className="superadmin-consultant_city">{consultant.city}</h3>
      </div>
      <div className="superadmin-consultant_buttons-box">
        <Button
          id="superadmin-consultant_button-info"
          variant="contained"
          onClick={() => {
            api.delete(`/consultants/admin/${consultant.id}`).then(() => {
              setRefresh(!refresh);
            });
          }}
        >
          Supprimer
        </Button>
      </div>
    </div>
  );
};
Consultant.propTypes = {
  consultant: PropTypes.shape({
    id: PropTypes.number,
    picture: PropTypes.string,
    name: PropTypes.string,
    firstname: PropTypes.string,
    city: PropTypes.string,
  }),
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
};
Consultant.defaultProps = {
  consultant: null,
  refresh: null,
  setRefresh: null,
};
export default Consultant;
