const express = require("express");
const bodyParser = require("body-parser");

const app = express();


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
const all_users = require("./api/all_users");
const allstudents = require("./api/allstudents");
const allteachers = require("./api/allteachers");
const allhandlers = require("./api/allhandlers");
const all_schools = require("./api/all_schools");
const all_schools = require("./api/all_authors");
const all_books = require("./api/all_books");
const all_rents = require("./api/all_rents");
const teacher_loans = require("./api/teacher_loans");
const teachers_authors = require("./api/authors_teachers_category");
const zero_rent_authors = require("./api/zero_rent_authors");
const top_category_combos = require("./api/top_category_combos");
const authors_less_than_five = require("./api/authors_less_than_five");
const books_rented_by_user = require("./api/books_rented_by_user");
const books_school_by_title = require("./api/books_school_by_title");
const books_school_by_category = require("./api/books_school_by_category");
const books_school_by_author = require("./api/books_school_by_author");
const allstudents_fromusers_school = require("./api/allstudents_fromusers_school");
const allteachers_fromusers_school = require("./api/allteachers_fromusers_school");
const allhandlers_fromusers_school = require("./api/allhandlers_fromusers_school");
const adduser = require("./api/adduser");
const addteacher = require("./api/addteacher");
const addstudent = require("./api/addstudent");
const addhandler = require("./api/addhandler");
const addauthor = require("./api/addauthor");
const addcategory = require("./api/addcategory");
const addreview = require("./api/addreview");
const addschool = require("./api/addschool");
const addbook = require("./api/addbook");
const addauthortobook = require("./api/addauthortobook");
const addcategorytobook = require("./api/addcategorytobook");
const addrent = require("./api/addrent");
const addreservation = require("./api/addreservation");
const addbooktoschool = require("./api/addbooktoschool");
const updatepassword = require("./api/updatepassword");
const update_approves = require("./api/update_approves");
const update_teacher = require("./api/update_teacher");
const update_copys = require("./api/update_copys");
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


console.log(`NODE_ENV = |${process.env.NODE_ENV}|`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-OBSERVATORY-AUTH"
  );
  next();
});

// /* Routes used by our project */ 
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
app.use("/all_users", all_users);
app.use("/allstudents", allstudents);
app.use("/allteachers", allteachers);
app.use("/allhandlers", allhandlers);
app.use("/all_schools", all_schools);
app.use("/all_schools", all_authors);
app.use("/all_books/:id", all_books);
app.use("/all_rents/:year/:month", all_rents);
app.use("/teacher_loans", teacher_loans);
app.use("/teachers_authors/:category", teachers_authors);
app.use("/zero_rent_authors", zero_rent_authors);
app.use("/top_category_combos", top_category_combos);
app.use("/authors_less_than_five", authors_less_than_five);
app.use("/books_rented_by_user/:id", books_rented_by_user);
app.use("/books_school_by_title/:id/:title", books_school_by_title);
app.use("/books_school_by_category/:id/:category", books_school_by_category);
app.use("/books_school_by_author/:id/:author", books_school_by_author);
app.use("/allstudents_fromusers_school/:id", allstudents_fromusers_school);
app.use("/allteachers_fromusers_school/:id", allteachers_fromusers_school);
app.use("/allhandlers_fromusers_school/:id", allhandlers_fromusers_school);
////////////////////////////////////////////////////////////////
app.use("/adduser/:username/:password/:user_name/:birthday/:email", adduser);
app.use("/addteacher/:userid/:schoolid", addteacher);
app.use("/addstudent/:userid/:schoolid", addstudent);
app.use("/addhandler/:userid/:schoolid", addhandler);
app.use("/addauthor/:authorname", addauthor);
app.use("/addcategory/:categoryname", addcategory);
app.use("/addreview/:userid/:schoolid/:isbn/:comments/:likert", addreview);
app.use("/addschool/:school_name/:address/:city/:telephone/:email/:principal_fullname", addschool);
app.use("/addbook/:isbn/:title/:publisher/:pages/:summary/:image/:book_language/:keywords", addbook);
app.use("/addauthortobook/:isbn/:authorid", addauthortobook);
app.use("/addcategorytobook/:isbn/:categoryid", addcategorytobook);
app.use("/addrent/:user_id/:isbn/:school_id/:date_of_rent", addrent);
app.use("/addreservation/:user_id/:isbn/:school_id/:date_of_reservation", addreservation);
app.use("/addbooktoschool/:isbn/:school_id/:copys/:available_copys", addbooktoschool);
////////////////////////////////////////////////////////////////
app.use("/updatepassword/:password/:userid", updatepassword);
app.use("/update_approves/:approved/:userid", update_approves);
app.use("/update_teacher/:userid/:name/:username/:birthday/:email", update_teacher);
app.use("/update_copys/:schoolid/:isbn/:copys", update_copys);
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

 

// In case of an endpoint does not exist
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found!!" });
});

module.exports = app;
