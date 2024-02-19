const pool = require('../dbconnector');

// Function to delete data from the database
const deleteData = (authorid, isbn, callback) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            callback(err, null);
            return;
        }

        // Enable multiple statements support
        connection.config.multipleStatements = true;

        // Execute SQL queries to delete data
        const queries = [
            "SELECT COUNT(*) AS author_count FROM book_author WHERE isbn = '" + isbn + "'; ",
            "DELETE FROM book WHERE isbn = '" + isbn + "' AND (SELECT COUNT(*) FROM book_author WHERE isbn = '" + isbn + "') = 1; ",
            "DELETE FROM rent WHERE isbn = '" + isbn + "' AND (SELECT COUNT(*) FROM book_author WHERE isbn = '" + isbn + "') = 1; ",
            "DELETE FROM review WHERE isbn = '" + isbn + "' AND (SELECT COUNT(*) FROM book_author WHERE isbn = '" + isbn + "') = 1; ",
            "DELETE FROM reservation WHERE isbn = '" + isbn + "' AND (SELECT COUNT(*) FROM book_author WHERE isbn = '" + isbn + "') = 1; ",
            "DELETE FROM book_author WHERE author_id = " + authorid + " AND isbn = '" + isbn + "'; "
        ];

        // Run the queries sequentially
        const deleteSequentially = (index) => {
            if (index >= queries.length) {
                // Release the connection back to the pool
                connection.release();
                callback(null, 'Author deleted from book successfully.');
                return;
            }

            const query = queries[index];
            const params = [authorid, isbn];

            connection.query(query, params, (err, result) => {
                if (err) {
                    console.error('Error executing query:', err);
                    callback(err, null);
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
