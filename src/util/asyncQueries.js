const database = require('../database');

function asyncGet(sql) {
  return new Promise((resolve, reject) => {
    database
      .get(sql, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
  });
}

module.exports = { asyncGet };
