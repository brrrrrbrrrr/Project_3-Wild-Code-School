/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
  const [loginUser, setLoginUser] = useState(null);

  const candidates = "candidates";
  const compagny = "compagny";
  const consultants = "consultants";
  const recruiters = "recruiters";

  function getMenuItemClassName(choice) {
    let className = "li-choice";
    if (loginUser === choice) {
      className += " li-choice_active";
    } else if (loginUser !== null && loginUser !== choice) {
      className += " li-choice_hidden";
    }
    return className;
  }

  const handleMenu = () => {};

  const handleClickRecruiter = () => {
    if (loginUser) {
      setLoginUser(null);
    } else {
      setLoginUser(recruiters);
    }
  };

  const handleClickCandidates = () => {
    if (loginUser) {
      setLoginUser(null);
    } else {
      setLoginUser(candidates);
    }
  };

  const handleClickCompagny = () => {
    if (loginUser) {
      setLoginUser(null);
    } else {
      setLoginUser(compagny);
    }
  };

  const handleClickConsultants = () => {
    if (loginUser) {
      setLoginUser(null);
    } else {
      setLoginUser(consultants);
    }
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
      <div className="btn-container" />
      {succes ? (
        "Vous êtes connecté"
      ) : (
        <div className="login-container">
          <div className="login-column">
            <div className="select-container">
              <h2 className="connexion-h2" onClick={handleMenu}>
                Vous êtes :{" "}
              </h2>
              <ul className="ul-choice">
                <li
                  className={getMenuItemClassName(candidates)}
                  onClick={handleClickCandidates}
                >
                  Candidat
                </li>
                <li
                  className={getMenuItemClassName(compagny)}
                  onClick={handleClickCompagny}
                >
                  Entreprise
                </li>
                <li
                  className={getMenuItemClassName(recruiters)}
                  onClick={handleClickRecruiter}
                >
                  Recruteur
                </li>
                <li
                  className={getMenuItemClassName(consultants)}
                  onClick={handleClickConsultants}
                >
                  Consultant
                </li>
              </ul>
            </div>
            <div className="form-login_container">
              <form onSubmit={handleSubmit} className="form-login">
                <label htmlFor="login" className="login-label">
                  Adresse e-mail
                  <input
                    type="text"
                    className="input-login-form"
                    ref={refMail}
                  />
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
            </div>
            <div>{!succes ? msgErr : ""}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
