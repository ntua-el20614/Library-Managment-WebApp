const pool = require('../dbconnector')

// Function to fetch data from the database

const updateData = (approved, userid, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to update data
    const query =
    'UPDATE users ' +
      'SET approved = ' + approved +  
	    ' WHERE user_id = ' + userid;
    connection.query(query, [approved, userid], (err, result) => {
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

