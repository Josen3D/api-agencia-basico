//import errors handler from utils
const { handleHttpError } = require("../utils/handleError");

/**
 * Array con los roles permitidos
 * @param {*} roles
 * @returns
 */
const checkRole = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;
    //Check if the user roles matches with the server roles
    const checkValueRole = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );

    //verify if the user role is permitted
    if (!checkValueRole) {
      handleHttpError(res, "USER_NOT_PERMISSIONS");
      return;
    }

    next();
  } catch (error) {
    handleHttpError(res, "ERROR_PERMISSIONS " + error);
  }
};

//export the check role module
module.exports = checkRole;
