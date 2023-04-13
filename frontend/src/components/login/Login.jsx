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
  const handleSubmit = (e) => {
    e.preventDefault();
    const mail = refMail.current.value;
    const password = refPass.current.value;
    const userLogin = {
      mail,
      password,
    };
    api
      .post("/login-recruiter", userLogin)
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
      {succes ? (
        "Vous êtes connecté"
      ) : (
        <div className="login-container">
          <h2>Connexion</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="login" className="login-label">
              Login :
              <input type="text" className="input-login-form" ref={refMail} />
            </label>
            <label htmlFor="password" className="login-label">
              Mot de passe :
              <input
                type="password"
                className="input-login-form"
                ref={refPass}
              />
            </label>
            <button type="submit">Connexion</button>
          </form>
          <div>{!succes ? msgErr : ""}</div>
        </div>
      )}
    </div>
  );
}

export default Login;
