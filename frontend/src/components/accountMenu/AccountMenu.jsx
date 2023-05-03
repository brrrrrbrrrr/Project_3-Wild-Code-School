import React from "react";
import "./AccountMenu.css";

function AccountMenu() {
  return (
    <div className="account-menu_container">
      <ul className="account-menu_ul">
        <li className="account-menu_li">Notifications</li>
        <li className="account-menu_li">Mes offres</li>
        <li className="account-menu_li">Entretiens</li>
        <li className="account-menu_li">Messagerie</li>
        <li className="account-menu_li">Mon compte</li>
        <li className="account-menu_li">Déconnexion</li>
      </ul>
    </div>
  );
}

export default AccountMenu;
