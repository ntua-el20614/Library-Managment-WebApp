const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { fetchData: fetchUsers } = require('./api/all_users');
const { fetchData: fetchStudents } = require('./api/allstudents');
const { fetchData: fetchTeachers } = require('./api/allteachers');
const { fetchData: fetchHandlers } = require('./api/allhandlers');
const { fetchData: fetchSchools } = require('./api/all_schools');
const { fetchData: fetchAuthors } = require('./api/all_authors'); 
const { fetchData: fetchBooks } = require('./api/all_books'); 
const { fetchData: fetchRents } = require('./api/all_rents');
const { fetchData: fetchTeacherLoans } = require('./api/teacher_loans');
const { fetchData: fetchTeachersAuthors } = require('./api/authors_teachers_category');
const { fetchData: fetchZeroRentAuthors } = require('./api/zero_rent_authors');
const { fetchData: fetchTopCategoryCombos } = require('./api/top_category_combos');
const { fetchData: fetchAuthLessThanFive } = require('./api/authors_less_than_five');
const { fetchData: fetchBooksRentedByUser } = require('./api/books_rented_by_user');
const { fetchData: fetchBooksReservedByUser } = require('./api/books_reserved_by_user');
const { fetchData: fetchStudentFromUserSchool } = require('./api/allstudents_fromusers_school');
const { fetchData: fetchTeachersFromUserSchool } = require('./api/allteachers_fromusers_school');
const { fetchData: fetchHandlersFromUserSchool } = require('./api/allhandlers_fromusers_school');
const { fetchData: fetchUsersSchool } = require('./api/users_school');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { addData: addUser } = require('./api/adduser');
const { addData: addTeacher } = require('./api/addteacher');
const { addData: addStudent } = require('./api/addstudent');
const { addData: addHandler } = require('./api/addhandler');
const { addData: addAuthor } = require('./api/addauthor');
const { addData: addCategory } = require('./api/addcategory');
const { addData: addReview } = require('./api/addreview');
const { addData: addSchool } = require('./api/addschool');
const { addData: addBook } = require('./api/addbook');
const { addData: addAuthorToBook } = require('./api/addauthortobook');
const { addData: addCategoryToBook } = require('./api/addcategorytobook');
const { addData: addRent } = require('./api/addrent');
const { addData: addReservation } = require('./api/addreservation');
const { addData: addBookToSchool } = require('./api/addbooktoschool');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { updateData: updatePassword } = require('./api/updatepassword');
const { updateData: updateApproves } = require('./api/update_approves');
const { updateData: updateTeacher } = require('./api/update_teacher');
const { updateData: updateCopys } = require('./api/update_copys');
const { updateData: updateBook } = require('./api/updatebook');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { deleteData: deleteUser } = require('./api/delete_user');
const { deleteData: deleteSchool } = require('./api/delete_school');
const { deleteData: deleteBookFromSchool } = require('./api/delete_book_from_school');
const { deleteData: deleteReview } = require('./api/delete_review');
const { deleteData: deleteRent } = require('./api/delete_rent');
const { deleteData: deleteReservation } = require('./api/delete_reservation');
const { deleteData: deleteBook } = require('./api/delete_book');
const { deleteData: deleteAuthor } = require('./api/delete_author');
const { deleteData: deleteCategory } = require('./api/delete_category');
const { deleteData: deleteAuthorFromBook } = require('./api/delete_author_from_book');
const { deleteData: deleteCategoryFromBook } = require('./api/delete_category_from_book');
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

