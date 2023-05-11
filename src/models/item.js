// import sequelize connection
const { sequelize } = require("../config/mysql");
// import DataTypes from sequelize
const { DataTypes } = require("sequelize");

//defines the model of table users on mysql
const Message = sequelize.define(
  "messages",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

//export model
module.exports = Message;
