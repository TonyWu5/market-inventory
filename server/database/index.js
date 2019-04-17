const mysql = require('mysql');
const dbConfig = require('./.mysqlConfig.js');

const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

connection.connect((error) => {
  if (error) {
    throw (error);
  } else {
    console.log('Connected to MySQL database!');
  }
});

module.exports = connection;
