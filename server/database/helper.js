/* eslint-disable func-names */
const fs = require('fs');

const walkDirectory = function(dir, fileList, callback) {
  const files = fs.readdirSync(dir);
  var fileList = fileList || [];
  files.forEach((file) => {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      fileList = walkDirectory(dir + '/' + file + '/', fileList, callback);
    } else {
      fileList.push(dir + file);
      callback(dir + file); // to process data
    }
  });
  return fileList;
};

module.exports = { walkDirectory };
