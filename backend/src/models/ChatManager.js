const AbstractManager = require("./AbstractManager");

class ChatManager extends AbstractManager {
  constructor() {
    super({ table: "message" });
  }

  getAllMessages() {
    return this.database.query(`select * from ${this.table}`);
  }

  insert(message) {
    return this.database.query(`insert into ${this.table} SET ?`, message);
  }

  // update(message) {
  //   return this.database.query(
  //     `update ${this.table} set title = ? where id = ?`,
  //     [message.title, message.id]
  //   );
  // }
}

module.exports = ChatManager;
