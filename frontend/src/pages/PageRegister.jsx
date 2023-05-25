/* eslint-disable no-nested-ternary */
import "./PageRegister.css";
import React, { useState } from "react";
import RegisterCandidate from "../components/register/RegisterCandidate";
import RegisterCompagny from "../components/register/RegisterCompagny";

function PageRegister() {
  const [selectForm, setSelectForm] = useState("");
  const [isCompanyActive, setIsCompanyActive] = useState(false);
  const [isCandidateActive, setIsCandidateActive] = useState(false);
  const handleFormComp = () => {
    setSelectForm("Compagny");
    setIsCompanyActive(true);
    setIsCandidateActive(false);
  };
  const handleFormCand = () => {
    setSelectForm("Candidate");
    setIsCompanyActive(false);
    setIsCandidateActive(true);
  };

  return (
    <div>
      <div className="select-form-btn-container">
        <div className="select-form-btn-column">
          <button
            className={`select-form-btn ${
              isCompanyActive ? "select-btn-active" : ""
            }`}
            type="button"
            onClick={handleFormComp}
          >
            Entreprise
          </button>
          <button
            className={`select-form-btn ${
              isCandidateActive ? "select-btn-active" : ""
            }`}
            type="button"
            onClick={handleFormCand}
          >
            Candidat
          </button>
        </div>
      </div>
      <div className="formFullContainer">
        {selectForm === "Compagny" ? (
          <RegisterCompagny />
        ) : selectForm === "Candidate" ? (
          <RegisterCandidate />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PageRegister;
