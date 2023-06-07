const AbstractManager = require("./AbstractManager");

class ChatManager extends AbstractManager {
  constructor() {
    super({ table: "message" });
  }

  getAllMessages(offerId, candidateId) {
    return this.database.query(
      `select consultant.id, consultant.name, consultant.firstname, consultant.picture,
       message.message, message.date, message.hour, candidate.picture as pictureCan,
        offer.id, message.candidateAutor, message.id as messageId
from message
inner join candidate on message.candidateId = candidate.id
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

  getContact(offerId) {
    return this.database.query(
      `SELECT DISTINCT c.name, c.firstname, c.picture, candidateId 
      from message
      join candidate as c
      on message.candidateId = c.id where message.offerId = ?`,
      [offerId]
    );
  }

  delete(offerId, messageId) {
    return this.database.query(
      `DELETE FROM ${this.table} 
      where offerId = ?
      and id=?`,
      [offerId, messageId]
    );
  }
}

module.exports = ChatManager;
