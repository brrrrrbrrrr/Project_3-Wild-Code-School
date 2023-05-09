/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import "./UsersInformations.css";
import useApi from "../../services/useApi";

function UsersInformations({ user }) {
  const api = useApi();
  const userId = user?.id;
  const [candidateInfos, setCandidateInfos] = useState({});
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
  const [postalAddress, setPostalAddress] = useState("");
  const [mail, setMail] = useState("");
  const [picture, setPicture] = useState(null);
  const [validePictureType, setValidPictureType] = useState(false);
  const [resume, setResume] = useState(null);
  const [valideResumeType, setValidResumeType] = useState(false);
  const [reload, setReload] = useState(false);
  const urlFile = import.meta.env.VITE_APP_URL;
  useEffect(() => {
    if (typeof candidateInfos !== "undefined")
      api
        .get(`/candidates/${userId}`)
        .then((res) => {
          setCandidateInfos(res.data);
          setFirstname(res.data.firstname);
          setName(res.data.name);
          setBirthday(res.data.birthday);
          setStreet(res.data.street);
          setCity(res.data.city);
          setPostalAddress(res.data.postalAdress);
          setMail(res.data.mail);
          setPhone(res.data.phone);
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
      name: candidateInfos.name,
      firstname: candidateInfos.firstname,
      birthday: candidateInfos.birthday,
      street: candidateInfos.street,
      city: candidateInfos.city,
      postalAdress: candidateInfos.postalAdress,
      mail: candidateInfos.mail,
      picture: candidateInfos.picture,
      resume: candidateInfos.resume,
    };

    const updatedValues = {
      name,
      firstname,
      birthday,
      street,
      city,
      postalAdress: postalAddress,
      mail,
      picture,
      resume,
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
      .put(`/candidates/${userId}`, formData)

      .then((res) => {
        console.warn(res);
        setReload(!reload);
      })
      .catch((err) => {
        console.error(err);
      });
    console.warn("Registraichn Data:", formData);
  };

  console.warn("candidate :", candidateInfos);
  console.warn("candidate user :", user.firstname);
  return (
    <div className="users-informations_container">
      <div>
        <h1>Mes informations</h1>
        <div>
          <h2>Photo de profil</h2>
          <img
            className="users-informations_picture"
            src={`${urlFile}${candidateInfos?.picture}`}
            alt=""
          />
          <label className="form-label">
            Photo :
            <input
              type="file"
              onChange={handlePictureSelect}
              className="form-input"
            />
            <span
              className={validePictureType ? "signup-hide" : "signup-invalid"}
            >
              Merci de choisir un fichier .JPEG/JPG/PNG
            </span>
          </label>
          <label className="form-label">
            CV :
            <input
              type="file"
              onChange={handleResumeSelect}
              className="form-input"
            />
            <span
              className={valideResumeType ? "signup-hide" : "signup-invalid"}
            >
              Merci de choisir un fichier .PDF
            </span>
          </label>
        </div>
        <div>
          <h2>Genre</h2>
          <ul>
            <li>Homme</li>
            <li>Femme</li>
            <li>Autres</li>
          </ul>
        </div>
        <div>
          <div>
            <form onSubmit={handleSubmit}>
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
                Date de naissance : {formattedBirthday}
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Code Postal :
                <input
                  type="text"
                  value={postalAddress}
                  onChange={(e) => setPostalAddress(e.target.value)}
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
              <button type="submit">Valider</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersInformations;
