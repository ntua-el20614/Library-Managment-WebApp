const { exec } = require('child_process');

// Function to restore the database
const restoreDatabase = (callback) => {
  const restoreCommand = `mysql --host=localhost --user=papamaster --password=password library_project < ../papabase_sql/database_backup.sql`;

  // Execute the restore command
  exec(restoreCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Error restoring database:', error);
      callback(error);
      return;
    }

    console.log('Database restored successfully');
    callback(null);
  });
};

module.exports = { restoreDatabase };