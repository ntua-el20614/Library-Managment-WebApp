const pool = require('../dbconnector');
const fs = require('fs');
const { exec } = require('child_process');

// Function to backup the database
const backupDatabase = (callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err);
      return;
    }

    // Dump the database using mysqldump
    const backupFileName = '../papabase_sql/database_backup.sql';
    const dumpCommand = `mysqldump --host=localhost --user=papamaster --password=password --skip-column-statistics library_project`;

    // Execute the dump command
    exec(dumpCommand, (error, stdout, stderr) => {
      // Release the connection back to the pool
      connection.release();

      if (error) {
        console.error('Error creating database backup:', error);
        callback(error);
        return;
      }

      // Write the backup to a file
      fs.writeFile(backupFileName, stdout, (error) => {
        if (error) {
          console.error('Error writing database backup to file:', error);
          callback(error);
          return;
        }

        console.log(`Database backup created successfully: ${backupFileName}`);
        callback(null);
      });
    });
  });
};

module.exports = { backupDatabase };
