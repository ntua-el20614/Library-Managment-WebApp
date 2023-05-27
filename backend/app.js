const express = require("express");
const bodyParser = require("body-parser");

const app = express();


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
const all_users = require("./api/all_users");
const all_schools = require("./api/all_schools");
const all_schools = require("./api/all_authors");
const all_books = require("./api/all_books");
const all_rents = require("./api/all_rents");
const teacher_loans = require("./api/teacher_loans");
const teachers_authors = require("./api/authors_teachers_category");
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
app.use("/all_schools", all_schools);
app.use("/all_schools", all_authors);
app.use("/all_books/:id", all_books);
app.use("/all_rents/:year/:month", all_rents);
app.use("/teacher_loans", teacher_loans);
app.use("//teachers_authors/:category", authors_teachers_category);
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

 

// In case of an endpoint does not exist
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found!!" });
});

module.exports = app;
