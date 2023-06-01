import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useApi from "../../services/useApi";
import "./RegisterDefault.css";

function RegisterCompagny() {
  const [name, setName] = useState("");
  const [siretNumber, setSiretNumber] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validMail, setValidMail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [logo, setLogo] = useState("");
  const [validLogoType, setValidLogoType] = useState(false);
  const [error, setError] = useState();
  const api = useApi();

  const PWD_REDEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;
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
  function handlePictureSelect(event) {
    const fileLogo = event.target.files[0];

    // Vérifie que le fichier est un jpeg ou jpg
    if (
      (fileLogo && fileLogo.type === "image/jpeg") ||
      fileLogo.type === "image/jpg" ||
      fileLogo.type === "image/png"
    ) {
      setLogo(fileLogo);
      setValidLogoType(true);
    } else {
      setLogo(null);
      setValidLogoType(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("siretNumber", siretNumber);
    formData.append("name", name);
    formData.append("mail", mail);
    formData.append("phone", phone);
    formData.append("password", pass1);
    formData.append("Logo", logo);
    api
      .post("/compagny", formData)
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
          Merci, vous pouvez vous{" "}
          <Link className="registration-succes_msg-connexion" to="/connect">
            {" "}
            connecter
          </Link>
        </section>
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-signup">
            <label className="form-label">
              Nom de l'entreprise :
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Numéro de SIRET :
              <input
                type="text"
                value={siretNumber}
                onChange={(e) => setSiretNumber(e.target.value)}
                className="form-input"
              />
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
            <label className="form-label">
              Téléphone :
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Mot de passe :
              <input
                type="password"
                value={pass1}
                onChange={(e) => setPass1(e.target.value)}
                className="form-input"
              />
              <span
                className={
                  validPwd || !pass1 ? "signup-hide" : "signup-invalid"
                }
              >
                Doit contenir 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère
                spécial, 8-24 caractères
              </span>
            </label>
            <label className="form-label">
              Confirmer le mot de passe :
              <input
                type="password"
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
            <label className="form-label">
              Logo d'entreprise :
              <input
                type="file"
                onChange={handlePictureSelect}
                className="form-input"
              />
              <span
                className={
                  logo || validLogoType ? "signup-hide" : "signup-invalid"
                }
              >
                Merci de choisir un fichier .JPEG/JPG/PNG
              </span>
            </label>
            <div className="form-btn-container">
              <button
                type="submit"
                disabled={
                  !validMail || !validPwd || !validMatch || !validLogoType
                }
                className="form-btn"
              >
                Valider
              </button>
              <p className="form-signup_errorMsg">{error || ""}</p>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default RegisterCompagny;
