const pool = require('../dbconnector');

// Function to fetch data from the database
const fetchData = (callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to fetch data
    const query = 'SELECT h.user_id, u.user_name, h.school_id, COUNT(DISTINCT CASE WHEN r.approved = 1 THEN r.rent_id END) AS rented_books ' +
    'FROM handlers h ' +
    'JOIN rent r ON h.school_id = r.school_id ' +
    'JOIN users u ON h.user_id = u.user_id ' +
    'WHERE r.date_of_rent >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) ' +
    'GROUP BY h.user_id, u.user_name, h.school_id ' +
    'HAVING rented_books > 2 ' +
    'AND rented_books IN ( ' +
        'SELECT COUNT(DISTINCT CASE WHEN r2.approved = 1 THEN r2.rent_id END) ' +
        'FROM rent r2 ' +
        'WHERE r2.date_of_rent >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) ' +
        'GROUP BY r2.school_id ' +
        'HAVING COUNT(DISTINCT CASE WHEN r2.approved = 1 THEN r2.rent_id END) > 2 ' +
        'AND r2.school_id <> h.school_id ) ';
    connection.query(query, (err, results) => {
      // Release the connection back to the pool
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        callback(err, null);
        return;
      }

      // Pass the retrieved data to the callback function
      callback(null, results);
    });
  });
};

module.exports = { fetchData };