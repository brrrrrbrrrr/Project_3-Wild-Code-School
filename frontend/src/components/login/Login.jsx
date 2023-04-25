import "./Login.css";
import React, { useRef, useState } from "react";
import useApi from "../../services/useApi";
import { useUser } from "../../contexts/UserRecruiterContext";

function Login() {
  const [msgErr, setMsgErr] = useState("");
  const api = useApi();
  const { setUser } = useUser();
  const refMail = useRef();
  const refPass = useRef();
  const [succes, setSucces] = useState(null);
  const [loginUser, setLoginUser] = useState("");
  const candidates = "candidates";
  const compagny = "compagny";
  const consultants = "consultants";

  const handleClickCandidates = () => {
    setLoginUser(candidates);
  };

  const handleClickCompagny = () => {
    setLoginUser(compagny);
  };

  const handleClickConsultants = () => {
    setLoginUser(consultants);
  };
  const loginApi = `/login/${loginUser}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const mail = refMail.current.value;
    const password = refPass.current.value;
    const userLogin = {
      mail,
      password,
    };
    api
      .post(loginApi, userLogin)
      .then((res) => {
        console.warn(res);
        const { token, user } = res.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUser(user);
        setSucces(true);
      })
      .catch((err) => {
        console.warn(err);
        let errorMsg = "";
        switch (err.response.status) {
          case 401:
            errorMsg = "Vous n'êtes pas autorisé à vous connecter";
            break;

          case 422:
            errorMsg = "Erreur dans les données fournies";
            break;
          default:
            errorMsg = "Erreur serveur";
        }
        setMsgErr(errorMsg);
      });
  };

  return (
    <div>
      <div className="btn-container">
        <button
          type="button"
          className="btn-choice-user"
          onClick={handleClickCompagny}
        >
          Entreprise
        </button>
        <button
          type="button"
          className="btn-choice-user"
          onClick={handleClickCandidates}
        >
          Candidat
        </button>
        <button
          type="button"
          className="btn-choice-user"
          onClick={handleClickConsultants}
        >
          Consultant
        </button>
      </div>
      {succes ? (
        "Vous êtes connecté"
      ) : (
        <div className="login-container">
          <h2 className="connexion-h2">Se connecter</h2>

          <form onSubmit={handleSubmit} className="form-login">
            <label htmlFor="login" className="login-label">
              Adresse e-mail
              <input type="text" className="input-login-form" ref={refMail} />
            </label>
            <label htmlFor="password" className="login-label">
              Mot de passe
              <input
                type="password"
                className="input-login-form"
                ref={refPass}
              />
            </label>
            <div className="connexion-btn-container">
              {" "}
              <button className="connexion-btn" type="submit">
                Connexion
              </button>
            </div>
          </form>
          <div>{!succes ? msgErr : ""}</div>
        </div>
      )}
    </div>
  );
}

export default Login;
