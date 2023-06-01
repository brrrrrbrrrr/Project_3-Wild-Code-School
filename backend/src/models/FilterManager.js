const AbstractManager = require("./AbstractManager");

class FilterManager extends AbstractManager {
  constructor() {
    super({ table: "filter" });
  }

  postFilter(candidateId, filtertype, filtervalue) {
    return this.database.query(
      `INSERT INTO ${this.table} (candidateId,filterType,filterValue) VALUES (?,?,?)
        ON DUPLICATE KEY UPDATE filterValue= ?`,
      [candidateId, filtertype, filtervalue, filtervalue]
    );
  }

  checkFilter(dependencies) {
    let sql = `
 SELECT count(*) as offerNumber
 FROM offer AS o
 JOIN city AS c ON c.id = o.cityId
 JOIN contrat AS ct ON ct.id = o.contratId
 JOIN job_title as j ON j.id = o.jobTitleId
 JOIN remote AS re ON re.id = o.remoteId
`;
    let i = 0;
    let j = 0;
    dependencies.forEach((filter) => {
      j += filter.filterValue;
      if (filter.filterValue !== 0) {
        if (i === 0) {
          sql += " WHERE ";
        } else {
          sql += " AND";
        }
        switch (filter.filterType) {
          case 1:
            sql += ` o.jobTitleId = ${filter.filterValue}`;
            break;
          case 2:
            sql += ` o.remoteId = ${filter.filterValue}`;
            break;
          case 3:
            sql += ` o.contratId = ${filter.filterValue}`;
            break;
          case 4:
            sql += ` o.cityId = ${filter.filterValue}`;
            break;
          default:
            break;
        }
        i += 1;
      }
    });
    if (j === 0) sql = 'SELECT "filterempty"';
    return this.database.query(sql);
  }

  getUserFilters(candidateId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE candidateId = ?`,
      [candidateId]
    );
  }
}

module.exports = FilterManager;
