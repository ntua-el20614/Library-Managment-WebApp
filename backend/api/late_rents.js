const pool = require('../dbconnector');

// Function to fetch data from the database
const fetchData = (userid, name, dayz, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }
    let query = '';
    // Execute a SQL query to fetch data
    //all
    if (name !== '0' && dayz !== '0') {
      query =
      "SELECT u.user_id, u.username, u.user_name, (SELECT title FROM book WHERE isbn = r.isbn), r.title, r.school_id, DATEDIFF(NOW(), r.date_of_rent) - 7 AS days_passed " +
      "FROM users u " +
      "INNER JOIN rent r ON u.user_id = r.user_id " +
      "INNER JOIN handlers h ON h.school_id = r.school_id " +
      "WHERE h.user_id = " + userid +
        " AND r.approved = 1 " +
        "AND r.returned = 0 " +
        "AND DATEDIFF(NOW(), r.date_of_rent) > 7 " +
        "AND u.user_name = '" + name + "' " +
        "AND DATEDIFF(NOW(), r.date_of_rent) - 7 = " + dayz;
    }
    //dayz
    else if (name === '0' && dayz !== '0') {
      query =
      "SELECT u.user_id, u.username, u.user_name, r.isbn,  (SELECT title FROM book WHERE isbn = r.isbn), r.school_id, DATEDIFF(NOW(), r.date_of_rent) - 7 AS days_passed " +
      "FROM users u " +
      "INNER JOIN rent r ON u.user_id = r.user_id " +
      "INNER JOIN handlers h ON h.school_id = r.school_id " +
      "WHERE h.user_id = " + userid +
        " AND r.approved = 1 " +
        "AND r.returned = 0 " +
        "AND DATEDIFF(NOW(), r.date_of_rent) > 7 " +
        "AND DATEDIFF(NOW(), r.date_of_rent) - 7 = " + dayz;
    }
    //name
    else if (name !== '0' && dayz === '0') {
      query =
      "SELECT u.user_id, u.username, u.user_name, r.isbn,  (SELECT title FROM book WHERE isbn = r.isbn), r.school_id, DATEDIFF(NOW(), r.date_of_rent) - 7 AS days_passed " +
      "FROM users u " +
      "INNER JOIN rent r ON u.user_id = r.user_id " +
      "INNER JOIN handlers h ON h.school_id = r.school_id " +
      "WHERE h.user_id = " + userid +
        " AND r.approved = 1 " +
        "AND r.returned = 0 " +
        "AND DATEDIFF(NOW(), r.date_of_rent) > 7 " +
        "AND u.user_name = '" + name + "'";
    }
    //none
    else if (name === '0' && dayz === '0') {
      query =
      "SELECT u.user_id, u.username, u.user_name, r.isbn,  (SELECT title FROM book WHERE isbn = r.isbn), r.school_id, DATEDIFF(NOW(), r.date_of_rent) - 7 AS days_passed " +
      "FROM users u " +
      "INNER JOIN rent r ON u.user_id = r.user_id " +
      "INNER JOIN handlers h ON h.school_id = r.school_id " +
      "WHERE h.user_id = " + userid +
        " AND r.approved = 1 " +
        "AND r.returned = 0 " +
        "AND DATEDIFF(NOW(), r.date_of_rent) > 7 ";
    }
    

    connection.query(query, [userid, name, dayz], (err, results) => {
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