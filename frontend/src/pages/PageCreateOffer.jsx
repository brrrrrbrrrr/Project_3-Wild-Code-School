import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../services/useApi";
import { useUser } from "../contexts/UserContext";
import Success from "../components/success/Success";
import "./PageCreateOffer.css";

function PageCreateOffer() {
  const navigate = useNavigate();
  const api = useApi();
  const { user } = useUser();
  const [jobTitleOptions, setJobTitleOptions] = useState([]);
  const [jobTitle, setJobTitle] = useState();
  const [cityOptions, setCityOptions] = useState([]);
  const [city, setCity] = useState();
  const [contractOption, setContractOption] = useState([]);
  const [contract, setContract] = useState();
  const [remoteOption, setRemoteOption] = useState([]);
  const [remote, setRemote] = useState();
  const [teamPicture, setTeamPicture] = useState("");
  const [valideTeamPictureType, setValidPictureType] = useState(false);
  const [jobTitleDetails, setJobTitleDetails] = useState();

  const [jobOfferPresentation, setJobOfferPresentation] = useState();
  const [desiredProfile, setDesiredProfile] = useState();
  const [recruitmentProcess, setRecruitmentProcess] = useState();
  const [salary, setSalary] = useState();
  const [validSalary, setValidSalary] = useState();
  const [numberOfEmployees, setNumberOfEmployees] = useState();
  const [validNbOfEmployees, setValidNbOfEmployees] = useState(false);
  const [success, setSuccess] = useState();
  const sucessOffer = "successOffer";
  const consultantId = "7";
  const userId = user?.id;

  const numberRegex = /^\d+$/;

  useEffect(() => {
    const result = numberRegex.test(numberOfEmployees);
    setValidNbOfEmployees(result);
  }, [numberOfEmployees]);

  useEffect(() => {
    const result = numberRegex.test(salary);
    setValidSalary(result);
  }, [salary]);

  function handleTeamPictureSelect(event) {
    const filePicture = event.target.files[0];

    // Vérifie que le fichier est un jpeg ou jpg
    if (
      (filePicture && filePicture.type === "image/jpeg") ||
      filePicture.type === "image/jpg" ||
      filePicture.type === "image/png"
    ) {
      setTeamPicture(filePicture);
      setValidPictureType(true);
    } else {
      setTeamPicture(null);
      setValidPictureType(false);
    }
  }

  useEffect(() => {
    api
      .get("/offers/city")
      .then((response) => {
        setCityOptions(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    api
      .get("/offers/job_title")
      .then((response) => {
        setJobTitleOptions(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    api
      .get("/offers/contract")
      .then((response) => {
        setContractOption(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    api
      .get("offers/remote")
      .then((response) => {
        setRemoteOption(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("recruiterId", userId);
    formData.append("cityId", city);
    formData.append("contratId", contract);
    formData.append("remoteId", remote);
    formData.append("salary", salary);
    formData.append("teamPicture", teamPicture);
    formData.append("jobOfferPresentation", jobOfferPresentation);
    formData.append("desiredProfile", desiredProfile);
    formData.append("jobTitleDetails", jobTitleDetails);
    formData.append("jobTitleId", jobTitle);
    formData.append("numberOfEmployees", numberOfEmployees);
    formData.append("consultantId", consultantId);
    formData.append("recruitmentProcess", recruitmentProcess);

    api
      .post("/offers", formData)
      .then(() => {
        setSuccess(sucessOffer);
        setTimeout(() => {
          navigate("/my-offers");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {" "}
      {success ? (
        <Success success={success} />
      ) : (
        <div className="form-offer_container">
          <form onSubmit={handleSubmit} className="form-offer">
            <div className="form-offer_select-container">
              <label className="form-offer_select-label">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="form-offer_select_select"
                >
                  <option value="">Sélectionnez une ville</option>
                  {cityOptions.map((value) => (
                    <option value={value.id} key={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="form-offer_select-label">
                <select
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="form-offer_select_select"
                >
                  <option value="">Sélectionnez un poste</option>
                  {jobTitleOptions.map((value) => (
                    <option value={value.id} key={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="form-offer_select-label">
                <select
                  value={contract}
                  onChange={(e) => setContract(e.target.value)}
                  className="form-offer_select_select"
                >
                  <option value="">Sélectionnez un contrat</option>
                  {contractOption.map((value) => (
                    <option value={value.id} key={value.id}>
                      {value.type}
                    </option>
                  ))}
                </select>
              </label>
              <label className="form-offer_select-label">
                <select
                  value={remote}
                  onChange={(e) => setRemote(e.target.value)}
                  className="form-offer_select_select"
                >
                  <option value="">Sélectionnez la modalité</option>
                  {remoteOption.map((value) => (
                    <option value={value.id} key={value.id}>
                      {value.type}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-offer_data-container">
              <div className="form-offer_data-column">
                <div className="form-offer_data-1">
                  <label className="form-label">
                    Photo d'équipe :
                    <input
                      type="file"
                      onChange={handleTeamPictureSelect}
                      className="form-input"
                    />
                    <span
                      className={
                        valideTeamPictureType ? "signup-hide" : "signup-invalid"
                      }
                    >
                      Merci de choisir un fichier .JPEG/JPG/PNG
                    </span>
                  </label>
                  <label className="form-label">
                    Détails titre de poste :
                    <input
                      type="text"
                      value={jobTitleDetails}
                      onChange={(e) => setJobTitleDetails(e.target.value)}
                      className="form-input"
                    />
                  </label>
                  <label className="form-label">
                    Nombre d'employés :
                    <input
                      type="text"
                      value={numberOfEmployees}
                      onChange={(e) => setNumberOfEmployees(e.target.value)}
                      className="form-input"
                    />
                    <span
                      className={
                        validNbOfEmployees || !numberOfEmployees
                          ? "signup-hide"
                          : "signup-invalid"
                      }
                    >
                      La valeur doit être un chiffre ou un nombre
                    </span>
                  </label>
                  <label className="form-label">
                    Salaire/mois :
                    <input
                      type="text"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="form-input"
                    />
                  </label>
                </div>
                <span
                  className={
                    validSalary || !salary ? "signup-hide" : "signup-invalid"
                  }
                >
                  La valeur doit être un un nombre
                </span>
                <label className="form-label_data">
                  Présentation entreprise / Infos offre :
                  <textarea
                    type="text"
                    value={jobOfferPresentation}
                    onChange={(e) => setJobOfferPresentation(e.target.value)}
                    className="form-input_textearea"
                    maxLength={1000}
                    style={{ resize: "none" }}
                  />
                </label>
                <label className="form-label_data">
                  Le profil que nous recherchons :
                  <textarea
                    type="text"
                    value={desiredProfile}
                    onChange={(e) => setDesiredProfile(e.target.value)}
                    className="form-input_textearea"
                    maxLength={1000}
                    style={{ resize: "none" }}
                  />
                </label>
                <label className="form-label_data">
                  Le process de recrutement :
                  <textarea
                    type="text"
                    value={recruitmentProcess}
                    onChange={(e) => setRecruitmentProcess(e.target.value)}
                    className="form-input_textearea"
                    maxLength={1000}
                    style={{ resize: "none" }}
                  />
                </label>
                <button
                  type="submit"
                  className="form-btn"
                  disabled={
                    !valideTeamPictureType ||
                    !city ||
                    !jobTitle ||
                    !contract ||
                    !remote ||
                    !jobTitleDetails ||
                    !validNbOfEmployees ||
                    !validSalary ||
                    !jobOfferPresentation ||
                    !desiredProfile ||
                    !recruitmentProcess
                  }
                >
                  Valider
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default PageCreateOffer;
