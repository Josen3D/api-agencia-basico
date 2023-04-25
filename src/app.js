//use dotenv to use env variables
require("dotenv").config();
//Import express and cors
const express = require("express");
const cors = require("cors");

//import DB connection
const { dbConnect } = require("./config/mysql");

//create express app
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/**
 * Invoke the routes
 */
app.use("/api", require("./routes"));

//put server to listen
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});

//connect to DB
dbConnect();
