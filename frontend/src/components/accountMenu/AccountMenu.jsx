/* eslint-disable react/prop-types */
import React from "react";
import "./AccountMenu.css";
import { NavLink } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function AccountMenu({ setOpenMenuBurger, openMenuBurger }) {
  const { user, setUserParam } = useUser();

  const toggleMenu = () => {
    setOpenMenuBurger(!openMenuBurger);
    setUserParam({});
  };

  return (
    <div className="account-menu_container">
      <ul className="account-menu_ul">
        <li className="account-menu_li">
          <NavLink>Notifications</NavLink>
        </li>
        <li className="account-menu_li">
          <NavLink to="/my-offers">Ajouter une offre</NavLink>
        </li>
        {user?.userType === "recruiters" || user?.userType === "candidates" ? (
          <li className="account-menu_li">
            <NavLink to="/my-offers">Mes offres</NavLink>
          </li>
        ) : (
          ""
        )}
        <li className="account-menu_li">
          <NavLink>Entretiens</NavLink>
        </li>

        <li className="account-menu_li">
          <NavLink to="/messages">Messagerie</NavLink>
        </li>
        <li className="account-menu_li">
          <NavLink
            onClick={toggleMenu}
            to="/my-account"
            className={({ isActive }) =>
              isActive ? "active-menu_account" : ""
            }
          >
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
        {user?.userType === "consultants" && user?.superAdmin !== 1 ? (
          <li className="account-menu_li">
            <NavLink
              className="navlink-menu"
              onClick={toggleMenu}
              to="/validate-offer"
            >
              Validation des offres
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {user?.superAdmin && (
          <li className="account-menu_li">
            <NavLink
              className="navlink-menu"
              onClick={toggleMenu}
              to="/superadmin"
            >
              Admin
            </NavLink>
          </li>
        )}
        <li className="account-menu_li">
          <NavLink>Déconnexion</NavLink>
        </li>
        <span className="account-menu-close">X</span>
      </ul>
    </div>
  );
}

export default AccountMenu;
