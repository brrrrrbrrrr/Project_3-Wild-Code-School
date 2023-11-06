import React from "react";
import { Link } from "react-router-dom";
import MyRecruiters from "../components/myRecruiters/MyRecruiters";
import InfosCompany from "../components/infosCompany/InfosCompany";
import "./PageMyRecruiters.css";
import { useUser } from "../contexts/UserContext";
import NotFound from "../components/notfound/NotFound";

function PageMyRecruiters() {
  const { user, setSelectForm } = useUser();
  const userType = "recruiters";
  const handleClick = () => {
    setSelectForm(userType);
  };

  return user ? (
    <div className="PageMyRecruiters-container">
      <InfosCompany />
      <div className="PageMyRecruiters-btn_container">
        <Link to="/registration">
          <button
            className="PageMyRecruiters-btn"
            type="button"
            onClick={handleClick}
          >
            Ajouter un recruteur
          </button>
        </Link>
      </div>
      <MyRecruiters />
    </div>
  ) : (
    <NotFound />
  );
}

export default PageMyRecruiters;
