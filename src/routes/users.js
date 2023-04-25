//import Router from express
const express = require("express");
const router = express.Router();
//import register and login users
const { registerUser, loginUser } = require("../controllers/users");
//Import validators for register and login
const { validatorRegister, validatorLogin } = require("../validators/users");

/**
 * Crear un registro
 */
// http://localhost:3001/api/users/register
router.post("/register", validatorRegister, registerUser);

/**
 * Logear un registro
 */
// http://localhost:3001/api/users/login
router.post("/login", validatorLogin, loginUser);

//Export router
module.exports = router;
