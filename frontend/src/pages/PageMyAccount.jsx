import React from "react";
import { useUser } from "../contexts/UserContext";
import UsersInformations from "../components/usersInformations/UsersInformations";
import "./PageMyAccount.css";

function PageMyAccount() {
  const { user } = useUser();

  return (
    <div>
      <div className="pagemyaccount-container">
        <button type="button" className="pagemyaccount-btn">
          Mon compte
        </button>
        <button type="button" className="pagemyaccount-btn">
          Paramètre
        </button>
      </div>

      <UsersInformations user={user} />
    </div>
  );
}

export default PageMyAccount;
