/* eslint-disable radix */
/* eslint-disable func-names */
const fs = require('fs');
const db = require('../index.js');
const { updateMilkData } = require('../inventoryMethods');

// the function below uploads butter churning files & updates milk inventory
const uploadButterChurningNotes = function(csvPath) {
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const butters = csvContent.split('\n');
  for (let i = 1; i < butters.length; i++) { // skips headers
    const currentBatch = butters[i];
    if (currentBatch.length > 0) {
      const batchColumns = currentBatch.split(',');
      const quantity = parseInt(batchColumns[0]);
      const sourceCow = parseInt(batchColumns[1].match(/(?<=Cow )\d{1,}/)[0]);
      const cartonUsed = parseInt(batchColumns[2].match(/(?<=carton #)\d{1,}/));
      const category = batchColumns[3];
      const churner = batchColumns[4];
      const expirationDate = batchColumns[5];
      const query = `INSERT INTO Butters (QUANTITY, SOURCE_COW, CARTON_USED, CATEGORY, CHURNER, EXPIRATION)
      VALUES (${quantity}, ${sourceCow}, ${cartonUsed}, "${category}", "${churner}", "${expirationDate}")`;
      db.query(query, (error) => {
        if (error) {
          throw (error);
        } else {
          updateMilkData(sourceCow); // updates milk inventory
        }
      });
    }
  }
};

module.exports = { uploadButterChurningNotes };
