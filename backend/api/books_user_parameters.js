const pool = require('../dbconnector');

// Function to fetch data from the database
const fetchData = (schoolid, categoryname, title, authorname, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to fetch data
    const query = `SELECT bs.isbn, b.title, a.author_name, c.category_id, bs.school_id, b.publisher, b.pages, b.summary, b.book_language, b.keywords, bs.available_copys
      FROM book_school bs
      JOIN book b ON bs.isbn = b.isbn
      JOIN book_author ba ON b.isbn = ba.isbn
      JOIN author a ON ba.author_id = a.author_id
      JOIN book_category bc ON b.isbn = bc.isbn
      JOIN category c ON bc.category_id = c.category_id
      WHERE bs.school_id = ?
      AND (c.category_name LIKE CONCAT('%', ?, '%')
      AND b.title LIKE CONCAT('%', ?, '%')
      AND a.author_name LIKE CONCAT('%', ?, '%'))`;
      
    connection.query(query, [schoolid, categoryname, title, authorname], (err, results) => {
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
