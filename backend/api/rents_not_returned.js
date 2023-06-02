const pool = require('../dbconnector')

// Function to fetch data from the database

const fetchData = ([userid], callback) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            callback(err, null);
            return;
        }

        // Execute a SQL query to fetch data
        const query =
        'SELECT r.rent_id, u.username, u.user_name, u.user_id, r.isbn, r.date_of_rent, r.returned, b.title, r.approved ' +
        'FROM rent r ' +
        'JOIN book b ON r.isbn = b.isbn ' +
        'JOIN book_school bs ON r.isbn = bs.isbn ' +
        'JOIN users u ON r.user_id = u.user_id ' +
        'WHERE r.returned = 0 AND r.school_id = ( ' +
        'SELECT school_id FROM handlers WHERE user_id = ' + userid + ') ' +
        'GROUP BY r.rent_id, u.username, u.user_name, u.user_id, r.isbn, r.date_of_rent, r.returned, b.title, r.approved ';
    
    

        connection.query(query, [userid], (err, results) => {
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