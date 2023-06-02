/*const pool = require('../dbconnector');

// Function to fetch data from the database

const fetchData = ([userid, username, categoryname], callback) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            callback(err, null);
            return;
        }

        // Define the query based on the provided parameters
        let query = '';
        if (username !== '-1' && categoryname === '-1') {
            // Only userid provided
            query =
            'SELECT u.username, c.category_name, AVG(r.likert) AS average_likert ' +
            'FROM review r ' +
            'JOIN users u ON r.user_id = u.user_id ' +
            'JOIN book_category bc ON r.isbn = bc.isbn ' +
            'JOIN category c ON bc.category_id = c.category_id ' +
            'JOIN book_school bs ON r.isbn = bs.isbn ' +
            'JOIN handlers h ON u.user_id = h.user_id ' +
            "WHERE u.username = '" + username + "' " + 
              'AND r.school_id = (SELECT school_id FROM handlers WHERE user_id = ' + userid + ') '
            'GROUP BY u.username, c.category_name';
        } else if (username === '-1' && categoryname !== '-1') {
            // Only categoryid provided
            query =
            'SELECT u.username, c.category_name, AVG(r.likert) AS average_likert ' +
            'FROM review r ' +
            'JOIN users u ON r.user_id = u.user_id ' +
            'JOIN book_category bc ON r.isbn = bc.isbn ' +
            'JOIN category c ON bc.category_id = c.category_id ' +
            'JOIN book_school bs ON r.isbn = bs.isbn ' +
            'JOIN handlers h ON u.user_id = h.user_id ' +
            "WHERE c.category_name = '" + categoryname + "' " +
              'AND r.school_id = (SELECT school_id FROM handlers WHERE user_id = ' + userid + ') '
            'GROUP BY u.username, c.category_name';
        } else if (username !== '-1' && categoryname !== '-1') {
            // Both userid and categoryid provided
            query =
            'SELECT u.username, c.category_name, AVG(r.likert) AS average_likert ' +
            'FROM review r ' +
            'JOIN users u ON r.user_id = u.user_id ' +
            'JOIN book_category bc ON r.isbn = bc.isbn ' +
            'JOIN category c ON bc.category_id = c.category_id ' +
            'JOIN book_school bs ON r.isbn = bs.isbn ' +
            'JOIN handlers h ON u.user_id = h.user_id ' +
            "WHERE u.username = '" + username + "' " + 
              "AND c.category_name = '" + categoryname + "' " +
              'AND r.school_id = (SELECT school_id FROM handlers WHERE user_id = ' + userid + ') '
            'GROUP BY u.username, c.category_name';
        } else if (username === '-1' && categoryname === '-1') {
            // No parameters
            query =
            'SELECT u.username, c.category_name, AVG(r.likert) AS average_likert ' +
            'FROM review r ' +
            'JOIN users u ON r.user_id = u.user_id ' +
            'JOIN book_category bc ON r.isbn = bc.isbn ' +
            'JOIN category c ON bc.category_id = c.category_id ' +
            'JOIN book_school bs ON r.isbn = bs.isbn WHERE r.school_id = (SELECT school_id FROM handlers WHERE user_id = ' + userid + ' )' +
            'GROUP BY u.username, c.category_name';
        }



        // Execute the query
        connection.query(query, [userid, username, categoryname], (err, results) => {
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
const fetchData = ([userid, username, categoryname], callback) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            callback(err, null);
            return;
        }

        // Define the query based on the provided parameters
        let query = '';
        const params = [];
        if (username !== '-1' && categoryname === '-1') {
            // Only username provided
            query =
                'SELECT u.username, c.category_name, AVG(r.likert) AS average_likert ' +
                'FROM review r ' +
                'JOIN users u ON r.user_id = u.user_id ' +
                'JOIN book_category bc ON r.isbn = bc.isbn ' +
                'JOIN category c ON bc.category_id = c.category_id ' +
                'JOIN book_school bs ON r.isbn = bs.isbn ' +
                'JOIN handlers h ON bs.school_id = h.school_id ' +
                'WHERE u.username = ? ' +
                'AND r.school_id = (SELECT school_id FROM handlers WHERE user_id = ?) ' +
                'GROUP BY u.username, c.category_name';

            params.push(username, userid);
        } else if (username === '-1' && categoryname !== '-1') {
            // Only categoryname provided
            query =
                'SELECT u.username, c.category_name, AVG(r.likert) AS average_likert ' +
                'FROM review r ' +
                'JOIN users u ON r.user_id = u.user_id ' +
                'JOIN book_category bc ON r.isbn = bc.isbn ' +
                'JOIN category c ON bc.category_id = c.category_id ' +
                'JOIN book_school bs ON r.isbn = bs.isbn ' +
                'JOIN handlers h ON bs.school_id = h.school_id ' +
                'WHERE c.category_name = ? ' +
                'AND r.school_id = (SELECT school_id FROM handlers WHERE user_id = ?) ' +
                'GROUP BY u.username, c.category_name';

            params.push(categoryname, userid);
        } else if (username !== '-1' && categoryname !== '-1') {
            // Both username and categoryname provided
            query =
                'SELECT u.username, c.category_name, AVG(r.likert) AS average_likert ' +
                'FROM review r ' +
                'JOIN users u ON r.user_id = u.user_id ' +
                'JOIN book_category bc ON r.isbn = bc.isbn ' +
                'JOIN category c ON bc.category_id = c.category_id ' +
                'JOIN book_school bs ON r.isbn = bs.isbn ' +
                'JOIN handlers h ON bs.school_id = h.school_id ' +
                'WHERE u.username = ? ' +
                'AND c.category_name = ? ' +
                'AND r.school_id = (SELECT school_id FROM handlers WHERE user_id = ?) ' +
                'GROUP BY u.username, c.category_name';

            params.push(username, categoryname, userid);
        } else if (username === '-1' && categoryname === '-1') {
            // No parameters provided
            query =
                'SELECT u.username, c.category_name, AVG(r.likert) AS average_likert ' +
                'FROM review r ' +
                'JOIN users u ON r.user_id = u.user_id ' +
                'JOIN book_category bc ON r.isbn = bc.isbn ' +
                'JOIN category c ON bc.category_id = c.category_id ' +
                'JOIN book_school bs ON r.isbn = bs.isbn ' +
                'JOIN handlers h ON bs.school_id = h.school_id ' +
                'WHERE r.school_id = (SELECT school_id FROM handlers WHERE user_id = ?) ' +
                'GROUP BY u.username, c.category_name';

            params.push(userid);
        }

        // Execute the query
        connection.query(query, params, (err, results) => {
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
