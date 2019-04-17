/* eslint-disable func-names */
const db = require('../index.js');

const uploadBananaPurchaseLog = function(csvPath) {
  const queryPart1 = `LOAD DATA
    LOCAL
    INFILE '`;
  const queryPart2 = `'
    INTO TABLE Bananas 
    FIELDS
      TERMINATED BY ',' 
      OPTIONALLY ENCLOSED BY '\"'
    LINES
      TERMINATED BY '\\n'
    IGNORE 1 LINES
    (CATEGORY, EXPIRATION, GENERATION, ID, PRODUCT, TREE_ID, VARIETY);`;
  const query = queryPart1.concat(csvPath).concat(queryPart2);
  db.query(query, (error, results) => {
    if (error) {
      throw (error);
    }
  });
};

module.exports = { uploadBananaPurchaseLog };
