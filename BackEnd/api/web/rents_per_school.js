const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:id",async(req,res) =>{//kathe sxolio exei diki tou viviliothiki
//ara to id tou sxoliou tha mas dinei tin lista me ta vivlia pou exei
const express = require('express');
const app = express();
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'your_database_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

app.use(express.json());

app.post('/api/loans', (req, res) => {
  const { year, month } = req.body;

  // Perform database queries and calculations to get the total number of loans per school
  const queryString = `
    SELECT s.school_name, COUNT(*) AS total_loans
    FROM rent AS r
    JOIN school AS s ON r.school_id = s.school_id
    WHERE YEAR(r.date_of_rent) = ? AND MONTH(r.date_of_rent) = ?
    GROUP BY r.school_id
  `;

  pool.query(queryString, [year, month], (error, results) => {
    if (error) {
      console.error('Error executing database query:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the data' });
    } else {
      const loanList = results.map(row => ({
        schoolName: row.school_name,
        totalLoans: row.total_loans
      }));
      res.json(loanList);
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
/*await apiutils.requestWrapper(true,req,res,"Got all rents from each school!",
async(conn) =>{//entoli gia na paw stin vasi na ferw ta vivlia
    const total_rents = await conn.query(

        //pio katw des ta "book", "book.school_id" gia tin vasi mas
       [req.params.year]
            [req.params.month]
            const rents_ps = await conn.query("
  SELECT s.school_id, s.school_name, COUNT(*) AS total_rent,
  FROM rent r,
  JOIN school s ON r.school_id = s.school_id,
  WHERE YEAR(r.date_of_rent) = ?,
   AND MONTH(r.date_of_rent) = ?, 
  GROUP BY s.school_id, s.school_name,

  ");
    
    );

    json_res = []; //json file pou tha epistrepsume ta vivlia

    for (elem of query){
        json_res.push({//vazw 1-1 ola ta vivlia sto json

            //onomasies swstes apo tin vasi mas:

            
            schoolID: elem.school_id,
            total_rents: elem.total_rents,
            name: elem.school_name
        });
    }

    //to parakatw if gia na epistrepsume Comma-Separated-Values or Json
    if (req.query.format == "csv") {
        const opts = {
          fields: [ "schoolID","school_name", "total_rents"],
        };
        return new Parser(opts).parse(json_res);
      } else {
        return json_res;
      }
    }

); 
});
*/
module.exports = router;




