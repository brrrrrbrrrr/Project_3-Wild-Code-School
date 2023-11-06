/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable object-shorthand */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useState, useRef } from "react";
import AccountMenu from "../accountMenu/AccountMenu";
import Account from "../account/Account";
import { useUser } from "../../contexts/UserContext";

const NavBar = () => {
  const [openMenuBurger, setOpenMenuBurger] = useState(false);
  const [activeAccountMenu, setActiveAccountMenu] = useState(false);
  const cbRef = useRef();
  const toggleMenu = () => {
    setOpenMenuBurger(!openMenuBurger);
    cbRef.current.checked = !openMenuBurger;
  };

  const handleClick = () => {
    setActiveAccountMenu(!activeAccountMenu);
  };

  const { user, newName, userParam } = useUser();

  return (
    <nav>
      <div className="navlink-container">
        <div className="burger-container">
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="toggle-btn"
              onClick={toggleMenu}
              ref={cbRef}
            />
            <div className="burger-menu" />
          </div>
        </div>
        <ul className={openMenuBurger ? "menu-display menu" : "menu"}>
          <li className="nav-bar_title">
            <NavLink className="navlink-menu" onClick={toggleMenu} to="/">
              Accueil
            </NavLink>
          </li>

          <li className="nav-bar_title">
            <NavLink className="navlink-menu" onClick={toggleMenu} to="/offer">
              Offres d'emploi
            </NavLink>
          </li>
          <li className="nav-bar_title">
            <NavLink
              onClick={toggleMenu}
              to="/connect"
              className={user ? "connexion-hide" : ""}
            >
              Se connecter
            </NavLink>
          </li>
          <ul
            className={
              user
                ? "menu-account_ul-container"
                : "menu-account_ul-container-hide"
            }
            onClick={handleClick}
          >
            <Account user={user} newName={newName} userParam={userParam} />
            <li>
              {activeAccountMenu ? (
                <AccountMenu
                  openMenuBurger={openMenuBurger}
                  setOpenMenuBurger={setOpenMenuBurger}
                />
              ) : (
                ""
              )}
            </li>
          </ul>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
