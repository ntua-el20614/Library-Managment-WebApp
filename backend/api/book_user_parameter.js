/*const pool = require('../dbconnector');

// Function to fetch data from the database

const fetchData = (schoolid, categoryname, title, authorname, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Define the query based on the provided parameters
    let query = '';
    //all
    if(categoryname !== '0' && authorname !== '0' && title !== '0'){
      console.log('svcsd');
      query =
      "SELECT bs.isbn, b.title, a.author_name, c.category_id, bs.school_id, b.publisher, b.pages, b.summary, b.book_language, b.keywords, bs.available_copys " +
      "FROM book_school bs " +
      "JOIN book b ON bs.isbn = b.isbn " +
      "JOIN book_author ba ON b.isbn = ba.isbn " +
      "JOIN author a ON ba.author_id = a.author_id " +
      "JOIN book_category bc ON b.isbn = bc.isbn " +
      "JOIN category c ON bc.category_id = c.category_id " +
      "WHERE bs.school_id =  " + schoolid +
      "AND (c.category_name = '" + categoryname + "' " +
      "AND b.title = '" + title + "' " +
      "AND a.author_name = '" + authorname + "' )";

    }
    //author - title
    else if(categoryname === '0' && authorname !== '0' && title !== '0'){}
    //category - title
    else if(categoryname !== '0' && authorname === '0' && title !== '0'){}
    //author - category
    else if(categoryname !== '0' && authorname !== '0' && title === '0'){}
    //title
    else if(categoryname === '0' && authorname === '0' && title !== '0'){}
    //author
    else if(categoryname === '0' && authorname !== '0' && title === '0'){}
    //category
    else if(categoryname !== '0' && authorname === '0' && title === '0'){}
    else{
      console.log('aaaaaaaaaaaa');
    }


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

module.exports = { fetchData };*/


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
    let query = '';
    // Execute a SQL query to fetch data
    if (categoryname !== '0' && authorname !== '0' && title !== '0') {
      query =
        "SELECT bs.isbn, b.title, a.author_name, c.category_id, bs.school_id, b.publisher, b.pages, b.summary, b.book_language, b.keywords, bs.available_copys " +
        "FROM book_school bs " +
        "JOIN book b ON bs.isbn = b.isbn " +
        "JOIN book_author ba ON b.isbn = ba.isbn " +
        "JOIN author a ON ba.author_id = a.author_id " +
        "JOIN book_category bc ON b.isbn = bc.isbn " +
        "JOIN category c ON bc.category_id = c.category_id " +
        "WHERE bs.school_id =  " + schoolid +
        " AND (c.category_name = '" + categoryname + "' " +
        " AND b.title = '" + title + "' " +
        " AND a.author_name = '" + authorname + "' )";
    }
    //author - title
    else if (categoryname === '0' && authorname !== '0' && title !== '0') {
      query =
        "SELECT bs.isbn, b.title, a.author_name, c.category_id, bs.school_id, b.publisher, b.pages, b.summary, b.book_language, b.keywords, bs.available_copys " +
        "FROM book_school bs " +
        "JOIN book b ON bs.isbn = b.isbn " +
        "JOIN book_author ba ON b.isbn = ba.isbn " +
        "JOIN author a ON ba.author_id = a.author_id " +
        "JOIN book_category bc ON b.isbn = bc.isbn " +
        "JOIN category c ON bc.category_id = c.category_id " +
        "WHERE bs.school_id =  " + schoolid +
        " AND b.title = '" + title + "' " +
        " AND a.author_name = '" + authorname + "'";
    }
    //category - title
    else if (categoryname !== '0' && authorname === '0' && title !== '0') {
      query =
        "SELECT bs.isbn, b.title, a.author_name, c.category_id, bs.school_id, b.publisher, b.pages, b.summary, b.book_language, b.keywords, bs.available_copys " +
        "FROM book_school bs " +
        "JOIN book b ON bs.isbn = b.isbn " +
        "JOIN book_author ba ON b.isbn = ba.isbn " +
        "JOIN author a ON ba.author_id = a.author_id " +
        "JOIN book_category bc ON b.isbn = bc.isbn " +
        "JOIN category c ON bc.category_id = c.category_id " +
        "WHERE bs.school_id =  " + schoolid +
        " AND (c.category_name = '" + categoryname + "' " +
        " AND b.title = '" + title + "' )";
    }
    //author - category
    else if (categoryname !== '0' && authorname !== '0' && title === '0') {
      query =
        "SELECT bs.isbn, b.title, a.author_name, c.category_id, bs.school_id, b.publisher, b.pages, b.summary, b.book_language, b.keywords, bs.available_copys " +
        "FROM book_school bs " +
        "JOIN book b ON bs.isbn = b.isbn " +
        "JOIN book_author ba ON b.isbn = ba.isbn " +
        "JOIN author a ON ba.author_id = a.author_id " +
        "JOIN book_category bc ON b.isbn = bc.isbn " +
        "JOIN category c ON bc.category_id = c.category_id " +
        "WHERE bs.school_id =  " + schoolid +
        " AND (c.category_name = '" + categoryname + "' " +
        " AND a.author_name = '" + authorname + "' )";
    }
    //title
    else if (categoryname === '0' && authorname === '0' && title !== '0') {
      query =
        "SELECT bs.isbn, b.title, a.author_name, c.category_id, bs.school_id, b.publisher, b.pages, b.summary, b.book_language, b.keywords, bs.available_copys " +
        "FROM book_school bs " +
        "JOIN book b ON bs.isbn = b.isbn " +
        "JOIN book_author ba ON b.isbn = ba.isbn " +
        "JOIN author a ON ba.author_id = a.author_id " +
        "JOIN book_category bc ON b.isbn = bc.isbn " +
        "JOIN category c ON bc.category_id = c.category_id " +
        "WHERE bs.school_id =  " + schoolid +
        " AND b.title = '" + title + "' ";
    }
    //author
    else if (categoryname === '0' && authorname !== '0' && title === '0') {
      query =
        "SELECT bs.isbn, b.title, a.author_name, c.category_id, bs.school_id, b.publisher, b.pages, b.summary, b.book_language, b.keywords, bs.available_copys " +
        "FROM book_school bs " +
        "JOIN book b ON bs.isbn = b.isbn " +
        "JOIN book_author ba ON b.isbn = ba.isbn " +
        "JOIN author a ON ba.author_id = a.author_id " +
        "JOIN book_category bc ON b.isbn = bc.isbn " +
        "JOIN category c ON bc.category_id = c.category_id " +
        "WHERE bs.school_id =  " + schoolid +
        " AND a.author_name = '" + authorname + "'";
    }
    //category
    else if (categoryname !== '0' && authorname === '0' && title === '0') {
      query =
        "SELECT bs.isbn, b.title, a.author_name, c.category_id, bs.school_id, b.publisher, b.pages, b.summary, b.book_language, b.keywords, bs.available_copys " +
        "FROM book_school bs " +
        "JOIN book b ON bs.isbn = b.isbn " +
        "JOIN book_author ba ON b.isbn = ba.isbn " +
        "JOIN author a ON ba.author_id = a.author_id " +
        "JOIN book_category bc ON b.isbn = bc.isbn " +
        "JOIN category c ON bc.category_id = c.category_id " +
        "WHERE bs.school_id =  " + schoolid +
        " AND c.category_name = '" + categoryname + "'";
    }
    //Nothing
    else if (categoryname === '0' && authorname === '0' && title === '0') {
      query =
        "SELECT bs.isbn, b.title, a.author_name, c.category_id, bs.school_id, b.publisher, b.pages, b.summary, b.book_language, b.keywords, bs.available_copys " +
        "FROM book_school bs " +
        "JOIN book b ON bs.isbn = b.isbn " +
        "JOIN book_author ba ON b.isbn = ba.isbn " +
        "JOIN author a ON ba.author_id = a.author_id " +
        "JOIN book_category bc ON b.isbn = bc.isbn " +
        "JOIN category c ON bc.category_id = c.category_id " +
        "WHERE bs.school_id =  " + schoolid;
    }

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