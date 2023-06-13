import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import useApi from "../../services/useApi";
import "../usersInformations/UsersInformations.css";

function CompagnyInformations({ user, setNewName }) {
  const [name, setName] = useState("");
  const [siretNumber, setSiretNumber] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [userInfos, setUserInfos] = useState({});
  const [validMail, setValidMail] = useState(false);

  const [reload, setReload] = useState(0);
  const [logo, setLogo] = useState("");
  const [validLogoType, setValidLogoType] = useState(false);

  const api = useApi();
  const { userType } = user;
  const userId = user.id;
  const MAIL_REDEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const urlFile = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    const result = MAIL_REDEX.test(mail);
    setValidMail(result);
  }, [mail]);

  useEffect(() => {
    api.get(`/${userType}/${userId}`).then((res) => {
      setUserInfos(res.data);
      setName(res.data.name);
      setSiretNumber(res.data.siretNumber);
      setMail(res.data.mail);
      setLogo(res.data.Logo);
      setPhone(res.data.phone);
    });
  }, [reload]);

  function handlePictureSelect(event) {
    const fileLogo = event.target.files[0];

    // Vérifie que le fichier est un jpeg ou jpg
    if (
      (fileLogo && fileLogo.type === "image/jpeg") ||
      fileLogo.type === "image/jpg" ||
      fileLogo.type === "image/png"
    ) {
      setLogo(fileLogo);
      setValidLogoType(true);
    } else {
      setLogo(null);
      setValidLogoType(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentValues = {
      siretNumber: userInfos.siretNumber,
      name: userInfos.name,
      mail: userInfos.mail,
      phone: userInfos.phone,
      Logo: userInfos.Logo,
    };
    const updatedValues = {
      siretNumber,
      name,
      mail,
      phone,
      Logo: logo,
    };
    const formData = new FormData();

    Object.keys(updatedValues).forEach((key) => {
      if (key === "Logo" && !updatedValues[key]) {
        // Si le champ picture a été laissé vide, on ne l'ajoute pas à FormData
        return;
      }

      if (updatedValues[key] !== currentValues[key]) {
        formData.append(key, updatedValues[key]);
      }
    });
    api
      .put(`/${userType}/${userId}`, formData)
      .then(() => {
        setReload(reload + 1);
        setNewName(name);
        setTimeout(() => {
          setReload(0);
        }, 2000);
      })
      .catch(() => {
        toast.error("Une erreur s'est produite", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return reload > 0 ? (
    <p className="update-succes_p">Mise à jour ...</p>
  ) : (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-signup">
        <div className="Logo-container">
          <div className="Logo-img">
            {userInfos?.Logo && (
              <img
                className="users-informations_picture"
                src={`${urlFile}${userInfos?.Logo}`}
                alt=""
              />
            )}
          </div>
        </div>
        <label className="form-label">
          Logo d'entreprise :
          <input
            type="file"
            onChange={handlePictureSelect}
            className="form-input"
          />
          <span
            className={logo || validLogoType ? "signup-hide" : "signup-invalid"}
          >
            Merci de choisir un fichier .JPEG/JPG/PNG
          </span>
        </label>

        <label className="form-label">
          Nom de l'entreprise :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Numéro de SIRET :
          <input
            type="text"
            value={siretNumber}
            onChange={(e) => setSiretNumber(e.target.value)}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Email :
          <input
            type="text"
            autoComplete="off"
            id="mail"
            aria-invalid={validMail ? "false" : "true"}
            aria-describedby="uidnote"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Téléphone :
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
          />
        </label>

        <div className="form-btn-container">
          <button type="submit" className="form-btn">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}
CompagnyInformations.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
  }).isRequired,

  setNewName: PropTypes.func,
};
CompagnyInformations.defaultProps = {
  setNewName: null,
};

export default CompagnyInformations;
