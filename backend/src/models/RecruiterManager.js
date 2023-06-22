/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class RecruiterManager extends AbstractManager {
  constructor() {
    super({ table: "recruiter" });
  }

  find(id) {
    return this.database.query(
      `select 
      name,
      firstname,
      mail,
      phone,
      birthday,
      street,
      city,
      postalCode,
      valide,
      picture,
      compagny_id,
      gender,
      id from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(`select
    name,
    firstname,
    mail,
    phone,
    birthday,
    street,
    city,
    postalCode,
    valide,
    picture,
    compagny_id,
    id from  ${this.table}`);
  }

  insert(recruiter) {
    return this.database.query(
      `insert into ${this.table} (
        name,
        firstname,
        mail,
        phone,
        birthday,
        password,
        street,
        city,
        postalCode,
        picture,
        compagny_id,
        gender) values (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        recruiter.name,
        recruiter.firstname,
        recruiter.mail,
        recruiter.phone,
        recruiter.birthday,
        recruiter.password,
        recruiter.street,
        recruiter.city,
        recruiter.postalCode,
        recruiter.picture,
        recruiter.compagny_id,
        recruiter.gender,
      ]
    );
  }

  updatePicture(picture, userId) {
    return this.database.query(
      `update ${this.table} set  picture = ? where id = ?`,
      [picture, userId]
    );
  }

  getRecruiterByLogin(login) {
    return this.database
      .query(
        `SELECT id, name, firstname, password from ${this.table} WHERE mail = ?`,
        [login]
      )
      .then(([result]) => result)
      .catch((err) => {
        console.warn(err);
        return false;
      });
  }

  findById(id) {
    return this.database.query(
      `select id, name, firstname, password from ${this.table} where id = ? `,
      [id]
    );
  }

  update(recruiter) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      recruiter,
      recruiter.id,
    ]);
  }

  updatePassword(password, userId) {
    return this.database.query(
      `update ${this.table} set password = ? where id = ?`,
      [password, userId]
    );
  }

  delete(recruiterid) {
    return this.database.query(`delete from ${this.table} where id = ?`, [
      recruiterid,
    ]);
  }

  deleteadmin(recruiterid) {
    return this.database.query(`delete from ${this.table} where id = ?`, [
      recruiterid,
    ]);
  }
}

module.exports = RecruiterManager;
