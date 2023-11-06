/* eslint-disable no-nested-ternary */
import "./PageRegister.css";
import React, { useState } from "react";
import RegisterDefault from "../components/register/RegisterDefault";
import RegisterCompagny from "../components/register/RegisterCompagny";
import { useUser } from "../contexts/UserContext";

function PageRegister() {
  const { user, selectForm, setSelectForm } = useUser();
  const [isCompanyActive, setIsCompanyActive] = useState(false);
  const [isCandidateActive, setIsCandidateActive] = useState(false);
  const [isConsultantActive, setIsConsultantActive] = useState(false);
  const compagny = "compagny";
  const candidate = "candidates";
  const consultant = "consultants";

  const handleFormComp = () => {
    setSelectForm(compagny);
    setIsCompanyActive(true);
    setIsCandidateActive(false);
    setIsConsultantActive(false);
  };
  const handleFormCand = () => {
    setSelectForm(candidate);
    setIsCompanyActive(false);
    setIsCandidateActive(true);
    setIsConsultantActive(false);
  };

  const handleFormCons = () => {
    setSelectForm(consultant);
    setIsConsultantActive(true);
    setIsCandidateActive(false);
    setIsCompanyActive(false);
  };
  return (
    <div>
      <div className="select-form-btn-container">
        <div className="select-form-btn-column">
          {!user && selectForm !== "recruiters" && (
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
              Candidat.e
            </button>
          )}
          {!user && (
            <button
              className={`select-form-btn ${
                isConsultantActive ? "select-btn-active" : ""
              }`}
              type="button"
              onClick={handleFormCons}
            >
              Consultant.e
            </button>
          )}
          {selectForm === "recruiters" && (
            <button type="button" className="select-form-btn select-btn-active">
              Recruteur.euse
            </button>
          )}
        </div>
      </div>
      <div className="formFullContainer">
        {selectForm === "compagny" ? (
          <RegisterCompagny />
        ) : selectForm === candidate ||
          selectForm === "recruiters" ||
          selectForm === consultant ? (
          <RegisterDefault selectForm={selectForm} user={user} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PageRegister;
