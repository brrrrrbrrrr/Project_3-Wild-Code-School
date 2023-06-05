const AbstractManager = require("./AbstractManager");

class ChatManager extends AbstractManager {
  constructor() {
    super({ table: "message" });
  }

  getAllMessages(offerId, candidateId) {
    return this.database.query(
      `select consultant.id, consultant.name, consultant.firstname,
       message.message, message.date, message.hour,
        offer.id, message.candidateAutor 
from message
inner join offer on message.offerId = offer.id
inner join consultant on offer.consultantId = consultant.id
where message.offerId = ?
and message.candidateId = ?;`,
      [offerId, candidateId]
    );
  }

  insert(message) {
    return this.database.query(
      `insert into ${this.table} (candidateId, offerId, date, hour, message, candidateAutor) values (?,?,?,?,?,?)`,
      [
        message.candidateId,
        message.offerId,
        message.date,
        message.hour,
        message.message,
        message.candidateAutor,
      ]
    );
  }
}

module.exports = ChatManager;
