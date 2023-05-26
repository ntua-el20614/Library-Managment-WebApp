const express = require('express');
const { fetchData } = require('./allusers'); // Assuming both files are in the same directory
const app = express();

// Define a route handler for fetching data
app.get('/allusers', (req, res) => {
  // Fetch data from the database
  fetchData((err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Send the retrieved data as a JSON response
    res.json(results);
  });
});



// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});



// Start the server
const port = 3305;
//const ipAddress = '192.168.1.31';
app.listen(port, () => {//ipAddress, () => {
  console.log(`Server is running on :${port}`);//${ipAddress}:${port}`);
});

