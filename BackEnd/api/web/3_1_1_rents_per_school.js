const express = require("express");
const bring = require("../../request_handler");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();



// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'your_database_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

router.use(express.json());
router.post("/:year/:month", async (req, res) => {
await bring.handleRequest(true,req,res,"Got all rents from each school!",
async(conn) =>{
  // Perform database queries and calculations to get the total number of loans per school
  const ans = await conn.query(
    "SELECT s.school_id, s.school_name, COUNT(*) AS total_loans" +
    "FROM rent AS r" +
    "JOIN school AS s ON r.school_id = s.school_id" +
    "WHERE YEAR(r.date_of_rent) = ? AND MONTH(r.date_of_rent) = ?" +
    "GROUP BY r.school_id",
    [req.params.year,req.params.month]);

let json_list=[];
for(elem of ans){
  json_list.push({
    school_id: elem.school_id,
  school_name: elem.school_name,
  total_loans: elem.total_loans,
  });
}
if (req.query.format == "csv") {
  const opts = {
    fields: ["school_id", "school_name", "total_loans"],
  };
  return new Parser(opts).parse(json_res);
} else {
  return json_res;
}
  });
});
//tuta eniksero an ine xriazunte evalenta o chat
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
module.exports = router;




