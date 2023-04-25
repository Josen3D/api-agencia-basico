//import check from express validator
const { check } = require("express-validator");
//import the validate results from utils
const validateResults = require("../utils/handleValidator");

/**
 * create validators for register
 */
const validatorRegister = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 50 }),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),

  // validates the results of data
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

/**
 * create validators for login
 */
const validatorLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),

  // validates the results of data
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

//export validators
module.exports = {
  validatorRegister,
  validatorLogin,
};