// Define a route handler for /allstudents
app.get('/allstudents', (req, res) => {
  fetchStudents((err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /allstudents from users school
app.get('/allstudents_fromusers_school/:id', (req, res) => {
  const userid = req.params.id; // Get the school ID from the request parameters

  fetchStudentFromUserSchool(userid, (err, results) => {
    if (err) {
      console.error('Error fetching students data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /allteachers from users school
app.get('/allteachers_fromusers_school/:id', (req, res) => {
  const userid = req.params.id; // Get the school ID from the request parameters

  fetchTeachersFromUserSchool(userid, (err, results) => {
    if (err) {
      console.error('Error fetching teachers data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /allhandlers from users school
app.get('/allhandlers_fromusers_school/:id', (req, res) => {
  const userid = req.params.id; // Get the school ID from the request parameters

  fetchHandlersFromUserSchool(userid, (err, results) => {
    if (err) {
      console.error('Error fetching handlers data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /allteachers
app.get('/allteachers', (req, res) => {
  fetchTeachers((err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /allhandlers
app.get('/allhandlers', (req, res) => {
  fetchHandlers((err, results) => {
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

// Define a route handler for /top_category_combos
app.get('/top_category_combos', (req, res) => {
  fetchTopCategoryCombos((err, results) => {
    if (err) {
      console.error('Error fetching category data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /authors_less_than_five
app.get('/authors_less_than_five', (req, res) => {
  fetchAuthLessThanFive((err, results) => {
    if (err) {
      console.error('Error fetching author data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /books rented by user
app.get('/books_rented_by_user/:id', (req, res) => {
  const userid = req.params.id; // Get the school ID from the request parameters

  fetchBooksRentedByUser(userid, (err, results) => {
    if (err) {
      console.error('Error fetching Book data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});


// Define a route handler for /books reserved by user
app.get('/books_reserved_by_user/:id', (req, res) => {
  const userid = req.params.id; // Get the school ID from the request parameters

  fetchBooksReservedByUser(userid, (err, results) => {
    if (err) {
      console.error('Error fetching Book data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for users school
app.get('/users_school/:userid', (req, res) => {
  const userid = req.params.userid; // Get the school ID from the request parameters

  fetchUsersSchool(userid, (err, results) => {
    if (err) {
      console.error('Error fetching Users data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for adding a user
app.get('/adduser/:username/:password/:user_name/:birthday/:email', (req, res) => {
  const { username, password, user_name, birthday, email } = req.params; // Get the user data from the request body

  addUser(username, password, user_name, birthday, email, (err, result) => {
    if (err) {
      console.error('Error adding teacher:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).send('User added successfully');
  });
});


// Define a route handler for adding a student
app.get('/addstudent/:userid/:schoolid', (req, res) => {
  const { userid, schoolid } = req.params; // Get the user data from the request body

  addStudent(userid, schoolid, (err, result) => {
    if (err) {
      console.error('Error adding student:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).send('Student added successfully');
  });
});

// Define a route handler for adding a teacher
app.get('/addteacher/:userid/:schoolid', (req, res) => {//vazume to userid ke school id mesa sto teacher table 
  const { userid, schoolid } = req.params; // Get the user data from the request body
  addTeacher(userid, schoolid, (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).send('Teacher added successfully');
  });
});

// Define a route handler for adding a handler
app.get('/addhandler/:userid/:schoolid', (req, res) => {
  const { userid, schoolid } = req.params; // Get the user data from the request body

  addHandler(userid, schoolid, (err, result) => {
    if (err) {
      console.error('Error adding handler:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).send('Handler added successfully');
  });
});

// Define a route handler for adding an author
app.get('/addauthor/:authorname', (req, res) => {
  const { authorname } = req.params; // Get the user data from the request body
  addAuthor(authorname, (err, result) => {
    if (err) {
      console.error('Error adding author:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    res.status(200).send('Author added successfully');
  });
});

// Define a route handler for adding an category
app.get('/addcategory/:categoryname', (req, res) => {
  const { categoryname } = req.params; // Get the user data from the request body
  addCategory(categoryname, (err, result) => {
    if (err) {
      console.error('Error adding category:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).send('Category added successfully');
  });
});

// Define a route handler for adding a review
app.get('/addreview/:userid/:schoolid/:isbn/:comments/:likert', (req, res) => {//vazume to userid,school id ke isbn mesa sto review table 
  const { userid, schoolid, isbn, comments, likert} = req.params; // Get the user data from the request body
  addReview(userid, schoolid, isbn, comments, likert,  (err, result) => {
    if (err) {
      console.error('Error adding review:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Review added successfully');
  });
});

// Define a route handler for adding a school
app.get('/addschool/:school_name/:address/:city/:telephone/:email/:principal_fullname', (req, res) => {
  const { school_name, address, city, telephone, email, principal_fullname} = req.params; // Get the user data from the request body
  addSchool(school_name, address, city, telephone, email, principal_fullname,  (err, result) => {
    if (err) {
      console.error('Error adding school:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('School added successfully');
  });
});

// Define a route handler for adding a book
app.get('/addbook/:isbn/:title/:publisher/:pages/:summary/:image/:book_language/:keywords', (req, res) => {
  const { isbn, title, publisher, pages, summary, image, book_language, keywords} = req.params; // Get the user data from the request body
  addBook(isbn, title, publisher, pages, summary, image, book_language, keywords,  (err, result) => {
    if (err) {
      console.error('Error adding book:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Book added successfully');
  });
});

// Define a route handler for adding an author to a book
app.get('/addauthortobook/:isbn/:authorid', (req, res) => {
  const { isbn, authorid} = req.params; // Get the user data from the request body
  addAuthorToBook(isbn, authorid,  (err, result) => {
    if (err) {
      console.error('Error adding author to book:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Author added to book successfully');
  });
});

// Define a route handler for adding a category to a book
app.get('/addcategorytobook/:isbn/:categoryid', (req, res) => {
  const { isbn, categoryid} = req.params; // Get the user data from the request body
  addCategoryToBook(isbn, categoryid,  (err, result) => {
    if (err) {
      console.error('Error adding category to book:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Category added to book successfully');
  });
});

// Define a route handler for adding a rent
app.get('/addrent/:user_id/:isbn/:school_id/:date_of_rent', (req, res) => {
  const { user_id, isbn, school_id, date_of_rent} = req.params; // Get the user data from the request body
  addRent(user_id, isbn, school_id, date_of_rent,  (err, result) => {
    if (err) {
      console.error('Error adding rent:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Rent added successfully');
  });
});

// Define a route handler for adding a reservation
app.get('/addreservation/:user_id/:isbn/:school_id/:date_of_reservation', (req, res) => {
  const { user_id, isbn, school_id, date_of_reservation} = req.params; // Get the user data from the request body
  addReservation(user_id, isbn, school_id, date_of_reservation,  (err, result) => {
    if (err) {
      console.error('Error adding reservation:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Reservation added successfully');
  });
});

// Define a route handler for adding a book to school
app.get('/addbooktoschool/:isbn/:school_id/:copys', (req, res) => {
  const { isbn, school_id, copys} = req.params; // Get the user data from the request body
  addBookToSchool(isbn, school_id, copys, (err, result) => {
    if (err) {
      console.error('Error adding book to school:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Book added to school successfully');
  });
});

// Define a route handler for password update
app.get('/updatepassword/:password/:userid', (req, res) => {
  const { password, userid} = req.params; // Get the user data from the request body
  updatePassword(password, userid, (err, result) => {
    if (err) {
      console.error('Error changing password:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Password changed successfully');
  });
});

// Define a route handler for copys update
app.get('/update_copys/:schoolid/:isbn/:copys', (req, res) => {
  const { schoolid, isbn, copys} = req.params; // Get the user data from the request body
  updateCopys(schoolid, isbn, copys, (err, result) => {
    if (err) {
      console.error('Error changing copys:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Copys changed successfully');
  });
});

// Define a route handler for approrves update
app.get('/update_approves/:approved/:userid', (req, res) => {
  const { approved, userid} = req.params; // Get the user data from the request body
  updateApproves(approved, userid, (err, result) => {
    if (err) {
      console.error('Error changing approved status:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Approved status changed successfully');
  });
});

// Define a route handler for teacher update
app.get('/update_teacher/:userid/:name/:username/:birthday/:email', (req, res) => {
  const { userid, name, username, birthday, email} = req.params; // Get the user data from the request body
  updateTeacher(userid,name, username, birthday, email, (err, result) => {
    if (err) {
      console.error('Error changing teacher data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Data changed successfully');
  });
});

// Define a route handler for book update
app.get('/updatebook/:isbn/:title/:publisher/:page/:summary/:language/:keywords/:image', (req, res) => {
  const { isbn, title, publisher, page, summary, language, keywords, image} = req.params; // Get the user data from the request body
  updateBook(isbn, title, publisher, page, summary, language, keywords, image, (err, result) => {
    if (err) {
      console.error('Error changing book data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Book changed successfully');
  });
});

// Define a route handler to delete user
app.get('/delete_user/:userid', (req, res) => {
  const { userid} = req.params; // Get the user data from the request body
  deleteUser(userid, (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('User deleted successfully');
  });
});

// Define a route handler to delete school
app.get('/delete_school/:schoolid', (req, res) => {
  const { schoolid} = req.params; // Get the user data from the request body
  deleteSchool(schoolid, (err, result) => {
    if (err) {
      console.error('Error deleting school:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('School deleted successfully');
  });
});

// Define a route handler to delete book
app.get('/delete_book/:isbn', (req, res) => {
  const { isbn} = req.params; // Get the user data from the request body
  deleteBook(isbn, (err, result) => {
    if (err) {
      console.error('Error deleting book:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Book deleted successfully');
  });
});

// Define a route handler to delete book
app.get('/delete_book_from_school/:schoolid/:isbn', (req, res) => {
  const { schoolid, isbn} = req.params; // Get the user data from the request body
  deleteBookFromSchool(schoolid, isbn, (err, result) => {
    if (err) {
      console.error('Error deleting book from school:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Book deleted successfully');
  });
});

// Define a route handler to delete review
app.get('/delete_review/:reviewid', (req, res) => {
  const { reviewid} = req.params; // Get the user data from the request body
  deleteReview(reviewid, (err, result) => {
    if (err) {
      console.error('Error deleting review:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Review deleted successfully');
  });
});

// Define a route handler to delete rent
app.get('/delete_rent/:rentid', (req, res) => {
  const { rentid} = req.params; // Get the user data from the request body
  deleteRent(rentid, (err, result) => {
    if (err) {
      console.error('Error deleting rent:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Rent deleted successfully');
  });
});

// Define a route handler to delete reservation
app.get('/delete_reservation/:reservationid', (req, res) => {
  const { reservationid} = req.params; // Get the user data from the request body
  deleteReservation(reservationid, (err, result) => {
    if (err) {
      console.error('Error deleting reservation:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Reservation deleted successfully');
  });
});

// Define a route handler to delete author
app.get('/delete_author/:authorid', (req, res) => {
  const { authorid} = req.params; // Get the user data from the request body
  deleteAuthor(authorid, (err, result) => {
    if (err) {
      console.error('Error deleting author:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Author deleted successfully');
  });
});

// Define a route handler to delete category
app.get('/delete_category/:categoryid', (req, res) => {
  const { categoryid} = req.params; // Get the user data from the request body
  deleteCategory(categoryid, (err, result) => {
    if (err) {
      console.error('Error deleting category:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Category deleted successfully');
  });
});

// Define a route handler to delete author from book
app.get('/delete_author_from_book/:authorid/:isbn', (req, res) => {
  const { authorid, isbn} = req.params; // Get the user data from the request body
  deleteAuthorFromBook(authorid, isbn, (err, result) => {
    if (err) {
      console.error('Error deleting author from book:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Author deleted from book successfully');
  });
});

// Define a route handler to delete category from book
app.get('/delete_category_from_book/:categoryid/:isbn', (req, res) => {
  const { categoryid, isbn} = req.params; // Get the user data from the request body
  deleteCategoryFromBook(categoryid, isbn, (err, result) => {
    if (err) {
      console.error('Error deleting category from book:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Category deleted from book successfully');
  });
});

// Start the server
const port = 3305;
//const ipAddress = '192.168.1.31';
app.listen(port, () => {//ipAddress, 
  console.log(`Server is running on ${port}`);//${ipAddress}:
});