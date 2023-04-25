/* eslint-disable object-shorthand */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";

const NavBar = () => {
  const [openMenuBurger, setOpenMenuBurger] = useState(false);
  const toggleMenu = () => {
    setOpenMenuBurger(!openMenuBurger);
  };
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
        <ul className={openMenuBurger ? " menuDisplay menu" : "menu"}>
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
            <NavLink onClick={toggleMenu} to="/connect">
              se connecter
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
