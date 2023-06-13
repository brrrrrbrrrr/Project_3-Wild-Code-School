import React from "react";
import "./LegalNotice.css";

function LegalNotice() {
  return (
    <div className="legalnotice-container">
      <h2 className="legalnotice-title">Mentions légales</h2>
      <div className="legalnotice-editor">
        <h2>Editeur</h2>
        <h3>Externatic</h3>
        <p>30 rue du vin - 69000 Lyon, France</p>
        <p>Tel. 01 02 03 04 05</p>
        <h3 className="legalnotice-director">Directeur de la publication :</h3>
        <p>Monsieur Casimir Durand, fondateur et CEO</p>
      </div>
      <div className="legalnotice-host">
        <h2>Hébergeur</h2>
        <h3>Externatic</h3>
        <p>30 rue du vin - 69000 Lyon, France</p>
        <p>Tel. 01 02 03 04 05</p>
      </div>
    </div>
  );
}

export default LegalNotice;
