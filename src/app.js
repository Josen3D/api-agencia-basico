//import express
const express = require("express");
//import dotenv config
require("dotenv/config");
const cors = require("cors");

//import mysql connection
const { dbConnect } = require("./config/mysql");

//create express app
const app = express();

// middleware to use cors and json data
app.use(cors());
app.use(express.json());

// port
const PORT = process.env.PORT || 3000;

// invoke the routes
app.use("/api", require("./routes"));
// put server to listen
app.listen(PORT, () => console.log("server running on port: " + PORT));
//connect to DB
dbConnect();
