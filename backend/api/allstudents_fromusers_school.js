const pool = require('../dbconnector');

// Function to fetch data from the database
const fetchData = (userid, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to fetch data
    const query =
      'SELECT s.user_id, u.username, u.user_name, u.birthday, u.email, u.approved ' +
      'FROM student s ' +
      'JOIN users u ON s.user_id = u.user_id ' +
      'WHERE s.school_id = (SELECT school_id FROM student WHERE user_id = ' + userid + ') ' +
      'UNION ' +
      'SELECT s.user_id, u.username, u.user_name, u.birthday, u.email, u.approved ' +
      'FROM student s ' +
      'JOIN users u ON s.user_id = u.user_id ' +
      'WHERE s.school_id = (SELECT school_id FROM teacher WHERE user_id = ' + userid + ') ' +
      'UNION ' +
      'SELECT s.user_id, u.username, u.user_name, u.birthday, u.email, u.approved ' +
      'FROM student s ' +
      'JOIN users u ON s.user_id = u.user_id ' +
      'WHERE s.school_id = (SELECT school_id FROM handlers WHERE user_id = ' + userid + ')';

    connection.query(query, [userid], (err, results) => {
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