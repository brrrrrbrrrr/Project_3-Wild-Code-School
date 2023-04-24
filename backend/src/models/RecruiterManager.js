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

  async insert(recruiter) {
    const recruitment = await this.database.query(
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
        compagny_id) values (?,?,?,?,?,?,?,?,?,?,?)`,
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
      ]
    );
    const {
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
    } = recruitment;
    const recruitmentInfos = {
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
      id: recruitment.insertId,
    };
    return recruitmentInfos;
  }

  getRecruiterByLogin(login) {
    return this.database
      .query("SELECT * FROM recruiter WHERE mail=?", [login])
      .then(([result]) => result)
      .catch((err) => {
        console.warn(err);
        return false;
      });
  }

  update(recruiter) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      recruiter,
      recruiter.id,
    ]);
  }
}

module.exports = RecruiterManager;
