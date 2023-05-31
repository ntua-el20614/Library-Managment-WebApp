const pool = require('../dbconnector');

// Function to fetch data from the database
const deleteData = (schoolid, isbn, callback) => {

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Enable multiple statements support
    connection.config.multipleStatements = true;

    // Execute SQL queries to delete data
    const queries = [
      `DELETE FROM book_school WHERE school_id = ? AND isbn = ?`,
      `DELETE FROM rent WHERE school_id = ? AND isbn = ?`,
      `DELETE FROM review WHERE school_id = ? AND isbn = ?`,
      `DELETE FROM reservation WHERE school_id = ? AND isbn = ?`
    ];

    // Run the queries sequentially
    const deleteSequentially = (index) => {
      if (index >= queries.length) {
        // Release the connection back to the pool
        connection.release();
        callback(null, 'Book, Rent, Review, Reservation deleted successfully.');
        return;
      }

      const query = queries[index];
      connection.query(query, [schoolid, isbn], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          callback(err, null);
          return;
        }

        deleteSequentially(index + 1);
      });
    };

    // Start executing queries
    deleteSequentially(0);
  });
};

module.exports = { deleteData };