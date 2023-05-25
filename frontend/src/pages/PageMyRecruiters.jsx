import React from "react";
import { Link } from "react-router-dom";
import MyRecruiters from "../components/myRecruiters/MyRecruiters";
import InfosCompany from "../components/infosCompany/InfosCompany";
import "./PageMyRecruiters.css";
import { useUser } from "../contexts/UserContext";
import NotFound from "../components/notfound/NotFound";

function PageMyRecruiters() {
  const { user } = useUser();
  return user ? (
    <div className="PageMyRecruiters-container">
      <InfosCompany />
      <div className="PageMyRecruiters-btn_container">
        <Link to="/add-recruiter">
          <button className="PageMyRecruiters-btn" type="button">
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
