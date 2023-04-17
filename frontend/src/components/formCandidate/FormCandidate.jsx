/* eslint-disable object-shorthand */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from "react";
import useApi from "../../services/useApi";
import "./FormCandidate.css";

const FormCandidate = () => {
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePostalAddressChange = (e) => {
    setPostalAddress(e.target.value);
  };

  const handleMailChange = (e) => {
    setMail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleJobSeekerChange = (e) => {
    setJobSeeker(e.target.value);
  };

  const handlePictureChange = (e) => {
    setPicture(e.target.value);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.value);
  };

  const handlecontactPreferenceChange = (e) => {
    setContactPreference(e.target.value);
  };

  const handlePasswordOneChange = (e) => {
    setPass1(e.target.value);
  };
  const handlePasswordTwoChange = (e) => {
    setPass2(e.target.value);
  };

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
        <section>ok , you can connecting</section>
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label className="form-label">
              Name:
              <input type="text" value={name} onChange={handleNameChange} />
            </label>

            <label className="form-label">
              First name:
              <input
                type="text"
                value={firstname}
                onChange={handleFirstnameChange}
              />
            </label>

            <label className="form-label">
              Birthday:
              <input
                type="date"
                value={birthday}
                onChange={handleBirthdayChange}
              />
            </label>

            <label className="form-label">
              Street:
              <input type="text" value={street} onChange={handleStreetChange} />
            </label>

            <label className="form-label">
              City:
              <input type="text" value={city} onChange={handleCityChange} />
            </label>

            <label className="form-label">
              Address postal:
              <input
                type="text"
                value={postalAddress}
                onChange={handlePostalAddressChange}
              />
            </label>

            <label className="form-label">
              Phone:
              <input type="tel" value={phone} onChange={handlePhoneChange} />
            </label>

            <label className="form-label">
              Job seeker:
              <select value={jobSeeker} onChange={handleJobSeekerChange}>
                <option value={1}>Working</option>
                <option value={0}>Looking for the work</option>
              </select>
            </label>

            <label className="form-label">
              Photo:
              <input
                type="file"
                value={picture}
                onChange={handlePictureChange}
              />
            </label>

            <label className="form-label">
              CV:
              <input type="file" value={resume} onChange={handleResumeChange} />
            </label>

            <label className="form-label">
              How to contact:
              <select
                value={contactPreference}
                onChange={handlecontactPreferenceChange}
              >
                <option value={2}>mail</option>
                <option value={1}>phone</option>
                <option value={0}>sms</option>
              </select>
            </label>
            <label className="form-label">
              Mail:
              <input
                type="text"
                autoComplete="off"
                id="mail"
                aria-invalid={validMail ? "false" : "true"}
                aria-describedby="uidnote"
                value={mail}
                onChange={handleMailChange}
              />
            </label>
            <p
              className={mail && validMail ? "signup-hide" : "signup-invalid"}
              id="uidnote"
            >
              should have bla bla bla
            </p>
            <label htmlFor="pass1" className="form-label">
              Password:
              <input
                type="password"
                id="pass1"
                value={pass1}
                onChange={handlePasswordOneChange}
              />
              <span
                className={
                  validPwd || !pass1 ? "signup-hide" : "signup-invalid"
                }
              >
                password doesnt good yet
              </span>
            </label>
            <label htmlFor="pass2" className="form-label">
              confirm Password:
              <input
                type="password"
                id="pass2"
                value={pass2}
                onChange={handlePasswordTwoChange}
              />
              <span
                className={
                  validMatch || !pass2 ? "signup-hide" : "signup-invalid"
                }
              >
                password is not same
              </span>
            </label>

            <input
              type="submit"
              disabled={!validMail || !validPwd || !validMatch}
              value="Registraishen"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default FormCandidate;
