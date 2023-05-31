const pool = require('../dbconnector')

// Function to fetch data from the database

const updateData = (isbn, title, publisher, page, summary, language, keywords, image, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to update data
    const query =
      'UPDATE book ' +
      'SET title = ' + "'" + title + "', " +
      'publisher = ' + "'" + publisher + "', " +
      'pages = ' + page + ", " +
      'summary = ' + "'" + summary + "', " +
      'image = ' + image + ", " +
      'book_language = ' + "'" + language + "', " +
      'keywords = ' + "'" + keywords + "' " +
      'WHERE isbn = ' + "'" + isbn + "'";
    connection.query(query, [isbn, title, publisher, page, summary, language, keywords, image], (err, result) => {
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