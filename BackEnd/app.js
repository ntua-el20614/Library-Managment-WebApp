const express = require("express");
const bodyParser = require("body-parser");

/* ROUTES and how to import routes */
const allusers = require("./api/allusers");
const allschools = require("./api/web/allschools");
const validate = require("./api/web/validate");
const findtype = require("./api/web/findtype");
const check = require("./api/web/check");
const adduserapp = require("./api/web/adduserapp");
const changeuser = require("./api/web/changeuser");
const deleteuser = require("./api/web/deleteuser");
const approveuser = require("./api/web/approveuser");
const unapproveuser = require("./api/web/unapproveuser");
const addoperator = require("./api/web/addoperator");
const approvedops = require("./api/web/approvedops");
const approvedusersofschl = require("./api/web/approvedusersofschl");
const notapprovedusersofschl = require("./api/web/notapprovedusersofschl");
const notapprovedops = require("./api/web/notapprovedops");
const opschool = require("./api/web/opschool");
const addprofessor = require("./api/web/addprofessor");
const addstudent = require("./api/web/addstudent");
const userinfo = require("./api/web/userinfo");
const newschool = require("./api/web/newschool");
const changeschool = require("./api/web/changeschool");
const schlinfo = require("./api/web/schlinfo");
const addauthor = require("./api/web/addauthor");
const allauthors = require("./api/web/allauthors");
const addauthorofbook = require("./api/web/addauthorofbook");
const addcategory = require("./api/web/addcategory");
const allcategories = require("./api/web/allcategories");
const addcategoryofbook = require("./api/web/addcategoryofbook");
const newbook = require("./api/web/newbook");
const allbooks = require("./api/web/allbooks");
const bookinfo = require("./api/web/bookinfo");
const changebook = require("./api/web/changebook");
const deletebook = require("./api/web/deletebook");
const makereservation = require("./api/web/makereservation");
const reservationinfo = require("./api/web/reservationinfo");
const deletereservation = require("./api/web/deletereservation");
const schoolreservations = require("./api/web/schoolreservations");
const userreservations = require("./api/web/userreservations");
const makerental = require("./api/web/makerental");
const rentalinfo = require("./api/web/rentalinfo");
const rentalreturn = require("./api/web/rentalreturn");
const lateschoolrentals = require("./api/web/lateschoolrentals");
const lateuserrentals = require("./api/web/lateuserrentals");
const ongoingschoolrentals = require("./api/web/ongoingschoolrentals");
const ongoinguserrentals = require("./api/web/ongoinguserrentals");
const oldschoolrentals = require("./api/web/oldschoolrentals");
const olduserrentals = require("./api/web/olduserrentals");
const makereview = require("./api/web/makereview");
const approvereview = require("./api/web/approvereview");
const deletereview = require("./api/web/deletereview");
const notapprovedreviews = require("./api/web/notapprovedreviews");
const bookreviews = require("./api/web/bookreviews");
const booklikert = require("./api/web/booklikert");
//const { controleer } = require("./api/web/skotinos_arxontas");
/* end of ROUTES and how to import routes */

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
app.use(baseurl + "/allusers", allusers);
app.use(baseurl + "/web/allschools", allschools);
app.use(baseurl + "/web/validate", validate);
app.use(baseurl + "/web/findtype", findtype);
app.use(baseurl + "/web/check", check);
app.use(baseurl + "/web/adduserapp", adduserapp);
app.use(baseurl + "/web/approveuser", approveuser);
app.use(baseurl + "/web/unapproveuser", unapproveuser);
app.use(baseurl + "/web/changeuser", changeuser);
app.use(baseurl + "/web/deleteuser", deleteuser);
app.use(baseurl + "/web/addoperator", addoperator);
app.use(baseurl + "/web/approvedops", approvedops);
app.use(baseurl + "/web/approvedusersofschl", approvedusersofschl);
app.use(baseurl + "/web/notapprovedusersofschl", notapprovedusersofschl);
app.use(baseurl + "/web/notapprovedops", notapprovedops);
app.use(baseurl + "/web/opschool", opschool);
app.use(baseurl + "/web/addprofessor", addprofessor);
app.use(baseurl + "/web/addstudent", addstudent);
app.use(baseurl + "/web/userinfo", userinfo);
app.use(baseurl + "/web/newschool", newschool);
app.use(baseurl + "/web/changeschool", changeschool);
app.use(baseurl + "/web/schlinfo", schlinfo);
app.use(baseurl + "/web/addauthor", addauthor);
app.use(baseurl + "/web/allauthors", allauthors);
app.use(baseurl + "/web/addauthorofbook", addauthorofbook);
app.use(baseurl + "/web/addcategory", addcategory);
app.use(baseurl + "/web/allcategories", allcategories);
app.use(baseurl + "/web/addcategoryofbook", addcategoryofbook);
app.use(baseurl + "/web/newbook", newbook);
app.use(baseurl + "/web/allbooks", allbooks);
app.use(baseurl + "/web/bookinfo", bookinfo);
app.use(baseurl + "/web/changebook", changebook);
app.use(baseurl + "/web/deletebook", deletebook);
app.use(baseurl + "/web/makereservation", makereservation);
app.use(baseurl + "/web/reservationinfo", reservationinfo);
app.use(baseurl + "/web/deletereservation", deletereservation);
app.use(baseurl + "/web/schoolreservations", schoolreservations);
app.use(baseurl + "/web/userreservations", userreservations);
app.use(baseurl + "/web/makerental", makerental);
app.use(baseurl + "/web/rentalinfo", rentalinfo);
app.use(baseurl + "/web/rentalreturn", rentalreturn);
app.use(baseurl + "/web/lateschoolrentals", lateschoolrentals);
app.use(baseurl + "/web/lateuserrentals", lateuserrentals);
app.use(baseurl + "/web/ongoingschoolrentals", ongoingschoolrentals);
app.use(baseurl + "/web/ongoinguserrentals", ongoinguserrentals);
app.use(baseurl + "/web/oldschoolrentals", oldschoolrentals);
app.use(baseurl + "/web/olduserrentals", olduserrentals);
app.use(baseurl + "/web/makereview", makereview);
app.use(baseurl + "/web/approvereview", approvereview);
app.use(baseurl + "/web/deletereview", deletereview);
app.use(baseurl + "/web/notapprovedreviews", notapprovedreviews);
app.use(baseurl + "/web/bookreviews", bookreviews);
app.use(baseurl + "/web/booklikert", booklikert);
// /*End of routes used by our project */

// In case of an endpoint does not exist
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found!" });
});

module.exports = app;
