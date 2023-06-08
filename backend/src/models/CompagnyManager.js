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

  deleteRcruiter(id) {
    return this.database.query(`delete from recruiter where id = ?`, [id]);
  }

  findMyRecruiters(id) {
    return this.database.query(
      `SELECT name, firstname, mail, phone, birthday, street, city, postalCode, valide, picture, compagny_id, gender, id
      FROM recruiter
      WHERE compagny_id = ?`,
      [id]
    );
  }

  findRecruiter(idRec, idComp) {
    return this.database.query(
      `SELECT name, firstname, mail, phone, birthday, street, city, postalCode, valide, picture, compagny_id, gender, id
      FROM recruiter
      WHERE id = ? AND compagny_id = ?`,
      [idRec, idComp]
    );
  }

  deleteRecruiter(idRec, idComp) {
    return this.database.query(
      `SELECT name, firstname, mail, phone, birthday, street, city, postalCode, valide, picture, compagny_id, gender, id
      FROM recruiter
      WHERE id = ? AND compagny_id = ?`,
      [idRec, idComp]
    );
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
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      compagny,
      compagny.id,
    ]);
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
      .query(`SELECT name,id, password from ${this.table} WHERE mail=?`, [
        login,
      ])
      .then(([result]) => result)
      .catch((err) => {
        console.warn(err);
        return false;
      });
  };
}

module.exports = CompagnyManager;
