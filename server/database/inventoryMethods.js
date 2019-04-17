/* eslint-disable func-names */
/*
this file contains the required modules to update inventory of different products
upon sales or butter churning data upload
*/
const db = require('./index.js');

const updateMilkData = function(cowId) {
  const query = `UPDATE Milk SET AMOUNT_USED_SOLD = AMOUNT_USED_SOLD + 1 WHERE COW_ID = ${cowId};`;
  db.query(query, (error, results) => {
    if (error) {
      throw (error);
    }
  });
};
const updateButterData = function(cowId) {
  const query = `UPDATE Butters SET AMOUNT_USED_SOLD = AMOUNT_USED_SOLD + 1 WHERE COW_ID = ${cowId};`;
  db.query(query, (error) => {
    if (error) {
      throw (error);
    }
  });
};
// finds whether an item exists in a specific table
const searchInTable = function(table, id, callback) {
  const query = `SELECT * FROM ${table} WHERE ID = ${id}`;
  let rows = 0;
  db.query(query, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      rows += results.length;
      callback(null, rows > 0);
    }
  });
};
// updates tables given a unique id or cow#
const updateTableWithID = function(table, id) {
  const query = `UPDATE ${table} SET SOLD = TRUE WHERE ID = ${id}`;
  db.query(query, (error) => {
    if (error) {
      throw (error);
    } else {
      console.log(`updated ${id} in ${table}!`);
    }
  });
};
// the following 2 modules check if an item is milk,
// butter or something else based on itemId on receipts;
const isItemMilk = function(itemId) {
  return Boolean(itemId.match(/carton #/));
};
const isItemButter = function(itemId) {
  return Boolean(itemId.match(/stick #/));
};
// this module checks where the data for sold item is stored,
// and updates the quantity/availablity in that data table
const updateInventory = function(itemId) {
  if (isItemButter(itemId)) {
    let milkSource = parseInt(itemId.match(/(?<=Cow: )\d{1,}/));
    updateButterData(milkSource);
  } else if (isItemMilk(itemId)) {
    let cowId = parseInt(itemId.match(/(?<=Cow: )\d{1,}/));
    updateMilkData(cowId);
  } else {
    let numericId = parseInt(itemId);
    let tablesWithUniqueID = ['Apples', 'Bananas'];
    for (let j = 0; j < tablesWithUniqueID.length; j++) {
      let table = tablesWithUniqueID[j];
      searchInTable(table, numericId, (error, exists) => {
        if (error) {
          throw error;
        }
        if (exists) {
          updateTableWithID(table, numericId);
        }
      });
    }
  }
};
// this helper function counts inventory for any one specific item
const countInventory = function(category, expiration, callback) {
  if (category === 'Apples' || category === 'Bananas') {
    const query = `SELECT COUNT(*) FROM ${category} WHERE SOLD = FALSE AND EXPIRATION > '${expiration}'`;
    db.query(query, (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(null, result);
      }
    });
  } else if (category === 'Milk' || category === 'Butters') {
    const query = `SELECT SUM(AMOUNT_REMAINING) FROM ${category} WHERE EXPIRATION > '${expiration}'`;
    db.query(query, (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = {
  searchInTable,
  updateMilkData,
  updateTableWithID,
  updateButterData,
  updateInventory,
  countInventory
};
