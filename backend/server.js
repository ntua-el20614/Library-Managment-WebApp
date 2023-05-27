const express = require('express');

const app = express();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { fetchData: fetchUsers } = require('./api/all_users');
const { fetchData: fetchSchools } = require('./api/all_schools');
const { fetchData: fetchAuthors } = require('./api/all_authors'); 
const { fetchData: fetchBooks } = require('./api/all_books'); 
const { fetchData: fetchRents } = require('./api/all_rents');
const { fetchData: fetchTeacherLoans } = require('./api/teacher_loans');
const { fetchData: fetchTeachersAuthors } = require('./api/authors_teachers_category');
const { fetchData: fetchZeroRentAuthors } = require('./api/zero_rent_authors');
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
      console.error('Error fetching author data:', err);
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

// Define a route handler for /all_rents
app.get('/all_rents/:year/:month', (req, res) => {
  const rent_year = req.params.year; // Get the year and month from the request parameters
  const rent_month = req.params.month;

  fetchRents([rent_year, rent_month], (err, results) => {
    if (err) {
      console.error('Error fetching Rent data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});


// Define a route handler for /teacher_loans
app.get('/teacher_loans', (req, res) => {
  fetchTeacherLoans((err, results) => {
    if (err) {
      console.error('Error fetching user and rent data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /authors_teachers_category
app.get('/teachers_authors/:category', (req, res) => {
  const Category = req.params.category; // Get the category from the request parameters

  fetchTeachersAuthors(Category, (err, results) => {
    if (err) {
      console.error('Error fetching authors, teachers and category data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /zero_rent_authors
app.get('/zero_rent_authors', (req, res) => {
  fetchZeroRentAuthors((err, results) => {
    if (err) {
      console.error('Error fetching author and rent data:', err);
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
