const pool = require('../dbconnector');

// Function to fetch data from the database

const fetchData = (schoolId, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to fetch data
    const query = 'SELECT * FROM book b ' +
    'JOIN book_school bs ON b.isbn = bs.isbn ' +
    'JOIN school s ON bs.school_id = s.school_id ' +
    'WHERE bs.school_id =  '+ schoolId;
    connection.query(query, [schoolId], (err, results) => {
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

//Select gia na epistrefi oti theli o chris sto front
/*
'SELECT book.isbn, book.title, book.publisher, book.pages, book.summary, book.book_language, book.keywords, book_school.copys, book_school.available_copys, ' +
    'GROUP_CONCAT(DISTINCT author.author_name SEPARATOR ', ') AS authors, ' +
    'GROUP_CONCAT(DISTINCT category.category_name SEPARATOR ', ') AS categories ' +
'FROM book ' +
'JOIN book_school ON book.isbn = book_school.isbn ' +
'JOIN book_author ON book.isbn = book_author.isbn ' +
'JOIN author ON book_author.author_id = author.author_id ' +
'JOIN book_category ON book.isbn = book_category.isbn ' +
'JOIN category ON book_category.category_id = category.category_id ' +
'WHERE book_school.school_id = ' + schoolId +
' GROUP BY book.isbn, book.title'
*/