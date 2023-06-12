/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import "./Candidate.css";

import { useUser } from "../../../contexts/UserContext";

const Candidate = ({ candidate }) => {
  const urlFile = import.meta.env.VITE_APP_URL;
  const { setCandidateWithLike } = useUser();

  const handleClick = () => {
    setCandidateWithLike(candidate);
  };

  return (
    <div className="superadmin-candidat_container">
      <img
        src={`${urlFile}${candidate.picture}`}
        className="superadmin-candidat_image"
        alt="candidate"
      />
      <a
        href={`${urlFile}/${candidate.resume}`}
        target="_blank"
        rel="noreferrer"
        className="resume-download"
      >
        (CV)
      </a>

      <div className="superadmin-candidat_info">
        <h3 className="superadmin-candidat_name">
          {candidate.name} {candidate.firstname}
        </h3>
        <h3 className="superadmin-candidat_city">{candidate.city}</h3>
      </div>
      <div className="superadmin-candidat_buttons-box">
        {candidate?.likeCount ? (
          <>
            <h3 className="valid-invalid_like">
              Like{" "}
              {candidate.valide === 1 ? (
                <span className="valid">validé</span>
              ) : (
                <span className="invalid">pas validé</span>
              )}
            </h3>
            {candidate.valide === 0 || candidate.valide === 1 ? (
              <Link to="/valid-offer-candidate">
                <Button
                  id="superadmin-candidat_button-info"
                  variant="contained"
                  onClick={handleClick}
                >
                  {" "}
                  Offre ({candidate.likeCount})
                </Button>
              </Link>
            ) : null}
          </>
        ) : (
          <>
            <Button id="superadmin-candidat_button-info" variant="contained">
              Suivi
            </Button>
            <Button id="superadmin-candidat_button-info" variant="contained">
              Offre
            </Button>
            <Button id="superadmin-candidat_button-info" variant="contained">
              Modifier
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
Candidate.propTypes = {
  candidate: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired,
    likeCount: PropTypes.number,
    valide: PropTypes.number,

    name: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
};
export default Candidate;
