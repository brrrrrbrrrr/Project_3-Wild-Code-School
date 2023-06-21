import React, { useState } from "react";
import "./RecruiterInfos.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../../services/useApi";
import { useUser } from "../../contexts/UserContext";
import "../accountSettings/AccountSettings.css";

const urlFile = import.meta.env.VITE_APP_URL;
const api = useApi();

function RecruiterInfos({ recruiter, refresh, setRefresh }) {
  const { setUserParam, user } = useUser();
  const [modal, setModal] = useState(false);

  const handleDelete = () => {
    api
      .delete(`/recruiters/admin/${recruiter.id}`)
      .then(() => {
        setRefresh(!refresh);
      })
      .catch(() => {
        toast.error("Une erreur s'est produite", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const handleClick = () => {
    setUserParam(recruiter);
  };

  const handleModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div>
      <div>
        {" "}
        {modal ? (
          <div className="delete-modal_container">
            <div className="delete-modal_column">
              <h2 className="delete-modal_h2">
                Voulez vous vraiment supprimer ce compte ?
              </h2>
              <button
                className="delete-modal_btn btn-yes"
                type="button"
                onClick={handleDelete}
              >
                Oui
              </button>
              <button
                className="delete-modal_btn btn-no"
                type="button"
                onClick={handleCloseModal}
              >
                Non
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="recruiterinfos_container">
        <div className="recruiterinfos_column">
          <div className="recruiterinfos_phone">
            <h3>{recruiter.phone}</h3>
          </div>
          <div className="recruiterinfos_img-container">
            <div className="recruiterinfos_img">
              {" "}
              {recruiter && (
                <img
                  className="recruiterinfos_picture"
                  src={`${urlFile}${recruiter.picture}`}
                  alt=""
                />
              )}
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
              {user?.superAdmin === 1 && (
                <button
                  type="button"
                  className="recruiterinfos_btn"
                  onClick={handleModal}
                  // onClick={() => {
                  //   api.delete(`/recruiters/admin/${recruiter.id}`).then(() => {
                  //     setRefresh(!refresh);
                  //   });
                  // }}
                >
                  Supprimer
                </button>
              )}

              <Link to="/my-account">
                <button
                  type="button"
                  className="recruiterinfos_btn"
                  onClick={() => handleClick()}
                >
                  Modifier
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
RecruiterInfos.propTypes = {
  recruiter: PropTypes.shape({
    id: PropTypes.number,
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  refresh: PropTypes.bool.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default RecruiterInfos;
