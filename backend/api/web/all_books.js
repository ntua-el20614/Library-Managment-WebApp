const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:id",async(req,res) =>{//kathe sxolio exei diki tou viviliothiki
//ara to id tou sxoliou tha mas dinei tin lista me ta vivlia pou exei

await apiutils.handleRequest(true,req,res,"Got all books!",
async(conn) =>{//entoli gia na paw stin vasi na ferw ta vivlia
    const return_books = await conn.query(

        //pio katw des ta "book", "book.school_id" gia tin vasi mas

        "SELECT * FROM book Where book.school_id=?",//analoga me tin vasi mas afto
        [req.params.id]//edw an ktipisei error prepei na einai int,
        //parseInt ""AAAANN xreiastei!""
    );

    json_res = []; //json file pou tha epistrepsume ta vivlia

    for (elem of return_books){
        json_res.push({//vazw 1-1 ola ta vivlia sto json

            //onomasies swstes apo tin vasi mas:

            isbn: elem.isbn,
            schoolID: elem.school_id,
            title: elem.title,
        });
    }

    //to parakatw if gia na epistrepsume Comma-Separated-Values or Json
    if (req.query.format == "csv") {
        const opts = {
          fields: ["isbn", "schoolID", "title"],
        };
        return new Parser(opts).parse(json_res);
      } else {
        return json_res;
      }
    }

); 
});

module.exports = router;