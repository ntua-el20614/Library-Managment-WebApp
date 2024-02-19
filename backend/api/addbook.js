const pool = require('../dbconnector');

// Function to add a user to the database
const addData = (isbn, title, publisher, pages, summary, book_language, keywords, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err);
      return;
    }

    // Execute a SQL query to add a user
    const query = 'INSERT INTO book (isbn, title, publisher, pages, summary, book_language, keywords) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [isbn, title, publisher, pages, summary, book_language, keywords];
    connection.query(query, values, (err, result) => {
      // Release the connection back to the pool
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        callback(err);
        return;
      }

      // Pass the result of the insert operation to the callback function
      callback(null, result);
    });
  });
};

module.exports = { addData };