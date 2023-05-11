// import sequelize
const { Sequelize } = require("sequelize");

//create env variables to use
const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

//creates a new sequelize instance
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

//creates the mysql DB connection
const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("COnnected to mysql");
  } catch (error) {
    console.log("MYSQL connection error ", error);
  }
};

//export db connection
module.exports = { sequelize, dbConnect };
