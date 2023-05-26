const express = require("express");
const apiutils = require("../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

const conn = require("../dbconnector.js");

router.get("/", async (req, res) => {
  await apiutils.handleRequest(
    true,
    req,
    res,
    "Successful retrieval of all users!",
    async (conn) => {
      const ans_list = await conn.query("SELECT * FROM school");

      json_res = [];
      for (elem of ans_list) {
        json_res.push({
          userID: elem.school_id,//elem.user_id,
          username: elem.school_name,//elem.username,
        });
      }

      if (req.query.format == "csv") {
        const opts = {
          fields: ["userID", "username"],
        };
        return new Parser(opts).parse(json_res);
      } else {
        return json_res;
      }
    }
  );
});

module.exports = router;
