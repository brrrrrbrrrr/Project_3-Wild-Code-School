import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import UsersInformations from "../components/usersInformations/UsersInformations";
import "./PageMyAccount.css";
import AccountSettings from "../components/accountSettings/AccountSettings";
import NotFound from "../components/notfound/NotFound";
import CompagnyInformation from "../components/compagnyInformation/CompagnyInformations";

function PageMyAccount() {
  const [myAccount, setMyAccount] = useState(true);
  const [myParam, setMyParam] = useState(false);
  const [selectForm, setSelectForm] = useState("myAccount");
  const { user, userParam, setNewName, newName } = useUser();

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

  let content = null;

  if (selectForm === "myAccount") {
    if (user.userType === "compagny" && userParam.userType === "recruiters") {
      content = (
        <UsersInformations
          user={user}
          userParam={userParam}
          setNewName={setNewName}
          newName={newName}
        />
      );
    } else if (user.userType === "compagny") {
      content = <CompagnyInformation user={user} setNewName={setNewName} />;
    } else {
      content = (
        <UsersInformations
          user={user}
          userParam={userParam}
          setNewName={setNewName}
          newName={newName}
        />
      );
    }
  } else if (selectForm === "myParam") {
    content = <AccountSettings user={user} userParam={userParam} />;
  }

  return user ? (
    <div className="pagemyaccount-container">
      <div className="pagemyaccount-container_btn">
        <button
          className={`select-form-btn ${myAccount ? "select-btn-active" : ""}`}
          type="button"
          onClick={handleMyAccount}
        >
          Mon compte
        </button>
        {user.userType === "compagny" && userParam.userType === "recruiters" ? (
          ""
        ) : (
          <button
            className={`select-form-btn ${myParam ? "select-btn-active" : ""}`}
            type="button"
            onClick={handleParam}
          >
            Paramètres
          </button>
        )}
      </div>
      <div>{content}</div>
    </div>
  ) : (
    <NotFound />
  );
}

export default PageMyAccount;
