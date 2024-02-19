const pool = require('../dbconnector');

// Function to fetch data from the database
const deleteData = (schoolId, callback) => {

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
      'DELETE users FROM users JOIN student ON student.user_id = users.user_id WHERE school_id = ?',
      'DELETE users FROM users JOIN teacher ON teacher.user_id = users.user_id WHERE school_id = ?',
      'DELETE users FROM users JOIN handlers ON handlers.user_id = users.user_id WHERE school_id = ?',
      'DELETE FROM school WHERE school_id = ?',
      'DELETE FROM book WHERE isbn NOT IN (SELECT isbn FROM book_school)'
    ];

    // Run the queries sequentially
    const deleteSequentially = (index) => {
      if (index >= queries.length) {
        // Release the connection back to the pool
        connection.release();
        callback(null, 'School and associated books deleted successfully.');
        return;
      }

      const query = queries[index];
      connection.query(query, [schoolId], (err, result) => {
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


/*const pool = require('../dbconnector');

// Function to fetch data from the database
const deleteData = (schoolid, callback) => {
  
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
      'DELETE users FROM users JOIN student ON student.user_id = users.user_id WHERE school_id = ?',
      'DELETE users FROM users JOIN teacher ON teacher.user_id = users.user_id WHERE school_id = ?',
      'DELETE users FROM users JOIN handlers ON handlers.user_id = users.user_id WHERE school_id = ?',
      'DELETE FROM school WHERE school_id = ?'
    ];

    // Run the queries sequentially
    const deleteSequentially = (index) => {
      if (index >= queries.length) {
        // Release the connection back to the pool
        connection.release();
        callback(null, 'School deleted successfully.');
        return;
      }

      const query = queries[index];
      connection.query(query, [schoolid], (err, result) => {
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

module.exports = { deleteData };*/