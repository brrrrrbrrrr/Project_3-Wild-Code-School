const AbstractManager = require("./AbstractManager");

class OffercandidateManager extends AbstractManager {
  constructor() {
    super({ table: "offer_candidate" });
  }

  findAllOffersStatus(status) {
    return this.database.query(
      `SELECT c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
    c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference,
    c.gender, oc.offerId, oc.valide as valideLike
FROM ${this.table} oc
JOIN candidate c ON c.id = oc.candidateId
WHERE oc.valide = ?;`,
      [status]
    );
  }

  findOfferStatus(status, offerId) {
    return this.database.query(
      `SELECT c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
    c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference,
    c.gender, oc.offerId, oc.valide as valideLike
FROM ${this.table} oc 
JOIN candidate c ON c.id = oc.candidateId
WHERE oc.valide = ? AND oc.offerId = ? ;`,
      [status, offerId]
    );
  }

  findOfferStatusWithCandidate(status, offerId, candidateId) {
    return this.database.query(
      `SELECT c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
    c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference,
    c.gender, oc.offerId, oc.valide as valideLike
FROM ${this.table} oc 
JOIN candidate c ON c.id = oc.candidateId
WHERE oc.valide = ? AND oc.offerId = ? and c.id = ?;`,
      [status, offerId, candidateId]
    );
  }

  editOfferStatusWithCandidate(valide, status, offerId, candidateId) {
    return this.database.query(
      `UPDATE ${this.table}
      SET valide = ?
      WHERE valide = ? AND offerId = ? AND candidateId = ?;
      `,
      [valide, status, offerId, candidateId]
    );
  }
}

module.exports = OffercandidateManager;
