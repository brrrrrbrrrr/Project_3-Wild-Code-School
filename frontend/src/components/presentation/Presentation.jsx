/* eslint-disable react/self-closing-comp */
import React from "react";
import "./Presentation.css";
import accueil1 from "../../assets/accueil-1.jpg";
import accueil2 from "../../assets/accueil-2.jpg";

function Presentation() {
  return (
    <div className="toto">
      <div className="presentation-container">
        <h1 className="title">Externatic</h1>
        <div className="presentation-bg_container">
          <div className="presentation-bg_column">
            <div>
              <div className="test">
                <img
                  src={accueil1}
                  className="bg-accueil1"
                  alt="Femme au bord de la mer"
                />

                <p className="paragraph2">
                  Ici, chaque visage a un nom. Nos consultants ne sont pas des
                  robots, il n’y a pas d’algorithmes, de profils ou de liens
                  automatisés.
                </p>
              </div>
            </div>

            <img
              src={accueil2}
              className="bg-accueil2"
              alt="Homme avec des chêvres"
            />
            <p className="paragraph1">
              Externatic est un cabinet de recrutement informatique qui répond
              aux vrais besoins de vraies personnes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presentation;
