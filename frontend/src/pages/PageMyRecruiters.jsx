import React from "react";
import { Link } from "react-router-dom";
import MyRecruiters from "../components/myRecruiters/MyRecruiters";
import InfosCompany from "../components/infosCompany/InfosCompany";

function PageMyRecruiters() {
  return (
    <div>
      <InfosCompany />
      <Link to="/add-recruiter">
        <button type="button">Ajouter un recruteur</button>
      </Link>
      <MyRecruiters />
    </div>
  );
}

export default PageMyRecruiters;
