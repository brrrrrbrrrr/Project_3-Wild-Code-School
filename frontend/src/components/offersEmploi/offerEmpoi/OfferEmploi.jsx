import { useState } from "react";
import { HiOutlineStar } from "react-icons/hi";
import { AiTwotoneEdit, AiFillCheckCircle } from "react-icons/ai";
import { BsFillChatRightTextFill } from "react-icons/bs";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";

import { Button } from "@mui/material";
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
      .catch((error) => {
        console.error(error);
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
  const isRecrutor = user?.user?.userType === "recruiters";

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
            {isRecrutor && (
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

      <Link to={`/offers/${offer.id}`}>
        <Button id="offersemploi-offer_button-info" variant="contained">
          Plus d'infos
        </Button>
      </Link>
    </div>
  );
}

OfferEmploi.propTypes = {
  userId: PropTypes.number,
  candidateId: PropTypes.number,
  validStatus: PropTypes.number,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    candidateId: PropTypes.number,
    job_title: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    contract_type: PropTypes.string.isRequired,
    city_name: PropTypes.string.isRequired,
    remote_type: PropTypes.string.isRequired,
    numberOfEmployees: PropTypes.string.isRequired,
    consultantId: PropTypes.number.isRequired,
    liked: PropTypes.bool,
    Logo: PropTypes.string.isRequired,
    recruiterId: PropTypes.number.isRequired,
  }).isRequired,
};

OfferEmploi.defaultProps = {
  userId: null,
  candidateId: null,
  validStatus: null,
};

export default OfferEmploi;
