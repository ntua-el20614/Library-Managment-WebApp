async function requestWrapper(expectsData, req, res, successMsg, funcBody) {
  let failReason = "Failed to connect to DB";
  try {
    const pool = await require("./dbconnector");
    const conn = await pool.getConnection();
    try {
      if (expectsData) {
        const data = await funcBody(conn);

        if (req.query.format == "csv") {
          res.set("Content-Type", "text/csv");
          res.status(200).send(data);
        } else {
          res.status(200).json(data);
        }
      } else {
        await funcBody(conn);
        res.status(204).json({ status: "OK" });
      }
      console.log(successMsg);
    } finally {
      conn.release();
      failReason = "Failed to execute DB query";
    }
  } catch (err) {
    res.status(500).json({ status: "failed", reason: failReason });
    console.log(err);
  }
}

module.exports.requestWrapper = requestWrapper;
