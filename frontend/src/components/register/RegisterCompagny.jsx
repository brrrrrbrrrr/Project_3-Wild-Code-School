import React, { useState, useEffect } from "react";
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
    const registrationDataCompagny = {
      siretNumber,
      name,
      mail,
      phone,
      password: pass1,
      Logo: logo,
    };
    api
      .post("/compagny", registrationDataCompagny)
      .then((res) => {
        console.warn(res);
        setSuccess(true);
      })
      .catch((err) => {
        console.error(err);
      });
    console.warn("Registraichn Data:", registrationDataCompagny);
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
            </label>
            <label className="form-label">
              Confirmer le mot de passe :
              <input
                type="password"
                value={pass2}
                onChange={(e) => setPass2(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Logo d'entreprise :
              <input
                type="file"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="form-input"
              />
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
      ;
    </>
  );
}

export default RegisterCompagny;
