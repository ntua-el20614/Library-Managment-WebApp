const pool = require('../dbconnector')

// Function to fetch data from the database

const updateData = (approved, rentid, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to update data
    const query =
      'UPDATE rent ' +
      'SET approved = ' + approved +
      ' WHERE rent_id = ' + rentid;
    connection.query(query, [approved, rentid], (err, result) => {
      // Release the connection back to the pool
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        callback(err, null);
        return;
      }

      // Pass the retrieved data to the callback function
      callback(null, result);
    });
  });
};

module.exports = { updateData };