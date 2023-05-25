import React, { useState, useEffect } from "react";
import useApi from "../../services/useApi";
import "./InfosCompany.css";

import { useUser } from "../../contexts/UserContext";

function InfosCompany() {
  const api = useApi();
  const [userData, setUserData] = useState(null);
  const { user } = useUser();
  const urlFile = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    const urlUserData = `${user?.userType}/${user?.id}`;
    api.get(urlUserData).then((res) => {
      setUserData(res.data);
    });
  }, []);

  return (
    <div className="infos-compagny_container">
      <div className="infos-compagny_column">
        <div className="infos-compagny_logo-container">
          {userData && (
            <img
              className="infos-compagny_logo"
              src={`${urlFile}/${userData?.Logo}`}
              alt=""
            />
          )}
          <div className="borded-img" />
          <div className="borded-img2" />
        </div>
        <h1 className="infos-compagny_h1">{userData?.name}</h1>
      </div>
    </div>
  );
}

export default InfosCompany;
