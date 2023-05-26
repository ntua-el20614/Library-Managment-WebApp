const express = require("express");
const app = require("./app.js");
//const chalk = require("chalk");
//const https = require('https');
//const fs = require('fs');

//app.use(express.static("public"));

app.get('/',(req,res) => {
  res.send('Hello wolrd!');

});


const port = 3306;
const ipaddress = "192.168.1.31";
//const baseurl = "/library_project";

// const key = fs.readFileSync('./security/key.pem');
// const cert = fs.readFileSync('./security/cert.pem');

// https.createServer({key, cert}, app).listen(port, () => {
app.listen(port, () => {
  console.log(
    `🚀 Server running at: https://localhost:${ipaddress}:${port}`
  );
});
