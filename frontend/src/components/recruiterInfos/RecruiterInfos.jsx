import React from "react";
import "./RecruiterInfos.css";
import PropTypes from "prop-types";

const urlFile = import.meta.env.VITE_APP_URL;

function RecruiterInfos({ recruiter }) {
  return (
    <div className="recruiterinfos_container">
      <div className="recruiterinfos_column">
        <div className="recruiterinfos_img-container">
          <div className="recruiterinfos_img">
            {" "}
            <img
              className="recruiterinfos_picture"
              src={`${urlFile}${recruiter.picture}`}
              alt=""
            />
            <div className="rounded-bord" />
            <div className="rounded-bord2" />
          </div>
        </div>
        <div className="recruiterinfos_infos-container">
          <div className="recruiterinfos_infos-column">
            <div className="recruiterinfos_infos">
              <h2>{recruiter.name}</h2>
              <h2>{recruiter.firstname}</h2>
            </div>
            <div className="recruiterinfos_infos-city">
              <h2>Secteur : {recruiter.city}</h2>
            </div>
          </div>
          <div className="recruiterinfos_btn-container">
            <button type="button" className="recruiterinfos_btn">
              Offres
            </button>
            <button type="button" className="recruiterinfos_btn">
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
RecruiterInfos.propTypes = {
  recruiter: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecruiterInfos;
