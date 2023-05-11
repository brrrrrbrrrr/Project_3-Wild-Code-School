import React, { useState, useEffect } from "react";
import useApi from "../../services/useApi";
import { useUser } from "../../contexts/UserContext";

function AccountSettings() {
  const [passInit, setPassInit] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const api = useApi();
  const { user } = useUser();
  const userInfo = user;
  const PWD_REDEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  console.warn("userinfos :", userInfo.id);
  useEffect(() => {
    const result = PWD_REDEX.test(pass1);
    setValidPwd(result);
    const match = pass1 === pass2;
    setValidMatch(match);
  }, [pass1, pass2]);

  const handleSubmit = (e) => {
    const verifyPasswordApi = `login/candidates/${userInfo.id}/verifypassword`;
    const password = {
      password: passInit,
    };
    e.preventDefault();
    api
      .post(verifyPasswordApi, password)
      .then((res) => {
        console.warn(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="passInit" className="form-label">
          Mot de passe actuelle :
          <input
            type="password"
            id="passInit"
            value={passInit}
            onChange={(e) => setPassInit(e.target.value)}
            className="form-input"
          />
          <span
            className={validPwd || !pass1 ? "signup-hide" : "signup-invalid"}
          >
            Mot de passe invalide
          </span>
        </label>
        <button type="submit">Valider</button>
      </form>

      <label htmlFor="pass1" className="form-label">
        Nouveau mot de passe :
        <input
          type="password"
          id="pass1"
          value={pass1}
          onChange={(e) => setPass1(e.target.value)}
          className="form-input"
        />
        <span className={validPwd || !pass1 ? "signup-hide" : "signup-invalid"}>
          Mot de passe invalide
        </span>
      </label>
      <label htmlFor="pass2" className="form-label">
        Confirmer le mot nouveau de passe :
        <input
          type="password"
          id="pass2"
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          className="form-input"
        />
        <span
          className={validMatch || !pass2 ? "signup-hide" : "signup-invalid"}
        >
          Les mots de passe ne correspondent pas
        </span>
      </label>
      {/* </form> */}
    </div>
  );
}

export default AccountSettings;
