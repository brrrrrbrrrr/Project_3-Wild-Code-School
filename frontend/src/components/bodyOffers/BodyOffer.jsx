/* eslint-disable react/function-component-definition */
import { useState } from "react";
import PropTypes from "prop-types";
import { HiOutlineStar } from "react-icons/hi";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { NavLink, Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";

import "./BodyOffers.css";

const BodyOffer = ({ offer, userId }) => {
  const [selected, setSelected] = useState(
    offer.candidateId === userId || offer.consultantId === userId
  );
  const [like, setLike] = useState(offer.liked);

  const user = useUser();
  const api = useApi();

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

  const isConsultant = user?.user?.userType === "consultants";
  const isCandidate = user?.user?.userType === "candidates";

  return (
    <div className="bodyoffers-offer_container" key={offer.id}>
      <h3 className="bodyoffers-offer_title">{offer.job_title}</h3>
      <h3 className="bodyoffers-offer_city">{offer.city_name}</h3>
      <h3 className="bodyoffers-offer_salary">{offer.salary} euro/an</h3>
      <div className="bodyoffers-icon_box">
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
        </div>
      </div>

      {user?.user ? (
        <Link to={`/offers/${offer.id}`}>
          <button type="button" className="bodyoffers-offer_button-info">
            Plus d'infos
          </button>
        </Link>
      ) : (
        <Link to="/connect" oncClick={handleClick} onClick={handleClick}>
          <button type="button" className="bodyoffers-offer_button-info">
            Plus d'infos
          </button>
        </Link>
      )}
    </div>
  );
};

BodyOffer.propTypes = {
  userId: PropTypes.number,
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

BodyOffer.defaultProps = {
  userId: null,
  offer: null,
};

export default BodyOffer;
