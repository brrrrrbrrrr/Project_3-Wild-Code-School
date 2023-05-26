const AbstractManager = require("./AbstractManager");

class ConsultantManager extends AbstractManager {
  constructor() {
    super({ table: "consultant" });
  }

  findAll() {
    return this.database.query(
      `select id, name,firstname, mail, phone, birthday, street, city, postalCode, picture, superAdmin from  ${this.table}`
    );
  }

  find(id) {
    return this.database.query(
      `select id, name,firstname, mail, phone, birthday, street, city, postalCode, picture, gender, superAdmin  from  ${this.table} where id = ?`,
      [id]
    );
  }

  insert(consultant) {
    return this.database.query(
      `insert into ${this.table} (name, firstname, mail, phone, birthday, password, street, city, postalCode, picture,gender, superAdmin) values (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        consultant.name,
        consultant.firstname,
        consultant.mail,
        consultant.phone,
        consultant.birthday,
        consultant.password,
        consultant.street,
        consultant.city,
        consultant.postalCode,
        consultant.picture,
        consultant.gender,
        consultant.superAdmin,
      ]
    );
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }

  updatePicture(picture, userId) {
    return this.database.query(
      `update ${this.table} set  picture = ? where id = ?`,
      [picture, userId]
    );
  }

  getUserWithPassword(mail) {
    return this.database.query(
      `SELECT id, name, firstname, password , superAdmin from ${this.table} where mail = ?`,
      [mail]
    );
  }
}

module.exports = ConsultantManager;
