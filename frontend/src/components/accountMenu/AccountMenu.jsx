/* eslint-disable react/prop-types */
import React from "react";
import "./AccountMenu.css";
import { useNavigate, NavLink } from "react-router-dom";

import { useUser } from "../../contexts/UserContext";

function AccountMenu({ setOpenMenuBurger, openMenuBurger }) {
  const { user, setUserParam } = useUser();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpenMenuBurger(!openMenuBurger);
    setUserParam({});
  };

  const handleLogout = () => {
    setTimeout(() => {
      navigate("/");

      setTimeout(() => {
        window.location.reload();
      }, 250);
    }, 500);
  };

  return (
    <div className="account-menu_container">
      <ul className="account-menu_ul">
        {user?.userType === "recruiters" || user?.userType === "candidates" ? (
          <li className="account-menu_li">
            <NavLink to="/my-offers">Mes offres</NavLink>
          </li>
        ) : (
          ""
        )}

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
        {user?.userType === "compagny" && (
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
          <NavLink onClick={handleLogout}>Déconnexion</NavLink>
        </li>
        <span className="account-menu-close">X</span>
      </ul>
    </div>
  );
}

export default AccountMenu;
