import { useState } from "react";
import { HiOutlineStar } from "react-icons/hi";
import { AiTwotoneEdit, AiFillCheckCircle } from "react-icons/ai";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import useApi from "../../../services/useApi";

function OfferEmploi({ offer, userId, candidateId, validStatus }) {
  const [selected, setSelected] = useState(
    offer.candidateId === userId || offer.consultantId === userId
  );
  const [like, setLike] = useState(offer.liked);

  const user = useUser();
  const api = useApi();
  const urlFile = import.meta.env.VITE_APP_URL;
  const {
    setOfferData,

    setValidationStatus,
  } = useUser();

  const handleEditClick = () => {
    setOfferData(offer);
  };

  const handleIconClick = () => {
    api
      .post(`offers/${offer.id}/like`, {
        candidateId: user.user.id,
        liked: !like,
      })
      .then(() => {
        setSelected(!selected);
        setLike(!like);
      })
      .catch(() => {
        toast.error("Une erreur s'est produite", {
          position: "top-left",
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
    toast.info("Veuillez vous connecter", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleValid = () => {
    const updateValue = {
      offerStatusId: 2,
    };
    api
      .put(
        `/admin/offer-status/1/candidate/${candidateId}/offer/${offer.id}`,
        updateValue
      )
      .then(() => {
        setValidationStatus((prevStatus) => prevStatus + 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const isConsultant = user?.user?.userType === "consultants";
  const isCandidate = user?.user?.userType === "candidates";
  const isRecruiter = user?.user?.userType === "recruiters";

  return (
    <div className="offersemploi-offer_container">
      <img
        src={`${urlFile}/${offer.Logo}`}
        className="offersemploi-offer_logo"
        alt=""
      />
      <div className="offersemploi-offer_info">
        <div>
          <div className="offersemploi-offer_info-main">
            <h3 className="offersemploi-offer_title">{offer.job_title}</h3>
            <h3 className="offersemploi-offer_salary">
              {offer.salary} euro/an
            </h3>
          </div>
          <div className="offersemploi-offer_info-contract">
            <h3 className="offersemploi-offer_type-contract">
              {offer.contract_type}
            </h3>
            <h3 className="offersemploi-offer_remote">{offer.remote_type}</h3>
            <h3 className="offersemploi-offer_city">{offer.city_name}</h3>
            {isRecruiter && offer.recruiterId === user?.user?.id && (
              <Link to="/update-offer">
                <AiTwotoneEdit
                  size={30}
                  className="offersemploi-con_edit"
                  onClick={handleEditClick}
                />
              </Link>
            )}
          </div>
        </div>
        <div className="offersemploi-icon_box">
          <div>
            {(isConsultant && selected) || (isCandidate && selected) ? (
              <NavLink to="/messages" state={offer}>
                <BsFillChatRightTextFill
                  className="offersemploi-icon_chat"
                  size={50}
                />
              </NavLink>
            ) : null}
          </div>
          <div>
            {isCandidate ? (
              <HiOutlineStar
                className={
                  selected
                    ? "offersemploi-icon_star-selected"
                    : "offersemploi-icon_star"
                }
                onClick={handleIconClick}
                size={50}
              />
            ) : (
              ""
            )}

            {validStatus === 1 && (
              <div className="valid-icon_container">
                {" "}
                <h2>Valider ce like </h2>
                <AiFillCheckCircle
                  onClick={handleValid}
                  size={40}
                  className="valid-icon"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {user?.user ? (
        <Link to={`/offers/${offer.id}`}>
          <Button id="offersemploi-offer_button-info" variant="contained">
            Plus d'infos
          </Button>
        </Link>
      ) : (
        <Link to="/connect">
          <Button
            id="offersemploi-offer_button-info"
            variant="contained"
            onClick={handleClick}
          >
            Plus d'infos
          </Button>
        </Link>
      )}
    </div>
  );
}

OfferEmploi.propTypes = {
  userId: PropTypes.number,
  candidateId: PropTypes.number,
  validStatus: PropTypes.number,
  offer: PropTypes.shape({
    id: PropTypes.number,
    candidateId: PropTypes.number,
    job_title: PropTypes.string,
    salary: PropTypes.string,
    contract_type: PropTypes.string,
    city_name: PropTypes.string,
    remote_type: PropTypes.string,
    numberOfEmployees: PropTypes.string,
    consultantId: PropTypes.number,
    liked: PropTypes.number,
    Logo: PropTypes.string,
    recruiterId: PropTypes.number,
  }),
};

OfferEmploi.defaultProps = {
  userId: null,
  candidateId: null,
  validStatus: null,
  offer: null,
};

export default OfferEmploi;
