const AbstractManager = require("./AbstractManager");

class OfferManager extends AbstractManager {
  constructor() {
    super({ table: "offer" });
  }

  find(id) {
    return this.database.query(
      `select offer.*, city.name as cityName, city.postalCode as postalCode, contrat.type as contratType, compagny.Logo, recruiter.postalCode as recruiterPostalCode,
       consultant.picture as consultantPicture, consultant.firstname as consultantFirstname, consultant.name as consultantName
      from  ${this.table} 
      join city on city.id=offer.cityId 
      join contrat on contrat.id=offer.contratId 
      join recruiter on recruiter.id=offer.recruiterId
      join compagny on compagny.id =recruiter.compagny_id
      join consultant on consultant.id=offer.consultantId 
      where offer.id = ?`,
      [id]
    );
  }

  findAll(page, limit) {
    const offset = (page - 1) * limit;

    return this.database.query(
      `
  SELECT o.id, o.salary, o.teamPicture, o.jobOfferPresentation, o.desiredProfile, o.recruitmentProcess, o.numberOfEmployees, o.jobTitleDetails, c.name AS city_name, co.Logo, ct.type AS contract_type, j.name AS job_title, re.type AS remote_type, offer_candidate.candidateId
  FROM offer AS o
  JOIN city AS c ON c.id = o.cityId
  JOIN recruiter AS r ON r.id = o.recruiterId
  JOIN compagny AS co ON co.id = r.compagny_id
  JOIN contrat AS ct ON ct.id = o.contratId
  JOIN job_title as j ON j.id = o.jobTitleId
  JOIN remote AS re ON re.id = o.remoteId
  LEFT JOIN offer_candidate ON o.id = offer_candidate.offerId
  LIMIT ? OFFSET ? 

`,
      [limit, offset]
    );
  }

  findAllJobs(filter) {
    return this.database.query(
      `
  SELECT o.id, o.salary, o.teamPicture, o.jobOfferPresentation, o.desiredProfile, o.recruitmentProcess, o.numberOfEmployees, o.jobTitleDetails, c.name AS city_name, co.Logo, ct.type AS contract_type, j.name AS job_title, re.type AS remote_type
  FROM offer AS o
  JOIN city AS c ON c.id = o.cityId
  JOIN recruiter AS r ON r.id = o.recruiterId
  JOIN compagny AS co ON co.id = r.compagny_id
  JOIN contrat AS ct ON ct.id = o.contratId
  JOIN job_title as j ON j.id = o.jobTitleId
  JOIN remote AS re ON re.id = o.remoteId
  WHERE o.jobTitleId = ?

`,
      [filter]
    );
  }

  findAllRemote(filter) {
    return this.database.query(
      `
  SELECT o.id, o.salary, o.teamPicture, o.jobOfferPresentation, o.desiredProfile, o.recruitmentProcess, o.numberOfEmployees, o.jobTitleDetails, c.name AS city_name, co.Logo, ct.type AS contract_type, j.name AS job_title, re.type AS remote_type
  FROM offer AS o
  JOIN city AS c ON c.id = o.cityId
  JOIN recruiter AS r ON r.id = o.recruiterId
  JOIN compagny AS co ON co.id = r.compagny_id
  JOIN contrat AS ct ON ct.id = o.contratId
  JOIN job_title as j ON j.id = o.jobTitleId
  JOIN remote AS re ON re.id = o.remoteId
  WHERE o.remoteId = ?

`,
      [filter]
    );
  }

  findAllContract(filter) {
    return this.database.query(
      `
  SELECT o.id, o.salary, o.teamPicture, o.jobOfferPresentation, o.desiredProfile, o.recruitmentProcess, o.numberOfEmployees, o.jobTitleDetails, c.name AS city_name, co.Logo, ct.type AS contract_type, j.name AS job_title, re.type AS remote_type
  FROM offer AS o
  JOIN city AS c ON c.id = o.cityId
  JOIN recruiter AS r ON r.id = o.recruiterId
  JOIN compagny AS co ON co.id = r.compagny_id
  JOIN contrat AS ct ON ct.id = o.contratId
  JOIN job_title as j ON j.id = o.jobTitleId
  JOIN remote AS re ON re.id = o.remoteId
  WHERE o.contratID = ?


`,
      [filter]
    );
  }

  findAllFilter() {
    return this.database.query(
      `
  SELECT o.id, o.salary, o.teamPicture, o.jobOfferPresentation, o.desiredProfile, o.recruitmentProcess, o.numberOfEmployees, o.jobTitleDetails, c.name AS city_name, co.Logo, ct.type AS contract_type, j.name AS job_title, re.type AS remote_type
  FROM offer AS o
  JOIN city AS c ON c.id = o.cityId
  JOIN recruiter AS r ON r.id = o.recruiterId
  JOIN compagny AS co ON co.id = r.compagny_id
  JOIN contrat AS ct ON ct.id = o.contratId
  JOIN job_title as j ON j.id = o.jobTitleId
  JOIN remote AS re ON re.id = o.remoteId

`
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  getjobs() {
    return this.database.query(`SELECT * FROM job_title`);
  }

  getremote() {
    return this.database.query(`SELECT * FROM remote`);
  }

  getcontract() {
    return this.database.query(`SELECT * FROM contrat`);
  }

  findLikedCandidateOffers(candidateId) {
    return this.database.query(
      `select offer.* from externatic.offer 
      join externatic.offer_candidate on offer.Id=offer_candidate.offerId where candidateId=?`,
      [candidateId]
    );
  }
}

module.exports = OfferManager;
