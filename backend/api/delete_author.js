const pool = require('../dbconnector');

// Function to fetch data from the database
const deleteData = (authorid, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err);
      return;
    }

    // Enable multiple statements support
    connection.config.multipleStatements = true;

    // Execute SQL queries to delete data
    const queries = [
      'SET autocommit=0',
      'SET SQL_SAFE_UPDATES=0',
      `DELETE FROM book_author 
       WHERE author_id = ${connection.escape(authorid)}
       AND isbn IN (
         SELECT isbn
         FROM (
           SELECT isbn
           FROM book_author
           WHERE author_id = ${connection.escape(authorid)}
           GROUP BY isbn
           HAVING COUNT(*) > 1
         ) AS subquery
       )`,
      `DELETE FROM book_author
       WHERE author_id = ${connection.escape(authorid)}
       AND isbn IN (
         SELECT isbn
         FROM book_author
         WHERE author_id = ${connection.escape(authorid)}
         GROUP BY isbn
         HAVING COUNT(*) = 1
       )`,
      `DELETE FROM book
       WHERE isbn IN (
         SELECT isbn
         FROM book
         WHERE isbn NOT IN (SELECT isbn FROM book_author)
       )`,
      `DELETE FROM author
       WHERE author_id = ${connection.escape(authorid)}
       AND NOT EXISTS (
         SELECT *
         FROM book_author
         WHERE author_id = ${connection.escape(authorid)}
         AND book_author.isbn IN (
           SELECT isbn
           FROM (
             SELECT isbn
             FROM book_author
             WHERE author_id = ${connection.escape(authorid)}
             GROUP BY isbn
             HAVING COUNT(*) > 1
           ) AS subquery
         )
       )`,
      'COMMIT',
      'SET autocommit=1'
    ];

    // Run the queries sequentially
    const deleteSequentially = (index) => {
      if (index >= queries.length) {
        // Release the connection back to the pool
        connection.release();
        callback(null, 'Author deleted successfully.');
        return;
      }

      const query = queries[index];
      connection.query(query, (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          callback(err);
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

