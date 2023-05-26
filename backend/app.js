const express = require("express");
const bodyParser = require("body-parser");

const app = express();


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
const allusers = require("./api/allusers");
const all_books = require("./api/all_books");
const all_schools = require("./api/all_schools");
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
app.use("/all_users", allusers);
app.use("/all_books", all_books);
app.use("/all_schools", all_schools);
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

 

// In case of an endpoint does not exist
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found!!" });
});

module.exports = app;
