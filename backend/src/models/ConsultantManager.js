const AbstractManager = require("./AbstractManager");

class ConsultantManager extends AbstractManager {
  constructor() {
    super({ table: "consultant" });
  }

  insert(consultant) {
    return this.database.query(
      `insert into ${this.table} (name, firstname, mail, phone, birthday, password, street, city, postalCode, picture, superAdmin) values (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        consultant.name,
        consultant.firstname,
        consultant.mail,
        consultant.phone,
        consultant.birthday,
        consultant.hashedPassword,
        consultant.street,
        consultant.city,
        consultant.postalCode,
        consultant.picture,
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

  getUserWithPassword(mail) {
    return this.database.query(
      `select id, password, superAdmin from ${this.table} where mail = ?`,
      [mail]
    );
  }
}

module.exports = ConsultantManager;
