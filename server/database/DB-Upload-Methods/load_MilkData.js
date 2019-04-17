/* eslint-disable func-names */
const db = require('../index.js');

const uploadMilkPurchaseLog = function(csvPath) {
  const queryPart1 = `LOAD DATA
    LOCAL
    INFILE '`;
  const queryPart2 = `'
    INTO TABLE Milk 
    FIELDS
      TERMINATED BY ',' 
      OPTIONALLY ENCLOSED BY '\"'
    LINES
      TERMINATED BY '\\n'
    IGNORE 1 LINES
    (QUANTITY, CATEGORY, COW_ID, COW_AGE, COW_BREED, EXPIRATION, VENDOR);`;
  const query = queryPart1.concat(csvPath).concat(queryPart2);
  db.query(query, (error) => {
    if (error) {
      throw (error);
    }
  });
};

module.exports = { uploadMilkPurchaseLog };
