//import Router from express
const { Router } = require("express");
// import controllers
const { register, login } = require("../controllers/auth");

// import validators
const { validatorRegister, validatorLogin } = require("../validators/user");

// create the router
const router = Router();

/**
 * http://localhost:3001/auth/register [POST]
 */
router.post("/register", validatorRegister, register);

/**
 * http://localhost:3001/auth/login [POST]
 */
router.post("/login", validatorLogin, login);

//exports the router
module.exports = router;
