const AbstractManager = require("./AbstractManager");

class CandidateManager extends AbstractManager {
  constructor() {
    super({ table: "candidate" });
  }

  insert(candidate) {
    return this.database.query(
      `insert into ${this.table} (name, firstname, birthday, street, city, postalAdress, mail, phone, password, jobSeeker, picture, resume, contactPreference) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        candidate.name,
        candidate.firstname,
        candidate.birthday,
        candidate.street,
        candidate.city,
        candidate.postalAdress,
        candidate.mail,
        candidate.phone,
        candidate.password,
        candidate.jobSeeker,
        candidate.picture,
        candidate.resume,
        candidate.contactPreference,
      ]
    );
  }

  findByMail(mail) {
    return this.database.query(
      `select id, name, firstname, password from ${this.table} where mail = ? `,
      [mail]
    );
  }

  update(candidate) {
    return this.database.query(`update ${this.candidate} set ? where id = ?`, [
      candidate,
      candidate.id,
    ]);
  }

  find(id) {
    return this.database.query(
      `select id, name, firstname, birthday, street, city, postalAdress, mail, phone, jobSeeker, picture, resume, contactPreference  from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(
      `select id, name, firstname, birthday, street, city, postalAdress, mail, phone, jobSeeker, picture, resume, contactPreference from  ${this.table}`
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = CandidateManager;
