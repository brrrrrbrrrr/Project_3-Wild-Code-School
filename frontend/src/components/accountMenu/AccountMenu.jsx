/* eslint-disable react/prop-types */
import React from "react";
import "./AccountMenu.css";
import { NavLink } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function AccountMenu({ setOpenMenuBurger, openMenuBurger }) {
  const { user } = useUser();
  const userInfo = user;

  const toggleMenu = () => {
    setOpenMenuBurger(!openMenuBurger);
  };

  return (
    <div className="account-menu_container">
      <ul className="account-menu_ul">
        <li className="account-menu_li">
          <NavLink>Notifications</NavLink>
        </li>
        <li className="account-menu_li">
          <NavLink to="/my-offers">Mes offres</NavLink>
        </li>
        <li className="account-menu_li">
          {" "}
          <NavLink to="like">Mes offres (Laurence)</NavLink>
        </li>
        <li className="account-menu_li">
          {" "}
          <NavLink>Entretiens</NavLink>
        </li>
        <li className="account-menu_li">
          {" "}
          <NavLink to="/messages">Messagerie</NavLink>
        </li>
        <li className="account-menu_li">
          {" "}
          <NavLink
            onClick={toggleMenu}
            to="/my-account"
            className={({ isActive }) =>
              isActive ? "active-menu_account" : ""
            }
          >
            {" "}
            Mon compte
          </NavLink>
        </li>
        {userInfo.userType === "compagny" && (
          <li className="account-menu_li">
            <NavLink
              onClick={toggleMenu}
              to="my-recruiters"
              className={({ isActive }) =>
                isActive ? "active-menu_account" : ""
              }
            >
              Mes recruteurs
            </NavLink>
          </li>
        )}
        <li className="account-menu_li">
          {" "}
          <NavLink>Déconnexion</NavLink>
        </li>
        <span className="account-menu-close">X</span>
      </ul>
    </div>
  );
}

export default AccountMenu;
