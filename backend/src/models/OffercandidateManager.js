const AbstractManager = require("./AbstractManager");

class OffercandidateManager extends AbstractManager {
  constructor() {
    super({ table: "offer_candidate" });
  }

  candidateWithStatus(status, candidateId) {
    return this.database.query(
      ` SELECT c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
  c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference,
  c.gender, oc.valide, COUNT(oc.offerId) AS likeCount, GROUP_CONCAT(oc.offerId) AS likeOfferIds
  FROM ${this.table} oc
  JOIN candidate c ON c.id = oc.candidateId
  WHERE oc.valide = ? and c.id = ?
  GROUP BY c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
  c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference, c.gender, oc.valide;`,
      [status, candidateId]
    );
  }

  countAllCandidates() {
    return this.database.query(
      `
      SELECT c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
      c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference,
      c.gender, oc.valide, COUNT(oc.offerId) AS likeCount, GROUP_CONCAT(oc.offerId) AS likeOfferIds
      FROM ${this.table} oc
      RIGHT JOIN candidate c ON c.id = oc.candidateId
      GROUP BY c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
      c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference, c.gender, oc.valide
  
      `
    );
  }

  countOfferLikes(status) {
    return this.database.query(
      `
      SELECT c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
      c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference,
      c.gender, oc.valide, COUNT(oc.offerId) AS likeCount, GROUP_CONCAT(oc.offerId) AS likeOfferIds
      FROM ${this.table} oc
      JOIN candidate c ON c.id = oc.candidateId
      WHERE oc.valide = ?
      GROUP BY c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
      c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference, c.gender, oc.valide;`,
      [status]
    );
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

  editOfferStatusWithCandidate(valide, status, candidateId, offerId) {
    return this.database.query(
      `UPDATE ${this.table}
      SET valide = ?
      WHERE valide = ? AND candidateId = ? AND offerId = ?  ;
      `,
      [valide, status, candidateId, offerId]
    );
  }
}

module.exports = OffercandidateManager;
