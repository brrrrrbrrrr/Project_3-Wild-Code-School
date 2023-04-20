/* eslint-disable object-shorthand */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from "react";
import useApi from "../../services/useApi";
import "./RegisterCandidate.css";

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
  const [jobSeeker, setJobSeeker] = useState(true);
  const [picture, setPicture] = useState("");
  const [resume, setResume] = useState("");
  const [contactPreference, setContactPreference] = useState("1");

  const api = useApi();

  const PWD_REDEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const MAIL_REDEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

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
    const registrationDataCandidate = {
      name: name,
      firstname: firstname,
      birthday: birthday,
      street: street,
      city: city,
      postalAdress: postalAddress,
      mail: mail,
      phone: phone,
      password: pass1,
      jobSeeker: jobSeeker,
      picture: picture,
      resume: resume,
      contactPreference: contactPreference,
    };
    api
      .post("/candidates", registrationDataCandidate)
      .then((res) => {
        console.warn(res);
        setSuccess(true);
      })
      .catch((err) => {
        console.error(err);
      });
    console.warn("Registraichn Data:", registrationDataCandidate);
  };

  return (
    <>
      {" "}
      {success ? (
        <section>Ok, vous pouvez vous connecter</section>
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-signup">
            <label className="form-label">
              Nom :
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="form-label">
              Prénom :
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </label>
            <label className="form-label">
              Date de naissance :
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </label>
            <label className="form-label">
              Rue :
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </label>
            <label className="form-label">
              Ville :
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <label className="form-label">
              Code Postal :
              <input
                type="text"
                value={postalAddress}
                onChange={(e) => setPostalAddress(e.target.value)}
              />
            </label>
            <label className="form-label">
              Téléphone :
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label className="form-label">
              Actuellement :
              <select
                value={jobSeeker}
                onChange={(e) => setJobSeeker(e.target.value)}
              >
                <option value={0}>Employé(e)</option>
                <option value={1}>En recherche d'emploi</option>
              </select>
            </label>
            <label className="form-label">
              Photo :
              <input
                type="file"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
              />
            </label>
            <label className="form-label">
              CV :
              <input
                type="file"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            </label>
            <label className="form-label">
              Préférence de contact:
              <select
                value={contactPreference}
                onChange={(e) => setContactPreference(e.target.value)}
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
              />
              <span
                className={
                  validMatch || !pass2 ? "signup-hide" : "signup-invalid"
                }
              >
                Les mots de passe ne correspondent pas
              </span>
            </label>
            <button
              type="submit"
              disabled={!validMail || !validPwd || !validMatch}
              value="Reegistraishen"
            >
              Valider
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterCandidate;
