import React from "react";
import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "./Icon";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <p className="footer-title">© 2023 Externatic</p>
      <div className="footer-info">
        <h4>
          <Link to="/legal-notice" className="footer-link">
            Mentions légales
          </Link>
        </h4>
        <h4>
          <Link to="/data-protection" className="footer-link">
            Protection des données
          </Link>
        </h4>
      </div>

      <div className="footer-icons">
        <span>
          <span className="icon">
            <FacebookIcon />
          </span>
          <span className="icon">
            <InstagramIcon />
          </span>
          <span className="icon">
            <TwitterIcon />
          </span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
