/* eslint-disable func-names */
const pdfUtil = require('pdf-to-text');
const db = require('../index.js');

const uploadCowData = function(pdfPath) {
  pdfUtil.pdfToText(pdfPath, (err, data) => {
    if (err) throw (err);
    if (data.match(/GBX/m)) {
      const vendor = 'GBX';
      const cowId = parseInt(data.match(/(?<=Cow: )\d{1,}/m));
      const length = parseInt(data.match(/(?<=Length: )\d{1,}/m));
      const weight = parseInt(data.match(/(?<=Weight: )\d{1,}/m));
      const query = `INSERT INTO Cows (VENDOR, ID, LENGTH, WEIGHT)
      VALUES ("${vendor}", ${cowId}, ${length}, ${weight})`;
      db.query(query, (error) => {
        if (error) {
          throw (error);
        }
      });
    }
  });
};

module.exports = { uploadCowData };
