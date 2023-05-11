// import check from express validator
const { check } = require("express-validator");
// import validate results from utils
const validateResult = require("../utils/handleValidator");

//create validators for register user
const validatorRegister = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 50 }),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),

  // validates the results of data
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

// create validators for login user
const validatorLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),

  // validates the results of data
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

//exports validators
module.exports = { validatorRegister, validatorLogin };
