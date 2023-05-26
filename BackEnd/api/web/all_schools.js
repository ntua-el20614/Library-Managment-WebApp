const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/",async(req,res) =>{
await apiutils.handleRequest(true,req,res,"Got all schools!",
async(conn) =>{//entoli gia na paw stin vasi na ferw ta sxolia
    const return_schools = await conn.query(
        "SELECT * FROM school"
    );

    json_res = []; //json file pou tha epistrepsume ta sxolia

    for (elem of return_schools){
        json_res.push({//vazw 1-1 ola ta sxolia sto json

            //onomasies swstes apo tin vasi mas:
            schoolID: elem.school_id,
            school_Name: elem.school_name,
        });
    }

    //to parakatw if gia na epistrepsume Comma-Separated-Values or Json
    if (req.query.format == "csv") {
        const opts = {
          fields: ["schoolID", "school_Name"],
        };
        return new Parser(opts).parse(json_res);
      } else {
        return json_res;
      }
    }

); 
});

module.exports = router;