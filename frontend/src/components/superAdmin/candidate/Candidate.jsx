/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "@mui/material";
import useApi from "../../../services/useApi";
import "./Candidate.css";

import { useUser } from "../../../contexts/UserContext";

const Candidate = ({ candidate, refresh, setRefresh }) => {
  const [modal, setModal] = useState(false);
  const urlFile = import.meta.env.VITE_APP_URL;
  const { setCandidateWithLike } = useUser();
  const api = useApi();

  const handleDelete = () => {
    api
      .delete(`/candidates/admin/${candidate.id}`)
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
    setCandidateWithLike(candidate);
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
                {candidate.offer_statusId === 2 ? (
                  <span className="valid">validé</span>
                ) : (
                  <span className="invalid">pas validé</span>
                )}
              </h3>
              {candidate.offer_statusId === 2 ||
              candidate.offer_statusId === 1 ? (
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
            <Button
              id="superadmin-candidat_button-info"
              variant="contained"
              onClick={handleModal}
            >
              Supprimer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
Candidate.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.number,
    picture: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired,
    likeCount: PropTypes.number,
    offer_statusId: PropTypes.number,

    name: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  refresh: PropTypes.bool.isRequired,
  setRefresh: PropTypes.func.isRequired,
};
export default Candidate;
