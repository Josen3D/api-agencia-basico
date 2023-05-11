// import express module
const express = require("express");
//create router
const router = express.Router();
//import fyleSystem
const fs = require("fs");

const PATH_ROUTES = __dirname; // ruta absoluta

//removes the extension of file name
const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

//reads the directories of routes and use it name on router
const routes = fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);

  if (name !== "index") {
    router.use(`/${name}`, require(`./${file}`));
  }
});

//exports the router
module.exports = router;
