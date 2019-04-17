/* eslint-disable radix */
/* eslint-disable func-names */
const fs = require('fs');
const db = require('../index.js');

const uploadApplePurchaseLog = function(csvPath) {
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const apples = csvContent.split('\n');
  for (let i = 1; i < apples.length; i++) {
    const currentApple = apples[i];
    if (currentApple.length > 0) {
      const appleColumns = currentApple.split(',');
      const treeAge = parseInt(appleColumns[0].match(/\d+/)[0]);
      const category = appleColumns[1];
      const color = appleColumns[2];
      const expiration = appleColumns[3];
      const id = parseInt(appleColumns[4]);
      const pollinationGroup = appleColumns[5];
      const product = appleColumns[6];
      const treeId = parseInt(appleColumns[7]);
      const variety = appleColumns[8];
      const query = `INSERT INTO Apples (TREE_AGE, CATEGORY, COLOR, EXPIRATION, ID, POLLINATION_GROUP, PRODUCT, TREE_ID, VARIETY)
      VALUES (${treeAge}, "${category}", "${color}", "${expiration}", ${id}, "${pollinationGroup}", "${product}", ${treeId}, "${variety}")`;
      db.query(query, (error) => {
        if (error) {
          throw (error);
        }
      });
    }
  }
};

module.exports = { uploadApplePurchaseLog };
