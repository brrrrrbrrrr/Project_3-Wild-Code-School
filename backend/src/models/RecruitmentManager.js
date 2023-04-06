const AbstractManager = require("./AbstractManager");

class RecruitmentManager extends AbstractManager {
  constructor() {
    super({ table: "recruteur" });
  }

  // insert({ object }) {
  //   return this.database.query(`insert into ${this.recruteur} (?) values (?)`, [
  //     recruteur,
  //   ]);
  // }

  update(recruteur) {
    return this.database.query(`update ${this.recruteur} set ? where id = ?`, [
      recruteur,
      recruteur.id,
    ]);
  }
}

module.exports = RecruitmentManager;
