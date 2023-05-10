const AbstractManager = require("./AbstractManager");

class OffreManager extends AbstractManager {
  constructor() {
    super({ table: "offer" });
  }

  find(id) {
    return this.database.query(
      `select offer.*, city.name as cityName, city.postalCode as cityPostalCode, contrat.type as contratType, compagny.Logo, recruiter.postalCode as recruiterPostalCode,
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

  findAll() {
    return this.database.query(
      `select o.id, o.salary, o.remoteWork, o.teamPicture, o.jobOfferPresentation, o.desiredProfile, o.recruitmentProcess, o.numberOfEmployees, o.jobTitleDetails, c.name as city_name from ${this.table} as o join city as c on c.id=o.cityId`
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = OffreManager;
