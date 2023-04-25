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

  findAll() {
    return this.database.query(
      `select o.id, o.salary, o.remoteWork, o.teamPicture, o.jobOfferPresentation, o.desiredProfile, o.recruitmentProcess, o.numberOfEmployees, o.jobTitleDetails, c.name as city_name from ${this.table} as o join city as c on c.id=o.cityId`
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = OfferManager;
