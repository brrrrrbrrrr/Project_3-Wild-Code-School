/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import { Button } from "@mui/material";
import "./Consultant.css";

const Consultant = ({ consultant }) => {
  const urlFile = import.meta.env.VITE_APP_URL;

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
        <Button id="superadmin-consultant_button-info" variant="contained">
          Candidats ()
        </Button>
        <Button id="superadmin-consultant_button-info" variant="contained">
          Offre ()
        </Button>
        <Button id="superadmin-consultant_button-info" variant="contained">
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default Consultant;
