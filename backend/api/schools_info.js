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
    'SELECT ' +
    's.school_id, s.school_name, ' +
    'u.user_name AS handler_name, ' +
    'COUNT(DISTINCT st.user_id) AS num_students, ' +
    'COUNT(DISTINCT t.user_id) AS num_teachers ' +
  'FROM school s ' +
  'LEFT JOIN handlers h ON s.school_id = h.school_id ' +
  'LEFT JOIN student st ON s.school_id = st.school_id ' +
  'LEFT JOIN teacher t ON s.school_id = t.school_id ' +
  'LEFT JOIN users u ON h.user_id = u.user_id ' +
  'GROUP BY s.school_id ';
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