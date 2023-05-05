const AbstractManager = require("./AbstractManager");

class OfferManager extends AbstractManager {
  constructor() {
    super({ table: "offer" });
  }

  find(id) {
    return this.database.query(`select *  from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAll(page, limit) {
    const offset = (page - 1) * limit;

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
  LIMIT ? OFFSET ? 

`,
      [limit, offset]
    );
  }

  findAllJobs(page, limit, filter) {
    const offset = (page - 1) * limit;

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
  LIMIT ? OFFSET ? 

`,
      [filter, limit, offset]
    );
  }

  findAllRemote(page, limit, filter) {
    const offset = (page - 1) * limit;

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
  WHERE o.RemoteId = ?
  LIMIT ? OFFSET ? 

`,
      [filter, limit, offset]
    );
  }

  findAllContract(page, limit, filter) {
    const offset = (page - 1) * limit;

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
  LIMIT ? OFFSET ? 

`,
      [filter, limit, offset]
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
}

module.exports = OfferManager;
