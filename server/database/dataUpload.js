const path = require('path');
const { uploadApplePurchaseLog } = require('./DB-Upload-Methods/load_AppleData');
const { uploadBananaPurchaseLog } = require('./DB-Upload-Methods/load_BananaData');
const { uploadButterChurningNotes } = require('./DB-Upload-Methods/load_ButterData');
const { uploadCowData } = require('./DB-Upload-Methods/load_CowData');
const { uploadMilkPurchaseLog } = require('./DB-Upload-Methods/load_MilkData');
const { uploadReceipts } = require('./DB-Upload-Methods/load_TransactionData');
const { walkDirectory } = require('./helper');

// uploading all apple purchase logs to database
const pathApples = path.join(__dirname, '../../files/orders/Heritage Farms');
walkDirectory(pathApples, [], (filePath) => {
  if (filePath.endsWith('.csv')) {
    uploadApplePurchaseLog(filePath);
  }
});
// uploading all banana purchase logs to database
const pathBananas = path.join(__dirname, '../../files/orders/Bananarama');
walkDirectory(pathBananas, [], (filePath) => {
  if (filePath.endsWith('.csv')) {
    uploadBananaPurchaseLog(filePath);
  }
});
// uploading all milk  purchase logs and cow info to database
const pathMilkAndCows = path.join(__dirname, '../../files/orders/Old McDonald');
walkDirectory(pathMilkAndCows, [], (filePath) => {
  if (filePath.endsWith('.pdf')) {
    uploadCowData(filePath);
  } else if (filePath.endsWith('.csv')) {
    uploadMilkPurchaseLog(filePath);
  }
});
// uploading all inhouse butter churning consumption logs to database
const pathButterChurning = path.join(__dirname, '../../files/Spring Foods/Butter logs');
walkDirectory(pathButterChurning, [], (filePath) => {
  if (filePath.endsWith('.csv')) {
    uploadButterChurningNotes(filePath);
  }
});
// uploading all sales transactions to database
const pathReceipts = path.join(__dirname, '../../files/Spring Foods/Receipts');
walkDirectory(pathReceipts, [], (filePath) => {
  if (filePath.endsWith('.csv')) {
    uploadReceipts(filePath);
  }
});
