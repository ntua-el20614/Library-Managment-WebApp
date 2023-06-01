const pool = require('../dbconnector')

// Function to fetch data from the database

const updateData = (isbn, userid, copynum, callback) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            callback(err, null);
            return;
        }

        // Execute a SQL query to update data
        const query = "UPDATE book_school SET available_copys = available_copys + ? WHERE isbn = ? AND school_id = (SELECT school_id FROM handlers WHERE user_id = ?);";
        connection.query(query, [copynum, isbn, userid], (err, result) => {
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