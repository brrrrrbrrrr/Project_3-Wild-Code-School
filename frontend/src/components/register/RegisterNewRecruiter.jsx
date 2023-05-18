/* eslint-disable import/order */
/* eslint-disable object-shorthand */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from "react";
import useApi from "../../services/useApi";
import "./RegisterDefault.css";
import "../usersInformations/UsersInformations.css";

const RegisterCandidate = () => {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [mail, setMail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validMail, setValidMail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phone, setPhone] = useState("");
  const [jobSeeker, setJobSeeker] = useState(1);
  const [picture, setPicture] = useState(null);

  const [contactPreference, setContactPreference] = useState("1");
  const [gender, setGender] = useState("");

  const [validePictureType, setValidPictureType] = useState(false);
  const [error, setError] = useState();

  const api = useApi();

  const PWD_REDEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const MAIL_REDEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  function handlePictureSelect(event) {
    const filePicture = event.target.files[0];
    // Vérifie que le fichier est un jpeg ou jpg
    if (
      (filePicture && filePicture.type === "image/jpeg") ||
      filePicture.type === "image/jpg" ||
      filePicture.type === "image/png"
    ) {
      setPicture(filePicture);
      setValidPictureType(true);
    } else {
      setPicture(null);
      setValidPictureType(false);
    }
  }

  useEffect(() => {
    const result = MAIL_REDEX.test(mail);
    setValidMail(result);
  }, [mail]);

  useEffect(() => {
    const result = PWD_REDEX.test(pass1);
    setValidPwd(result);
    const match = pass1 === pass2;
    setValidMatch(match);
  }, [pass1, pass2]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("firstname", firstname);
    formData.append("birthday", birthday);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("postalAdress", postalAddress);
    formData.append("mail", mail);
    formData.append("phone", phone);
    formData.append("password", pass1);
    formData.append("jobSeeker", jobSeeker);
    formData.append("picture", picture);
    formData.append("contactPreference", contactPreference);
    formData.append("gender", gender);
    api
      .post("/recruiters", formData)
      .then((res) => {
        console.warn(res);
        setSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        if (err) {
          setError(err.response.data);
        }
      });
    console.warn("Registraichn Data:", formData);
  };

  return (
    <>
      {" "}
      {success ? (
        <section className="registration-succes_msg">
          Recruteur ajouté !{" "}
        </section>
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-signup">
            <div className="form-label_gender-h2_container">
              <h2 className="form-label_gender-h2"> Genre :</h2>
            </div>
            <label className="form-label_gender">
              <input
                type="radio"
                value="male"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "male"}
                className="form-input_gender"
              />
              Homme
            </label>
            <label className="form-label_gender">
              <input
                type="radio"
                value="female"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "female"}
                className="form-input_gender"
              />
              Femme
            </label>
            <label className="form-label_gender">
              <input
                type="radio"
                value="non-binary"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "non-binary"}
                className="form-input_gender"
              />
              Non-binaire
            </label>
            <label className="form-label_gender">
              <input
                type="radio"
                value={
                  gender !== "male" &&
                  gender !== "female" &&
                  gender !== "non-binary"
                    ? gender
                    : ""
                }
                checked={
                  gender !== "male" &&
                  gender !== "female" &&
                  gender !== "non-binary"
                }
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                className="form-input_gender"
              />
              Autre
            </label>
            {gender !== "male" &&
              gender !== "female" &&
              gender !== "non-binary" && (
                <label className="form-label_gender">
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Je suis ..."
                    className="form-input_gender-other"
                  />
                </label>
              )}
            <label className="form-label">
              Nom :
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Prénom :
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Date de naissance :
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Rue :
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Ville :
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Code Postal :
              <input
                type="text"
                value={postalAddress}
                onChange={(e) => setPostalAddress(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Téléphone :
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Actuellement :
              <select
                value={jobSeeker}
                onChange={(e) => setJobSeeker(e.target.value)}
                className="form-input"
              >
                <option value={0}>Employé(e)</option>
                <option value={1}>En recherche d'emploi</option>
              </select>
            </label>
            <label className="form-label">
              Photo :
              <input
                type="file"
                onChange={handlePictureSelect}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Préférence de contact:
              <select
                value={contactPreference}
                onChange={(e) => setContactPreference(e.target.value)}
                className="form-input"
              >
                <option value={2}>Email</option>
                <option value={1}>Télephone</option>
                <option value={0}>SMS</option>
              </select>
            </label>
            <label className="form-label">
              Email :
              <input
                type="text"
                autoComplete="off"
                id="mail"
                aria-invalid={validMail ? "false" : "true"}
                aria-describedby="uidnote"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="form-input"
              />
            </label>
            <span
              className={validMail || !mail ? "signup-hide" : "signup-invalid"}
            >
              Email invalide
            </span>
            <label htmlFor="pass1" className="form-label">
              Mot de passe :
              <input
                type="password"
                id="pass1"
                value={pass1}
                onChange={(e) => setPass1(e.target.value)}
                className="form-input"
              />
              <span
                className={
                  validPwd || !pass1 ? "signup-hide" : "signup-invalid"
                }
              >
                Mot de passe invalide
              </span>
            </label>
            <label htmlFor="pass2" className="form-label">
              Confirmer le mot de passe :
              <input
                type="password"
                id="pass2"
                value={pass2}
                onChange={(e) => setPass2(e.target.value)}
                className="form-input"
              />
              <span
                className={
                  validMatch || !pass2 ? "signup-hide" : "signup-invalid"
                }
              >
                Les mots de passe ne correspondent pas
              </span>
            </label>
            <div className="form-btn-container">
              <button
                type="submit"
                disabled={
                  !validMail || !validPwd || !validMatch || !validePictureType
                }
                className="form-btn"
              >
                Valider
              </button>
              <p className="form-signup_errorMsg">
                {error ? `${error} (mail)` : ""}
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterCandidate;
