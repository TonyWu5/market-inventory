/* eslint-disable func-names */
const { countInventory } = require('./inventoryMethods.js');

const inventoryAllItems = function(expirationDate, callback) {
  let currentCount = 0;
  countInventory('Apples', expirationDate, (error, result) => {
    if (error) {
      throw (error);
    } else {
      currentCount += result[0]['COUNT(*)'];
      countInventory('Bananas', expirationDate, (error, result) => {
        if (error) {
          throw (error);
        } else {
          currentCount += result[0]['COUNT(*)'];
          countInventory('Milk', expirationDate, (error, result) => {
            if (error) {
              throw (error);
            } else {
              currentCount += result[0]['SUM(AMOUNT_REMAINING)'];
              countInventory('Butters', expirationDate, (error, result) => {
                if (error) {
                  throw (error);
                } else {
                  currentCount += result[0]['SUM(AMOUNT_REMAINING)'];
                  callback(currentCount);
                }
              });
            }
          });
        }
      });
    }
  });
};

inventoryAllItems('2019-01-28', (totalCount) => {
  console.log(`There are total ${totalCount} fresh items on the shelf.`);
});

module.exports = { inventoryAllItems };
