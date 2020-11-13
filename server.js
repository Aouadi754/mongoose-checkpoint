const express = require("express");
const app = express();
const connectDB = require("./config/database");

//4- pase data
app.use(express.json());
//3- routes

//3- routes
app.use('/', require("./Routes/Person"));
//2- connect DB
connectDB();    
//1-run server
const port = 6200;
app.listen(port, (err) => {
  err ? console.log(err) : console.log(`the server is running on ${port}`);
});