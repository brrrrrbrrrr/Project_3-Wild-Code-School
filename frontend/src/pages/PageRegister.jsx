/* eslint-disable no-nested-ternary */
import "./PageRegister.css";
import React, { useState } from "react";
import RegisterDefault from "../components/register/RegisterDefault";
// import RegisterCandidate from "../components/register/RegisterCandidate";
import RegisterCompagny from "../components/register/RegisterCompagny";
import { useUser } from "../contexts/UserContext";

function PageRegister() {
  const { user, selectForm, setSelectForm } = useUser();
  const [isCompanyActive, setIsCompanyActive] = useState(false);
  const [isCandidateActive, setIsCandidateActive] = useState(false);
  const compagny = "compagny";
  const candidate = "candidates";

  const handleFormComp = () => {
    setSelectForm(compagny);
    setIsCompanyActive(true);
    setIsCandidateActive(false);
  };
  const handleFormCand = () => {
    setSelectForm(candidate);
    setIsCompanyActive(false);
    setIsCandidateActive(true);
  };

  return (
    <div>
      <div className="select-form-btn-container">
        <div className="select-form-btn-column">
          {selectForm !== "recruiters" && (
            <button
              className={`select-form-btn ${
                isCompanyActive ? "select-btn-active" : ""
              }`}
              type="button"
              onClick={handleFormComp}
            >
              Entreprise
            </button>
          )}
          {selectForm !== "recruiters" && (
            <button
              className={`select-form-btn ${
                isCandidateActive ? "select-btn-active" : ""
              }`}
              type="button"
              onClick={handleFormCand}
            >
              Candidat
            </button>
          )}
          {selectForm === "recruiters" && (
            <button type="button" className="select-form-btn select-btn-active">
              Recruteur
            </button>
          )}
        </div>
      </div>
      <div className="formFullContainer">
        {selectForm === "compagny" ? (
          <RegisterCompagny />
        ) : selectForm === "candidates" || selectForm === "recruiters" ? (
          <RegisterDefault selectForm={selectForm} user={user} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PageRegister;
