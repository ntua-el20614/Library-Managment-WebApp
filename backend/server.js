const express = require('express');

const app = express();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { fetchData: fetchUsers } = require('./api/allusers');
const { fetchData: fetchSchools } = require('./api/all_schools');
const { fetchData: fetchAuthors } = require('./api/all_authors'); 
const { fetchData: fetchBooks } = require('./api/all_books'); 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});



// Define a route handler for /all_users
app.get('/all_users', (req, res) => {
  fetchUsers((err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /all_schools
app.get('/all_schools', (req, res) => {
  fetchSchools((err, results) => {
    if (err) {
      console.error('Error fetching school data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /all_authors
app.get('/all_authors', (req, res) => {
  fetchAuthors((err, results) => {
    if (err) {
      console.error('Error fetching school data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});



// Define a route handler for /all_Books
app.get('/all_books/:id', (req, res) => {
  const schoolId = req.params.id; // Get the school ID from the request parameters

  fetchBooks(schoolId, (err, results) => {
    if (err) {
      console.error('Error fetching Book data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});






// Start the server
const port = 3305;
const ipAddress = '192.168.1.31';
app.listen(port, () => {//ipAddress, 
  console.log(`Server is running on ${port}`);//${ipAddress}:
});
