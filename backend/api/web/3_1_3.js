const express = require("express");
const bring = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.use(express.json());
router.get("/", async (req, res) => {
await bring.handleRequest(true,req,res,"got all teachers(<40) who borrowed the most books",
async(conn) =>{
  // Perform database queries and calculations to get the total number of loans per school
  const ans = await conn.query(`
  SELECT u.user_id, u.user_name, u.user_surname, u.user_birthday, COUNT(*) AS book_count
  FROM users u
  JOIN teacher t ON u.user_id = t.user_id
  JOIN rent r ON u.user_id = r.user_id
  JOIN book b ON r.isbn = b.isbn AND r.school_id = b.school_id
  WHERE TIMESTAMPDIFF(YEAR, u.user_birthday, CURDATE()) < 40
  GROUP BY u.user_id
  HAVING COUNT(*) = (
    SELECT COUNT(*)
    FROM users uu
    JOIN teacher tt ON uu.user_id = tt.user_id
    JOIN rent rr ON uu.user_id = rr.user_id
    JOIN book bb ON rr.isbn = bb.isbn AND rr.school_id = bb.school_id
    WHERE uu.user_id = u.user_id
    GROUP BY uu.user_id
    ORDER BY COUNT(*) DESC
    LIMIT 1
  )
`);

let json_list=[];
for(elem of ans){
  json_list.push({
    teacher_id: elem.user_id,
  teacher_name: elem.user_name,
  teacher_surname: elem.user_surname,
  teacher_birthday: elem.user_birthday,
  book_count: elem.total_loans,
  });
}
if (req.query.format == "csv") {
  const opts = {
    fields: ["teacher_id", "teacher_name", "teacher_surname","teacher_birthday","book_count"],
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