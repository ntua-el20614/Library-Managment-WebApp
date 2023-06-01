const pool = require('../dbconnector');

// Function to fetch data from the database
const fetchData = (userid, categoryname, title, authorname, copys, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }
    let query = '';
    // Execute a SQL query to fetch data
    if (categoryname !== '0' && authorname !== '0' && title !== '0' && copys!=='0') {
      query =
      'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid +
        " AND (b.title = '" + title + "' " +
        " AND c.category_name = '" + categoryname + "' " +
        " AND bs.copys = " + copys +
        " AND a.author_name = '" + authorname + "' )";
      
    }
//category author title
    else if (categoryname !== '0' && authorname !== '0' && title !== '0' && copys=== '0') {
        query =
        'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid +
        " AND (b.title = '" + title + "' " +
        " AND c.category_name = '" + categoryname + "' " +
        " AND a.author_name = '" + authorname + "' )";
      }
// category author copys
      else if (categoryname !== '0' && authorname !== '0' && title === '0' && copys!== '0') {
        query =
        'SELECT b.title, a.author_name ' +
        'FROM book b ' +
        'JOIN book_school bs ON b.isbn = bs.isbn ' +
        'JOIN book_category bc ON b.isbn = bc.isbn ' +
        'JOIN category c ON bc.category_id = c.category_id ' +
        'JOIN book_author ba ON b.isbn = ba.isbn ' +
        'JOIN author a ON ba.author_id = a.author_id ' +
        'JOIN handlers h ON bs.school_id = h.school_id ' + 
        'WHERE h.user_id = ' + userid +
          " AND (c.category_name = '" + categoryname + "' " +
          " AND bs.copys = " + copys +
          " AND a.author_name = '" + authorname + "' )";
      }
//category title copys
      else if (categoryname !== '0' && authorname !== '0' && title === '0' && copys!== '0') {
        query =
        'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid +
        " AND (b.title = '" + title + "' " +
        " AND c.category_name = '" + categoryname + "' " +
        " AND bs.copys = " + copys + " )";
      }
//author title copys
      else if (categoryname === '0' && authorname !== '0' && title !== '0' && copys!== '0') {
        query =
        'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid +
        " AND (b.title = '" + title + "' " +
        " AND bs.copys = " + copys +
        " AND a.author_name = '" + authorname + "' )";
      }
    //author - title
    else if (categoryname === '0' && authorname !== '0' && title !== '0' && copys=== '0') {
      query =
      'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid +
        " AND (b.title = '" + title + "' " +
        " AND a.author_name = '" + authorname + "' )";
    }
//copys category
    else if (categoryname !== '0' && authorname === '0' && title === '0' && copys!== '0') {
        query =
        'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid +
        " AND ( c.category_name = '" + categoryname + "' " +
        " AND bs.copys = " + copys + " )";
      }
      //copys author
    else if (categoryname === '0' && authorname !== '0' && title === '0' && copys!== '0') {
        query =
        'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid +
        " AND ( a.author_name = '" + authorname + "' " +
        " AND bs.copys = " + copys + " )";
      }
      //copys title
    else if (categoryname === '0' && authorname === '0' && title !== '0' && copys!== '0') {
        query =
        'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid +
      " AND (b.title = '" + title + "' " +
        " AND bs.copys = " + copys + " )";
      }
    //category - title
    else if (categoryname !== '0' && authorname === '0' && title !== '0' && copys=== '0') {
      query =
      'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid +
        " AND (b.title = '" + title + "' " +
        " AND c.category_name = '" + categoryname + "' )";
    }
    //author - category
    else if (categoryname !== '0' && authorname !== '0' && title === '0' && copys=== '0') {
      query =
      'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid +
        " AND (c.category_name = '" + categoryname + "' " +
        " AND a.author_name = '" + authorname + "' )";
    }
    //title
    else if (categoryname === '0' && authorname === '0' && title !== '0' && copys=== '0') {
      query =
      'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid +
        " AND b.title = '" + title + "' ";
    }
    //copys
    else if (categoryname === '0' && authorname === '0' && title === '0' && copys!== '0') {
        query =
        'SELECT b.title, a.author_name ' +
        'FROM book b ' +
        'JOIN book_school bs ON b.isbn = bs.isbn ' +
        'JOIN book_category bc ON b.isbn = bc.isbn ' +
        'JOIN category c ON bc.category_id = c.category_id ' +
        'JOIN book_author ba ON b.isbn = ba.isbn ' +
        'JOIN author a ON ba.author_id = a.author_id ' +
        'JOIN handlers h ON bs.school_id = h.school_id ' + 
        'WHERE h.user_id = ' + userid +
        " AND bs.copys = " + copys;
      }
    //author
    else if (categoryname === '0' && authorname !== '0' && title === '0' && copys=== '0') {
      query =
      'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid +
        " AND a.author_name = '" + authorname + "' ";
    }
    //category
    else if (categoryname !== '0' && authorname === '0' && title === '0' && copys=== '0') {
      query =
      'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid +
        " AND c.category_name = '" + categoryname + "' ";
    }
    //Nothing
    else if (categoryname === '0' && authorname === '0' && title === '0' && copys=== '0') {
      query =
      'SELECT b.title, a.author_name ' +
      'FROM book b ' +
      'JOIN book_school bs ON b.isbn = bs.isbn ' +
      'JOIN book_category bc ON b.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'JOIN book_author ba ON b.isbn = ba.isbn ' +
      'JOIN author a ON ba.author_id = a.author_id ' +
      'JOIN handlers h ON bs.school_id = h.school_id ' + 
      'WHERE h.user_id = ' + userid;
    }

    connection.query(query, [userid, categoryname, title, authorname, copys], (err, results) => {
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