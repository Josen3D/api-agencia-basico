const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const userModel = require("../models/users");

/**
 * verifica si el token de la sesion es valida o no se tienen permisos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NEED_SESSION", 401);
      return;
    }

    // splits the token from the Bearer and saves it
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    //verify if the token is valid
    if (!dataToken) {
      handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }

    // find the user the token belongs to and send the user to request
    const user = await userModel.findOne({ where: { id: dataToken.id } });
    //console.log(user);
    req.user = user;
    next();
  } catch (error) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

//export authorization module
module.exports = authMiddleware;
