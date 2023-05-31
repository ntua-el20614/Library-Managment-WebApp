const pool = require('../dbconnector');

// Function to fetch data from the database

const fetchData = ([userid, categoryid], callback) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            callback(err, null);
            return;
        }

        // Define the query based on the provided parameters
        let query = '';
        if (userid !== '0' && categoryid === '0') {
            // Only userid provided
            query =
                'SELECT AVG(likert) AS average_likert ' +
                'FROM review ' +
                'WHERE user_id = ' + userid;
        } else if (userid === '0' && categoryid !== '0') {
            // Only categoryid provided
            query =
                'SELECT AVG(likert) AS average_likert ' +
                'FROM review ' +
                'WHERE isbn IN (SELECT isbn FROM book_category WHERE category_id = ' + categoryid + ' )';
        } else if (userid !== '0' && categoryid !== '0') {
            // Both userid and categoryid provided
            query =
                'SELECT AVG(likert) AS average_likert ' +
                'FROM review ' +
                'WHERE user_id = ' + userid + ' AND isbn IN (SELECT isbn FROM book_category WHERE category_id = ' + categoryid + ')';
        } else if (userid === '0' && categoryid === '0') {
            // No parameters
            query =
                'SELECT AVG(likert) AS average_likert ' +
                'FROM review ';
        }



        // Execute the query
        connection.query(query, [userid, categoryid], (err, results) => {
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