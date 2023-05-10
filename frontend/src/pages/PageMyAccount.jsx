/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import UsersInformations from "../components/usersInformations/UsersInformations";
import "./PageMyAccount.css";
import AccountSettings from "../components/accountSettings/AccountSettings";

function PageMyAccount() {
  const [myAccount, setMyAccount] = useState(true);
  const [myParam, setMyParam] = useState(false);
  const [selectForm, setSelectForm] = useState("myAccount");
  const { user } = useUser();

  const handleMyAccount = () => {
    setSelectForm("myAccount");
    setMyAccount(true);
    setMyParam(false);
  };

  const handleParam = () => {
    setSelectForm("myParam");
    setMyParam(true);
    setMyAccount(false);
  };

  return (
    <div className="pagemyaccount-container">
      <div className="pagemyaccount-container_btn">
        <button
          className={`select-form-btn ${myAccount ? "select-btn-active" : ""}`}
          type="button"
          onClick={handleMyAccount}
        >
          Mon compte
        </button>
        <button
          className={`select-form-btn ${myParam ? "select-btn-active" : ""}`}
          type="button"
          onClick={handleParam}
        >
          Paramètre
        </button>
      </div>
      {selectForm === "myAccount" ? (
        <UsersInformations user={user} />
      ) : selectForm === "myParam" ? (
        <AccountSettings />
      ) : (
        ""
      )}
    </div>
  );
}

export default PageMyAccount;
