const express = require("express");
const app = require("./app");
const chalk = require("chalk");
//const https = require('https');
//const fs = require('fs');

app.use(express.static("public"));

const port = process.env.PORT || 9103;
const baseurl = "/libraries";

// const key = fs.readFileSync('./security/key.pem');
// const cert = fs.readFileSync('./security/cert.pem');

// https.createServer({key, cert}, app).listen(port, () => {
app.listen(port, () => {
  console.log(
    chalk.green(`🚀 Server running at: https://localhost:${port}${baseurl}`)
  );
});
