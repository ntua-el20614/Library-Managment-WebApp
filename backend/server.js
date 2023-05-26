const express = require('express');


const { fetchData: fetchUsers } = require('./api/allusers');
const { fetchData: fetchSchools } = require('./api/all_schools');


const app = express();


  

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});



// Start the server
const port = 3305;
//const ipAddress = '192.168.1.31';
app.listen(port, () => {//ipAddress, () => {
  console.log(`Server is running on :${port}`);//${ipAddress}:${port}`);
});

