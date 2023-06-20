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

  findById(id) {
    return this.database.query(
      `select id, name, password from ${this.table} where id = ? `,
      [id]
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

  updatePassword(password, userId) {
    return this.database.query(
      `update ${this.table} set password = ? where id = ?`,
      [password, userId]
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

  findvalid(valid) {
    return this.database.query(
      `select
    siretNumber,
    name,
    mail,
    phone,
    Valide,
    Logo,
    id from  ${this.table} WHERE Valide=?`,
      [valid]
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

  updatevalid(compagnyid) {
    return this.database.query(
      `update ${this.table} set Valide = 1 where id = ?`,
      [compagnyid]
    );
  }

  deleteadmin(compagnyid) {
    return this.database.query(`delete from ${this.table} where id = ?`, [
      compagnyid,
    ]);
  }
}

module.exports = CompagnyManager;
