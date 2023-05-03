const AbstractManager = require("./AbstractManager");

class CompagnyManager extends AbstractManager {
  constructor() {
    super({ table: "compagny" });
  }

  find(id) {
    return this.database.query(
      `select 
      siretNumber,
      name,
      mail,
      phone,
      Valide,
      Logo,
      id from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(`select
    siretNumber,
    name,
    mail,
    phone,
    Valide,
    Logo,
    id from  ${this.table}`);
  }

  insertCompagny(compagny) {
    return this.database.query(
      `insert into ${this.table} (siretNumber, name, mail, phone, password, Valide, logo) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        compagny.siretNumber,
        compagny.name,
        compagny.mail,
        compagny.phone,
        compagny.password,
        compagny.Valide,
        compagny.Logo,
      ]
    );
  }

  updateCompagny(compagny) {
    return this.database.query(
      `update set siretNumber = ?, name = ?, mail = ?, phone = ?, password = ?, Valide = ?, logo = ? where id = ?`,
      [
        compagny.siretNumber,
        compagny.name,
        compagny.mail,
        compagny.phone,
        compagny.password,
        compagny.Valide,
        compagny.Logo,
        compagny.id,
      ]
    );
  }

  updateFiles(logo, userId) {
    return this.database.query(
      `update ${this.table} set Logo = ? where id = ?`,
      [logo, userId]
    );
  }

  verifyCompagny(mail) {
    return this.database.query(
      `select * from ${this.table} where mail = ?,`[mail]
    );
  }

  getUserByLogin = (login) => {
    return this.database
      .query(`SELECT name, password from ${this.table} WHERE mail=?`, [login])
      .then(([result]) => result)
      .catch((err) => {
        console.warn(err);
        return false;
      });
  };
}

module.exports = CompagnyManager;
