const express = require("express");
const bodyParser = require("body-parser");

/* ROUTES and how to import routes */
 ////////////////////////////////////////////////////////////////
app.use("/all_users", allusers);
app.use("/all_books", all_books);
app.use("/all_schools", all_schools);
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

//app.route(`${baseurl}/demo`).get(controleer);
////////////////////////////////////////////////////////////////
// Define a route handler for fetching data
app.get("/all_users", (req, res) => {
  fetchUsers((err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});


app.get("/all_schools", (req, res) => {
  fetchSchools((err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});






// In case of an endpoint does not exist
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found!!" });
});

module.exports = app;
