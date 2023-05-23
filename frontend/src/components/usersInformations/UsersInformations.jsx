/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./UsersInformations.css";

import useApi from "../../services/useApi";

function UsersInformations({ user }) {
  const api = useApi();
  const userId = user?.id;

  const [userInfos, setUserInfos] = useState({});
  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  // Je formate ma date ISO 8601 en date classique
  const dateBirthDay = new Date(birthday);
  const formattedBirthday = dateBirthDay.toLocaleDateString("fr-FR");
  //
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [mail, setMail] = useState("");
  const [picture, setPicture] = useState(null);
  const [validePictureType, setValidPictureType] = useState(false);
  const [resume, setResume] = useState(null);
  const [showResume, setShowResume] = useState("");
  const [valideResumeType, setValidResumeType] = useState(false);
  const [reload, setReload] = useState(0);
  const [gender, setGender] = useState("");
  let userType = user?.userType;

  if (userType === "company") {
    userType = "recruiters";
  }

  const urlFile = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    api

      .get(`/${userType}/${userId}`)
      .then((res) => {
        setUserInfos(res.data);
        setFirstname(res.data.firstname);
        setName(res.data.name);
        setBirthday(res.data.birthday);
        setStreet(res.data.street);
        setCity(res.data.city);
        setPostalCode(res.data.postalCode);
        setMail(res.data.mail);
        setPhone(res.data.phone);
        setGender(res.data.gender);
        setResume(res.data.resume);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [reload]);

  function handlePictureSelect(event) {
    const filePicture = event.target.files[0];

    // Vérifie que le fichier est un jpeg ou jpg
    if (
      (filePicture && filePicture.type === "image/jpeg") ||
      filePicture.type === "image/jpg" ||
      filePicture.type === "image/png"
    ) {
      setPicture(filePicture);
      setValidPictureType(true);
    } else {
      setPicture(null);
      setValidPictureType(false);
    }
  }

  function handleResumeSelect(event) {
    const fileResume = event.target.files[0];

    // Vérifie que le fichier est un PDF
    if (fileResume && fileResume.type === "application/pdf") {
      setResume(fileResume);
      setValidResumeType(true);
    } else {
      setResume(null);
      setValidResumeType(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentValues = {
      name: userInfos.name,
      firstname: userInfos.firstname,
      birthday: userInfos.birthday,
      street: userInfos.street,
      city: userInfos.city,
      postalCode: userInfos.postalCode,
      mail: userInfos.mail,
      picture: userInfos.picture,
      resume: userInfos.resume,
      gender: userInfos.gender,
    };

    const updatedValues = {
      name,
      firstname,
      birthday,
      street,
      city,
      postalCode,
      mail,
      picture,
      resume,
      gender,
    };

    const formData = new FormData();

    Object.keys(updatedValues).forEach((key) => {
      if (key === "picture" && !updatedValues[key]) {
        // Si le champ picture a été laissé vide, on ne l'ajoute pas à FormData
        return;
      }
      if (key === "resume" && !updatedValues[key]) {
        // Si le champ picture a été laissé vide, on ne l'ajoute pas à FormData
        return;
      }

      if (updatedValues[key] !== currentValues[key]) {
        formData.append(key, updatedValues[key]);
      }
    });
    api
      .put(`/${userType}/${userId}`, formData)

      .then((res) => {
        setReload(reload + 1);
        setTimeout(() => {
          setReload(0);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
    console.warn("data", formData);
  };

  return reload > 0 ? (
    <p className="update-succes_p">Mise à jour ...</p>
  ) : (
    <div className="users-informations_container">
      <div className="users-informations_column">
        <h1 className="users-informations_h1">Mes informations</h1>
        <h2 className="users-informations_picture-h2">Photo de profil</h2>
        <div className="rounded-img_container">
          <div className="rounded-image">
            <img
              className="users-informations_picture"
              src={`${urlFile}${userInfos?.picture}`}
              alt=""
            />
            <div className="rounded-border" />
            <div className="rounded-border2" />
          </div>
          <form onSubmit={handleSubmit} className="form-edit">
            <div className="users-informations_files-container">
              <label className="form-label">
                Photo :
                <input
                  type="file"
                  onChange={handlePictureSelect}
                  className="form-input"
                />
                <span
                  className={
                    validePictureType ? "signup-hide" : "signup-invalid"
                  }
                >
                  Merci de choisir un fichier .JPEG/JPG/PNG
                </span>
              </label>
              <div className="form-label_container">
                <label className="form-label_resume">
                  CV :
                  <input
                    type="file"
                    onChange={handleResumeSelect}
                    className="form-input"
                  />{" "}
                  <a
                    href={urlFile + resume}
                    target="_blank"
                    rel="noreferrer"
                    className="resume-download"
                  >
                    (Télécharger)
                  </a>
                  <span
                    className={
                      valideResumeType ? "signup-hide" : "signup-invalid"
                    }
                  >
                    Merci de choisir un fichier .PDF
                  </span>
                </label>
              </div>
            </div>
            <div />
            <div>
              <div className="form-infos_container">
                <div className="form-label_gender-container">
                  <label className="form-label_gender">
                    <input
                      type="radio"
                      value="male"
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                      checked={gender === "male"}
                      className="form-input_gender"
                    />
                    Homme
                  </label>
                  <label className="form-label_gender">
                    <input
                      type="radio"
                      value="female"
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                      checked={gender === "female"}
                      className="form-input_gender"
                    />
                    Femme
                  </label>
                  <label className="form-label_gender">
                    <input
                      type="radio"
                      value="non-binary"
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                      checked={gender === "non-binary"}
                      className="form-input_gender"
                    />
                    Non-binaire
                  </label>
                  <label className="form-label_gender">
                    <input
                      type="radio"
                      value={
                        gender !== "male" &&
                        gender !== "female" &&
                        gender !== "non-binary"
                          ? gender
                          : ""
                      }
                      checked={
                        gender !== "male" &&
                        gender !== "female" &&
                        gender !== "non-binary"
                      }
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                      className="form-input_gender"
                    />
                    Autre
                  </label>
                  {gender !== "male" &&
                    gender !== "female" &&
                    gender !== "non-binary" && (
                      <label className="form-label_gender">
                        <input
                          type="text"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          placeholder="Je suis ..."
                          className="form-input_gender-other"
                        />
                      </label>
                    )}
                </div>

                <label className="form-label">
                  Prénom :
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Nom :
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Email :
                  <input
                    type="text"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Téléphone :
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Date de naissance :{" "}
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="form-input"
                  />
                  <span className="span-birthday">{formattedBirthday}</span>
                </label>
                <label className="form-label">
                  Code Postal :
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Ville :
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Rue :
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="form-input"
                  />
                </label>
                <div className="form-btn-container">
                  <button type="submit" className="form-btn">
                    Valider
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
UsersInformations.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
  }).isRequired,
};

export default UsersInformations;
