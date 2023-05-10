/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import { useState } from "react";
import { HiOutlineStar } from "react-icons/hi";
import { Button } from "@mui/material";
import { useUser } from "../../../contexts/UserContext";
import useApi from "../../../services/useApi";

const OfferEmploi = ({ offer, userId }) => {
  const [selected, setSelected] = useState(offer.candidateId === userId);
  const user = useUser();
  const api = useApi();

  const handleIconClick = () => {
    setSelected(!selected);
    api
      .post(`offers/${offer.id}/like`, { candidateId: user.user.id })

      .then((response) => {
        setSelected(!selected);
        console.warn(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="offersemploi-offer_container">
      <div className="offersemploi-offer_logo">logo</div>
      <div className="offersemploi-offer_info">
        <div className="offersemploi-offer_info-main">
          <h3 className="offersemploi-offer_title">{offer.job_title}</h3>
          <h3 className="offersemploi-offer_salary">{offer.salary} euro/an</h3>
        </div>
        <div className="offersemploi-offer_info-contract">
          <h3 className="offersemploi-offer_type-contract">
            {offer.contract_type}
          </h3>
          <h3 className="offersemploi-offer_remote">{offer.remote_type}</h3>
          <h3 className="offersemploi-offer_city">{offer.city_name}</h3>
          <div>
            {user.user === null ? (
              ""
            ) : (
              <HiOutlineStar
                className={
                  selected
                    ? "offersemploi-icon_star-selected"
                    : "offersemploi-icon_star"
                }
                onClick={handleIconClick}
                size={50}
              />
            )}
          </div>
        </div>
      </div>
      <Button id="offersemploi-offer_button-info" variant="contained">
        Plus d'infos
      </Button>
    </div>
  );
};

export default OfferEmploi;
