const pool = require('../dbconnector');

// Function to add a user to the database
const updateData = (schoolid, isbn, copys, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err);
      return;
    }

    // Execute a SQL query to update users password
    const query = 
    'UPDATE book_school ' +
    'SET available_copys = available_copys  +  ( ' +
        'SELECT (' + copys + '- copys ) AS copy_difference ' +
        'FROM book_school ' +
        'WHERE isbn = ' + "'" + isbn + "' " + 'AND school_id = ' + schoolid +
    ') ' + ', ' +
    'copys = ' + copys + 
    'WHERE isbn =' + "'" + isbn + "' " + 'AND school_id = ' + schoolid;
    
    const values = [schoolid, isbn, copys];
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

module.exports = { updateData };