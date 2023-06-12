/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable object-shorthand */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";
import AccountMenu from "../accountMenu/AccountMenu";
import Account from "../account/Account";
import { useUser } from "../../contexts/UserContext";

const NavBar = () => {
  const [openMenuBurger, setOpenMenuBurger] = useState(false);
  const [activeAccountMenu, setActiveAccountMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenuBurger(!openMenuBurger);
  };

  const handleClick = () => {
    setActiveAccountMenu(!activeAccountMenu);
  };

  const { user, newName } = useUser();

  return (
    <nav>
      <div className="navlink-container">
        <div className="burger-container">
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="toggle-btn"
              onClick={() => setOpenMenuBurger(!openMenuBurger)}
            />
            <div className="burger-menu" />
          </div>
        </div>
        <ul className={openMenuBurger ? " menu-display menu" : "menu"}>
          <li>
            {user?.userType === "consultants" ? (
              <NavLink
                className="navlink-menu"
                onClick={toggleMenu}
                to="/validate-offer"
              >
                Validation des offres
              </NavLink>
            ) : (
              ""
            )}
          </li>
          <li>
            {user?.superAdmin ? (
              <NavLink
                className="navlink-menu"
                onClick={toggleMenu}
                to="/superadmin"
              >
                Admin
              </NavLink>
            ) : (
              ""
            )}
          </li>
          <li>
            <NavLink className="navlink-menu" onClick={toggleMenu} to="/">
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink-menu" onClick={toggleMenu} to="/offer">
              Offres d'emploi
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink-menu" onClick={toggleMenu} to="/propos">
              A propos
            </NavLink>
          </li>
          <li>
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
            <Account user={user} newName={newName} />
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
