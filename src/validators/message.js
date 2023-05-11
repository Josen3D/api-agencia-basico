// import check from express validator
const { check } = require("express-validator");
// import validate results from utils
const validateResult = require("../utils/handleValidator");

//create validators for createMessage
const validatorCreateMessage = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 50 }),
  check("email").exists().notEmpty().isEmail(),
  check("message").exists().notEmpty(),

  // validates the results of data
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

// create validators for getMessage
const validatorGetMessage = [
  check("id").exists().notEmpty(),

  // validates the results of data
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

//exports validators
module.exports = { validatorCreateMessage, validatorGetMessage };
