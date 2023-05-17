const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  ssl: dbConfig.ssl,
  rejectUnauthorized: dbConfig.rejectUnauthorized
});


module.exports = connection;
