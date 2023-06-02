const AbstractManager = require("./AbstractManager");

class OfferManager extends AbstractManager {
  constructor() {
    super({ table: "offer" });
  }

  insert(offer) {
    return this.database.query(
      `insert into ${this.table} (salary, remoteId, teamPicture, jobOfferPresentation, desiredProfile, 
        recruitmentProcess, numberOfEmployees, jobTitleDetails, cityId, consultantId, recruiterId, contratId, 
        jobTitleId) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        offer.salary,
        offer.remoteId,
        offer.teamPicture,
        offer.jobOfferPresentation,
        offer.desiredProfile,
        offer.recruitmentProcess,
        offer.numberOfEmployees,
        offer.jobTitleDetails,
        offer.cityId,
        offer.consultantId,
        offer.recruiterId,
        offer.contratId,
        offer.jobTitleId,
      ]
    );
  }

  findMyOffers(id) {
    return this.database.query(
      `select offer.*, city.name as city_name, contrat.type as contract_type, compagny.Logo, recruiter.postalCode as recruiterPostalCode,
  consultant.picture as consultantPicture, consultant.firstname as consultantFirstname, consultant.name as consultantName,  job_title.name AS job_title,
  contrat.type as contract_type ,re.type AS remote_type
 from  ${this.table} 
 join city on city.id=offer.cityId 
 JOIN remote AS re ON re.id = offer.remoteId
 join contrat on contrat.id=offer.contratId 
 join recruiter on recruiter.id=offer.recruiterId
 join job_title on job_title.id = offer.jobTitleId
 join compagny on compagny.id =recruiter.compagny_id
 join consultant on consultant.id=offer.consultantId 
 where recruiter.id = ?`,
      [id]
    );
  }

  findMyOfferByIdAndRecruiter(offerId, recruiterId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ? AND recruiterId = ? LIMIT 1`,
      [offerId, recruiterId]
    );
  }

  find(id) {
    return this.database.query(
      `select offer.*, city.name as cityName, contrat.type as contratType, compagny.Logo, recruiter.postalCode as recruiterPostalCode,
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

  updateTeamPicture(picture, offerId) {
    return this.database.query(
      `update ${this.table} set  teamPicture = ? where id = ?`,
      [picture, offerId]
    );
  }

  findAll(page, limit) {
    const offset = (page - 1) * limit;

    return this.database.query(
      `
  SELECT o.id, o.salary, o.teamPicture, o.jobOfferPresentation, o.desiredProfile, o.recruitmentProcess, o.numberOfEmployees, o.jobTitleDetails, c.name AS city_name, co.Logo, ct.type AS contract_type, j.name AS job_title, re.type AS remote_type, offer_candidate.candidateId, r.id as recruiterId
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

  findAllCity(filter) {
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
  WHERE o.cityID = ?


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

  getcity() {
    return this.database.query(`SELECT * FROM city`);
  }

  update(offer) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      offer,
      offer.id,
    ]);
  }

  getmultifilter(
    jobmultifilter,
    remotemultifilter,
    contractmultifilter,
    citymultifilter
  ) {
    const dependencies = [];
    let sql = `
    SELECT o.id, o.salary, o.teamPicture, o.jobOfferPresentation, o.desiredProfile, o.recruitmentProcess, o.numberOfEmployees, o.jobTitleDetails, c.name AS city_name, co.Logo, ct.type AS contract_type, j.name AS job_title, re.type AS remote_type, ofc.candidateId
    FROM offer AS o
    JOIN city AS c ON c.id = o.cityId
    JOIN recruiter AS r ON r.id = o.recruiterId
    JOIN compagny AS co ON co.id = r.compagny_id
    JOIN contrat AS ct ON ct.id = o.contratId
    JOIN job_title as j ON j.id = o.jobTitleId
    JOIN remote AS re ON re.id = o.remoteId
    LEFT JOIN offer_candidate as ofc ON o.id = ofc.offerId
  `;
    if (!(jobmultifilter === 0)) {
      sql += ` WHERE o.jobTitleId = ?`;
      dependencies.push(jobmultifilter);
    }
    if (!(remotemultifilter === 0)) {
      if (!(jobmultifilter === 0)) {
        sql += ` AND o.remoteId = ?`;
        dependencies.push(remotemultifilter);
      } else {
        sql += ` WHERE o.remoteId = ?`;
        dependencies.push(remotemultifilter);
      }
    }
    if (!(contractmultifilter === 0)) {
      if (jobmultifilter === 0 && remotemultifilter === 0) {
        sql += ` WHERE o.contratID = ?`;
        dependencies.push(contractmultifilter);
      } else {
        sql += ` AND o.contratID = ?`;
        dependencies.push(contractmultifilter);
      }
    }
    if (!(citymultifilter === 0)) {
      if (
        jobmultifilter === 0 &&
        remotemultifilter === 0 &&
        contractmultifilter === 0
      ) {
        sql += ` WHERE o.cityID = ?`;
        dependencies.push(citymultifilter);
      } else {
        sql += ` AND o.cityID = ?`;
        dependencies.push(citymultifilter);
      }
    }
    return this.database.query(sql, dependencies);
  }
}

module.exports = OfferManager;
