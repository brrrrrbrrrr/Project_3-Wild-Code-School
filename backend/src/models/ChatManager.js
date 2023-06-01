const AbstractManager = require("./AbstractManager");

class ChatManager extends AbstractManager {
  constructor() {
    super({ table: "message" });
  }

  getAllMessages(id) {
    return this.database.query(`select * from ${this.table}`, [id]);
  }

  insert(message) {
    return this.database.query(
      `insert into ${this.table} (consultantId, person1REF, candidateId, person2REF, date, hour, message) values (?,?,?,?,?,?,?)`,
      [
        message.consultantId,
        message.person1REF,
        message.candidateId,
        message.person2REF,
        message.date,
        message.hour,
        message.message,
      ]
    );
  }

  // update(message) {
  //   return this.database.query(
  //     `update ${this.table} set title = ? where id = ?`,
  //     [message.title, message.id]
  //   );
  // }
}

module.exports = ChatManager;
