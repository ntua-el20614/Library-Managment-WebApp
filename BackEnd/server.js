const express = require("express");
const app = require("./app");
//const chalk = require("chalk");
//const https = require('https');
//const fs = require('fs');

//app.use(express.static("public"));

app.get('/',(req,res) => {
  res.send('Hello wolrd!');

});


const port = process.env.PORT || 5000;//elegxos an mporoume sto 5000
const baseurl = "/libraries";

// const key = fs.readFileSync('./security/key.pem');
// const cert = fs.readFileSync('./security/cert.pem');

// https.createServer({key, cert}, app).listen(port, () => {
app.listen(port, () => {
  console.log(
    `🚀 Server running at: https://localhost:${port}${baseurl}`
  );
});
