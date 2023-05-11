// import validation result from express validator
const { validationResult } = require("express-validator");

// validates if data results are correct
const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(403);
    res.send({ errors: error.array() });
  }
};

module.exports = validateResult;
