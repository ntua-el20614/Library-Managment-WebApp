const express = require("express");
const bodyParser = require("body-parser");

/* ROUTES and how to import routes */

const allusers = require("./api/allusers");
const all_books = require("./api/web/all_books");
const all_schools = require("./api/all_schools");
////////////////////////////////////////////////////////////////
const app = express();

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
const baseurl = "/libraries";
//app.route(`${baseurl}/demo`).get(controleer);
////////////////////////////////////////////////////////////////
app.use(baseurl + "/allusers", allusers);
app.use(baseurl + "/all_books", all_books);
app.use(baseurl + "/all_schools", all_schools);

// In case of an endpoint does not exist
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found!!" });
});

module.exports = app;
