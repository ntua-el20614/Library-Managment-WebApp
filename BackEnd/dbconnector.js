const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "papamaster",
  password: "password",
  database: "library_project",
  charset: "utf8mb4",
  connectionLimit: 50,
  multipleStatements: true,
});

// The connection is automatically established when creating the pool, so there's no need for connection.connect()

module.exports = pool;
