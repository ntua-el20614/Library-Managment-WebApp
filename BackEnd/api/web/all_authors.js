const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/",async(req,res) =>{
await apiutils.requestWrapper(true,req,res,"Got all authors!",
async(conn) =>{//entoli gia na paw stin vasi na ferw ta sxolia
    const return_authors = await conn.query("SELECT * FROM authors");

    json_res = []; //json file pou tha epistrepsume ta sxolia

    for (elem of return_schools){
        json_res.push({//vazw 1-1 ola ta sxolia sto json

            //onomasies swstes apo tin vasi mas:
            author_ID: elem.authorid,//apo tin vasi en to authorid
            author_name: elem.authorname,//apo tin vasi en to authroname
            author_surname: elem.authorsurname // authorsurname
        });
    }

    //to parakatw if gia na epistrepsume Comma-Separated-Values or Json
    if (req.query.format == "csv") {
        const opts = {
          fields: ["schoolID", "school_name"],
        };
        return new Parser(opts).parse(json_res);
      } else {
        return json_res;
      }
    }

); 
});

module.exports = router;