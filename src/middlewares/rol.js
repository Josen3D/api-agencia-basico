//import errors handler from utils
const { handleHttpError } = require("../utils/handleError");

/**
 * Array con los roles permitidos
 * @param {*} roles
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;
    //Check if the user roles matches with the server roles
    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );
    //verify if the user role is permitted
    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }

    next();
  } catch (error) {
    handleHttpError(res, "ERROR_PERMISSION", 403);
  }
};

//export the check role module
module.exports = checkRol;
