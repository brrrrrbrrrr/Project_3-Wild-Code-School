/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import useApi from "../../services/useApi";
import { useUser } from "../../contexts/UserContext";

function Login() {
  const [msgErr, setMsgErr] = useState("");
  const api = useApi();
  const { setUser } = useUser();
  const refMail = useRef();
  const refPass = useRef();
  const [succes, setSucces] = useState(null);
  const [loginUser, setLoginUser] = useState(null);
  const navigate = useNavigate();

  // Je stock mes différentes routes
  const candidates = "candidates";
  const compagnys = "compagny";
  const consultants = "consultants";
  const recruiters = "recruiters";

  // Une fonction qui prend en parametre le choix du button, pour l'identifier et n'afficher que celui ci
  // J'utilise ensuite cette fonction dans les classes de ma liste
  function getMenuItemClassName(choice) {
    let className = "li-choice";
    if (loginUser === choice) {
      className += " li-choice_active";
    } else if (loginUser !== null && loginUser !== choice) {
      className += " li-choice_hidden";
    }
    return className;
  }

  // POUR CHAQUE BUTTON  :
  // J'utilise le meme state pour recuperer une valeur différente, en fonction du button qui est cliqué
  // Si il a déjà une valeur, je le réinitialise a null (si j'utilisateur souhaite changer par exemple)

  const handleClickRecruiter = () => {
    if (loginUser) {
      setLoginUser(null);
    } else {
      setLoginUser(recruiters);
    }
    setMsgErr("");
  };

  const handleClickCandidates = () => {
    if (loginUser) {
      setLoginUser(null);
    } else {
      setLoginUser(candidates);
    }
    setMsgErr("");
  };

  const handleClickCompagny = () => {
    if (loginUser) {
      setLoginUser(null);
    } else {
      setLoginUser(compagnys);
    }
    setMsgErr("");
  };

  const handleClickConsultants = () => {
    if (loginUser) {
      setLoginUser(null);
    } else {
      setLoginUser(consultants);
    }
    setMsgErr("");
  };

  // Je change de manière dynamique ma requette d'API en fonction de du choix de l'utilisateur (candidat/entreprise/etc)
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
        // Je verifie le contenu de res.data
        let userObject = "";
        if ("candidate" in res.data) {
          const { token, candidate } = res.data;
          api.defaults.headers.authorization = `Bearer ${token}`;
          userObject = candidate;
        }
        if ("compagny" in res.data) {
          const { token, compagny } = res.data;
          api.defaults.headers.authorization = `Bearer ${token}`;
          userObject = compagny;
        }
        if ("consultant" in res.data) {
          const { token, consultant } = res.data;
          api.defaults.headers.authorization = `Bearer ${token}`;
          userObject = consultant;
        }
        if ("recruiter" in res.data) {
          const { token, recruiter } = res.data;
          api.defaults.headers.authorization = `Bearer ${token}`;
          userObject = recruiter;
        }
        // Je met mon object dans mon context user afin de le recuperer partout
        setUser(userObject);
        // Si tout est ok, mon state passe a true, j'utilise ce state pour l'affichage ou non de certaines choses
        setSucces(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.warn(err);

        // Je traite et renvoi les erreurs
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
        <p className="connexion-done">Vous êtes connecté</p>
      ) : (
        <div className="login-container">
          <div className="login-column">
            <div className="select-container">
              <h2
                className={`connexion-h2 ${
                  loginUser ? "connexion-h2" : "connexion-h2-unselect"
                }`}
              >
                Vous êtes :
              </h2>
              <ul className="ul-choice">
                <li
                  className={getMenuItemClassName(candidates)}
                  onClick={handleClickCandidates}
                >
                  Candidat
                </li>
                <li
                  className={getMenuItemClassName(compagnys)}
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
                  <button
                    disabled={!loginUser}
                    className={
                      loginUser ? "connexion-btn" : "connexion-btn-disable"
                    }
                    type="submit"
                  >
                    Connexion
                  </button>
                </div>
              </form>
            </div>

            <div className="form-login_errorMsg">{!succes ? msgErr : ""}</div>
          </div>

          <div className="form-login_sub-container">
            <p>Pas de compte ?</p>
            <Link className="form-login_sub-link" to="/registration">
              <p>Inscrivez-vous</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
