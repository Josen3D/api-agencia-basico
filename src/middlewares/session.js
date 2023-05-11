//import errors handler from utils
const { handleHttpError } = require("../utils/handleError");
// import verify token
const { verifyToken } = require("../utils/handleJwt");
// import user Model
const userModel = require("../models/users");

/**
 * Verifica si el usuario tiene una sesion valida
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const authMiddleware = async (req, res, next) => {
  try {
    //verifies if authorization exists in headers
    if (!req.headers.authorization) {
      handleHttpError(res, "NEED_SESSION", 401);
      return;
    }

    // splits the token from the Bearer and saves it
    const token = req.headers.authorization.split(" ").pop();
    // verify if token has a valid session
    const dataToken = await verifyToken(token);

    //verify if the token is valid
    if (!dataToken) {
      handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }

    // find the user the token belongs to and send the user to request
    const user = await userModel.findOne({ where: { id: dataToken.id } });
    //send the user on request
    req.user = user;
    next();
  } catch (error) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

//exports authmiddleware
module.exports = authMiddleware;
