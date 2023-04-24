import React from "react";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "./Icon";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <p>© 2023 Externatic</p>

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
