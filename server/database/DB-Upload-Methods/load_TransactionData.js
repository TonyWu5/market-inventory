/* eslint-disable func-names */
const fs = require('fs');
const db = require('../index.js');
const { updateInventory } = require('../inventoryMethods');

const uploadReceipts = function(csvPath) {
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const transactions = csvContent.split('\n');
  for (let i = 1; i < transactions.length; i++) {
    const currentTransaction = transactions[i];
    if (currentTransaction.length > 0) {
      const transactionColumns = currentTransaction.split(',');
      const price = parseFloat(transactionColumns[0].match(/(?<=\$)\d{1,}\.\d{2}/)[0]);
      const buyer = transactionColumns[1];
      const itemId = transactionColumns[2];
      const query = `INSERT INTO Transactions (PRICE, SOLD_TO, ITEM_ID)
      VALUES (${price}, "${buyer}", ${itemId})`;
      // eslint-disable-next-line no-loop-func
      db.query(query, (error) => {
        if (error) {
          throw (error);
        } else {
          updateInventory(itemId);
        }
      });
    }
  }
};

module.exports = { uploadReceipts };
