const AbstractManager = require("./AbstractManager");

class ConsultantManager extends AbstractManager {
  constructor() {
    super({ table: "consultant" });
  }

  insert(consultant) {
    return this.database.query(
      `insert into ${this.table} (Nom, Prenom, Email, Telephone, Date_naissance, Mot_de_passe, Adresse_rue, Adresse_ville, Adresse_CP, Photo, Super_Admin) values (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        consultant.Nom,
        consultant.Prenom,
        consultant.Email,
        consultant.Telephone,
        consultant.Date_naissance,
        consultant.Mot_de_passe,
        consultant.Adresse_rue,
        consultant.Adresse_ville,
        consultant.Adresse_CP,
        consultant.Photo,
        consultant.Super_Admin,
      ]
    );
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }
}

module.exports = ConsultantManager;
