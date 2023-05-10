/* eslint-disable lines-between-class-members */
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
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      candidate,
      candidate.id,
    ]);
  }

  updatePicture(picture, userId) {
    return this.database.query(
      `update ${this.table} set  picture = ? where id = ?`,
      [picture, userId]
    );
  }

  updateResume(resume, userId) {
    return this.database.query(
      `update ${this.table} set  resume = ? where id = ?`,
      [resume, userId]
    );
  }

  updateFiles(resume, picture, userId) {
    return this.database.query(
      `update ${this.table} set resume = ?, picture = ? where id = ?`,
      [resume, picture, userId]
    );
  }

  find(id) {
    return this.database.query(
      `select id, name, firstname, birthday, street, city, postalAdress, mail, phone, jobSeeker, picture, resume, contactPreference,gender  from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(
      `select id, name, firstname, birthday, street, city, postalAdress, mail, phone, jobSeeker, picture, resume, contactPreference,gender from  ${this.table}`
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  findFiles(id) {
    return this.database.query(
      `select id, picture, resume from ${this.table} where id = ?`,
      [id]
    );
  }

  likeOffer(candidateId, offerId) {
    return this.database.query(
      `insert into offer_candidate(candidateId, offerId) values(?,?)`,
      [candidateId, offerId]
    );
  }
  findLike(candidateId, offerId) {
    return this.database.query(
      `select * from offer_candidate where candidateId=? and offerId=?`,
      [candidateId, offerId]
    );
  }
  deleteLike(candidateId, offerId) {
    return this.database.query(
      `delete from offer_candidate where candidateId=? and offerId=?`,
      [candidateId, offerId]
    );
  }
}

module.exports = CandidateManager;
