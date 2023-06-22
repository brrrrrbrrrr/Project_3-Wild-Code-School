/* eslint-disable react/function-component-definition */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineStar } from "react-icons/hi";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { CgEuro } from "react-icons/cg";
import { SiReacthookform } from "react-icons/si";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";
import "./DetailsOfferBody.css";

const DetailsOfferBody = (props) => {
  const { offer, userId } = props;
  const urlFile = import.meta.env.VITE_APP_URL;

  const [like, setLike] = useState(offer.liked);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (offer?.candidateId === userId || offer?.consultantId === userId) {
      setSelected(true);
    }
  }, [offer, userId]);

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
        setSelected(!selected);
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

  const isConsultant = user?.user?.userType === "consultants";
  const isCandidate = user?.user?.userType === "candidates";
  return (
    <div className="detailsOfferBody-container">
      <div className="detailsOfferBody-left">
        <div className="detailsOfferBody-left_top  detailsOfferBody-textOne ">
          {offer?.Logo && (
            <img
              src={`${urlFile}/${offer.Logo}`}
              alt="Logo de l'entreprise"
              className="detailsOfferHero-logo"
            />
          )}

          <h3 className="detailsOfferBody-employee  detailsOfferBody-subtitle">
            <HiOutlineUserGroup size={30} className="detailsOfferBody-icon" />
            {offer.numberOfEmployees} employés
          </h3>
        </div>

        <div className="detailsOfferBody-left_bottom  detailsOfferBody-textOne">
          <h2 className="detailsOfferBody-poste">LE POSTE</h2>
          <h3 className="detailsOfferBody-jobTitle">{offer.job_title}</h3>
          <h3 className="detailsOfferBody-contrat detailsOfferBody-subtitle  ">
            <SiReacthookform className="detailsOfferBody-icon" />
            {offer.contrat_type}
            {offer.remote === 1 ? " -Télétravail complet" : ""}
          </h3>
          <h3 className="detailsOfferBody-salary detailsOfferBody-subtitle">
            <CgEuro size={30} /> {offer.salary} Eur par an
          </h3>
        </div>
      </div>

      <div className="detailsOfferBody-right">
        <div className="detailsOfferBody-right_top detailsOfferBody-text">
          <h2 className="detailsOfferBody-title">
            Présentation entreprise/ Info d'offre:
          </h2>
          <p className="detailsOfferBody-paragraph">
            {offer.jobOfferPresentation}
          </p>
        </div>
        <div className="detailsOfferBody-right_center detailsOfferBody-text">
          <h2 className="detailsOfferBody-title">
            Le profil que nous recherchons:
          </h2>
          <p className="detailsOfferBody-paragraph">{offer.desiredProfile}</p>
        </div>
        <div className="detailsOfferBody-right_bottom detailsOfferBody-text">
          <h2 className="detailsOfferBody-title">Le process de recrutement:</h2>
          <p className="detailsOfferBody-paragraph">
            {offer.recruitmentProcess}
          </p>
        </div>
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
      </div>
    </div>
  );
};

DetailsOfferBody.propTypes = {
  userId: PropTypes.number,
  offer: PropTypes.shape({
    id: PropTypes.number,
    Logo: PropTypes.string,
    candidateId: PropTypes.number,
    job_title: PropTypes.string,
    consultantId: PropTypes.number,
    liked: PropTypes.bool,
    contrat_type: PropTypes.string,
    remote: PropTypes.number,
    numberOfEmployees: PropTypes.string,
    salary: PropTypes.string,
    jobOfferPresentation: PropTypes.string,
    desiredProfile: PropTypes.string,
    recruitmentProcess: PropTypes.string,
  }),
};
DetailsOfferBody.defaultProps = {
  userId: null,
  offer: null,
};

export default DetailsOfferBody;
