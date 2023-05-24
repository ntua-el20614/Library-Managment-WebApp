const mysql = require("promise-mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "papamaster",
  password: "password",
  database: "biblio_projec",
  charset: "utf8mb4",
  connectionLimit: 50,
  multipleStatements: true,
});

module.exports = pool;
