/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import { Button } from "@mui/material";
import "./Candidate.css";

const Candidate = ({ candidate }) => {
  const urlFile = import.meta.env.VITE_APP_URL;

  return (
    <div className="superadmin-candidat_container">
      <img
        src={`${urlFile}${candidate.picture}`}
        className="superadmin-candidat_image"
        alt="candidate"
      />

      <div className="superadmin-candidat_info">
        <h3 className="superadmin-candidat_name">
          {candidate.name} {candidate.firstname}
        </h3>
        <h3 className="superadmin-candidat_city">{candidate.city}</h3>
      </div>
      <div className="superadmin-candidat_buttons-box">
        <Button id="superadmin-candidat_button-info" variant="contained">
          Suivi
        </Button>
        <Button id="superadmin-candidat_button-info" variant="contained">
          Offre ()
        </Button>
        <Button id="superadmin-candidat_button-info" variant="contained">
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default Candidate;
