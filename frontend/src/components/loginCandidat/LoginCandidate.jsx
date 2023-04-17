/* eslint-disable object-shorthand */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect, useRef } from "react";
import useApi from "../../services/useApi";

import "./LoginCandidate.css";

import { useCandidate } from "../../contexts/CandidateContext";

const LoginCandidate = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [validMail, setValidMail] = useState(false);

  const MAIL_REDEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  const api = useApi();
  const { setCandidate } = useCandidate();
  const refMail = useRef();
  const refPass = useRef();

  useEffect(() => {
    const result = MAIL_REDEX.test(mail);
    setValidMail(result);
  }, [mail]);

  const handleLoginChange = (e) => {
    setMail(e.target.value);
  };

  const handlePasswordOneChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = refMail.current.value;
    const pass = refPass.current.value;

    const candidate = {
      mail: login,
      password: pass,
    };
    api
      .post("/login/candidates", candidate)
      .then((res) => {
        // console.warn(res);
        // eslint-disable-next-line no-shadow
        const { token, candidate } = res.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setCandidate(candidate);
      })
      .catch((err) => {
        console.error(err);
        let errorMsg = "";
        if (err) {
          switch (err.response?.status) {
            case 401:
              errorMsg = "You are not authorisated";
              break;
            case 404:
              errorMsg = "Candidate isnt existe";
              break;
            case 422:
              errorMsg = "Error with the database";
              break;
            default:
              errorMsg = "Server Error";
          }
          alert(errorMsg);
        }
      });

    // Добавьте код для обработки ввода логина и пароля
    console.warn("Mail:", mail);
    console.warn("Password:", password);
    // Можно отправить данные на сервер или выполнить другую логику здесь
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="mail">
          Mail:
          <input
            type="text"
            autoComplete="off"
            id="mail"
            aria-invalid={validMail ? "false" : "true"}
            aria-describedby="uidnote"
            value={mail}
            onChange={handleLoginChange}
            ref={refMail}
          />
        </label>
        <p
          className={mail && validMail ? "signup-hide" : "signup-invalid"}
          id="uidnote"
        >
          should have bla bla bla
        </p>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="pass1"
            value={password}
            onChange={handlePasswordOneChange}
            ref={refPass}
          />
        </label>

        <button type="submit">Enter</button>
      </form>
    </div>
  );
};

export default LoginCandidate;
