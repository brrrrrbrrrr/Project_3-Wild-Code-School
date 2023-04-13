import "./Register.css";

import React, { useEffect, useState } from "react";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validMail, setValidMail] = useState(false);

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const MAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const result = PWD_REGEX.test(password1);
    setValidPwd(result);
    const mailResult = MAIL_REGEX.test(mail);
    setValidMail(mailResult);
    const match = password1 === password2;
    setValidMatch(match);
  }, [password1, password2, mail]);

  const handleSubmit = (e) => {
    e.preventDeault();
  };
  return (
    <form onSubmit={handleSubmit} className="form-signup">
      <label htmlFor="firstname" className="form-signup-label">
        Prénom :
        <input
          type="text"
          className="form-signup-input"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </label>
      <label htmlFor="name" className="form-signup-label">
        Nom :
        <input
          type="text"
          className="form-signup-input"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="mail" className="form-signup-label">
        Email :
        <input
          type="text"
          className="form-signup-input"
          id="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <span className={validMail || !mail ? "signup-hide" : "signup-invalid"}>
          Email invalide
        </span>
      </label>
      <label htmlFor="phone" className="form-signup-label">
        Télephone :
        <input
          type="text"
          className="form-signup-input"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <label htmlFor="birthday" className="form-signup-label">
        Date de naissance :
        <input
          type="date"
          className="form-signup-input"
          id="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </label>
      <label htmlFor="street" className="form-signup-label">
        Rue :
        <input
          type="text"
          className="form-signup-input"
          id="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </label>
      <label htmlFor="city" className="form-signup-label">
        Ville :
        <input
          type="text"
          className="form-signup-input"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <label htmlFor="postalCode" className="form-signup-label">
        Code Postal :
        <input
          type="text"
          className="form-signup-input"
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </label>
      <label htmlFor="password1" className="form-signup-label">
        Mot de passe :
        <input
          type="password"
          className="form-signup-input"
          id="password1"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <span
          className={validPwd || !password1 ? "signup-hide" : "signup-invalid"}
        >
          Mot de passe invalide
        </span>
      </label>
      <label htmlFor="password2" className="form-signup-label">
        Confirmer le mot de passe :
        <input
          type="password"
          className="form-signup-input"
          id="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <span
          className={
            validMatch || !password2 ? "signup-hide" : "signup-invalid"
          }
        >
          Les mots de passe ne correspondent pas
        </span>
      </label>
      <button type="button" className="form-signup-btn">
        Valider
      </button>
    </form>
  );
}

export default Register;
