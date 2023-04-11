/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class RecruitmentManager extends AbstractManager {
  constructor() {
    super({ table: "recruteur" });
  }

  insert(recruteur) {
    return this.database.query(
      `insert into ${this.table} (Entreprise_id,
      Nom,
      Prenom,
      Email,
      Telephone,
      Date_naissance,
      Mot_de_passe,
      Adresse_rue,
      Adresse_ville,
      Adresse_CP,
      Valide,
      Photo) values (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        recruteur.Entreprise_id,
        recruteur.Nom,
        recruteur.Prenom,
        recruteur.Email,
        recruteur.Telephone,
        recruteur.Date_naissance,
        recruteur.Mot_de_passe,
        recruteur.Adresse_rue,
        recruteur.Adresse_ville,
        recruteur.Adresse_CP,
        recruteur.Valide,
        recruteur.Photo,
      ]
    );
  }

  login(login) {
    return this.database.query("SELECT * FROM user WHERE login=?", [login]);
  }

  update(recruteur) {
    return this.database.query(`update ${this.recruteur} set ? where id = ?`, [
      recruteur,
      recruteur.id,
    ]);
  }
}

module.exports = RecruitmentManager;
