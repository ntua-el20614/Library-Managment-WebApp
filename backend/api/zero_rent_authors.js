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
    const query =
    'SELECT a.author_id, a.author_name ' +
    'FROM author a ' +
    'WHERE NOT EXISTS ( ' +
        'SELECT 1 ' +
        'FROM book_author ba ' +
        'INNER JOIN book b ON ba.isbn = b.isbn ' +
        'INNER JOIN rent r ON b.isbn = r.isbn ' +
        'WHERE ba.author_id = a.author_id )';
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