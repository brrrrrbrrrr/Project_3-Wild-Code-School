const AbstractManager = require("./AbstractManager");

class OffercandidateManager extends AbstractManager {
  constructor() {
    super({ table: "offer_candidate" });
  }

  candidateWithStatus(status, candidateId) {
    return this.database.query(
      ` SELECT c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
  c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference,
  c.gender, oc.offer_statusId, COUNT(oc.offerId) AS likeCount, GROUP_CONCAT(oc.offerId) AS likeOfferIds
  FROM ${this.table} oc
  JOIN candidate c ON c.id = oc.candidateId
  WHERE oc.offer_statusId = ? and c.id = ?
  GROUP BY c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
  c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference, c.gender, oc.offer_statusId;`,
      [status, candidateId]
    );
  }

  countAllCandidates() {
    return this.database.query(
      `
      SELECT c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
      c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference,
      c.gender, oc.offer_statusId, COUNT(oc.offerId) AS likeCount, GROUP_CONCAT(oc.offerId) AS likeOfferIds
      FROM ${this.table} oc
      RIGHT JOIN candidate c ON c.id = oc.candidateId
      GROUP BY c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
      c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference, c.gender, oc.offer_statusId
  
      `
    );
  }

  countOfferLikes(status) {
    return this.database.query(
      `
      SELECT c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
      c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference,
      c.gender, oc.offer_statusId, COUNT(oc.offerId) AS likeCount, GROUP_CONCAT(oc.offerId) AS likeOfferIds
      FROM ${this.table} oc
      JOIN candidate c ON c.id = oc.candidateId
      WHERE oc.offer_statusId = ?
      GROUP BY c.id, c.name, c.firstname, c.birthday, c.street, c.city, c.postalCode,
      c.mail, c.phone, c.jobSeeker, c.picture, c.resume, c.contactPreference, c.gender, oc.offer_statusId;`,
      [status]
    );
  }

  editOfferStatusWithCandidate(valide, status, candidateId, offerId) {
    return this.database.query(
      `UPDATE ${this.table}
      SET offer_statusId = ?
      WHERE offer_statusId = ? AND candidateId = ? AND offerId = ?  ;
      `,
      [valide, status, candidateId, offerId]
    );
  }
}

module.exports = OffercandidateManager;
