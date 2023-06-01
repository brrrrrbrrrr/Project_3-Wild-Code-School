/* eslint-disable object-shorthand */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";

const NavBar = () => {
  const [openMenuBurger, setOpenMenuBurger] = useState(false);
  const toggleMenu = () => {
    setOpenMenuBurger(!openMenuBurger);
  };

  const { user } = useUser();
  console.warn(user);

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
            <NavLink onClick={toggleMenu} to="/messages">
              Messenger
            </NavLink>
          </li>
          <li>
            {user?.superAdmin ? (
              <NavLink onClick={toggleMenu} to="/superadmin">
                Admin
              </NavLink>
            ) : (
              ""
            )}
          </li>
          <li>
            <NavLink onClick={toggleMenu} to="/">
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink onClick={toggleMenu} to="/offer">
              Offres d'emploi
            </NavLink>
          </li>
          <li>
            <NavLink onClick={toggleMenu} to="/propos">
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
            <NavLink
              // to="/admin"
              className={user ? "account-link" : "account-link_hide"}
            >
              {user && (user.firstname ? `${user.firstname}` : `${user.name}`)}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
