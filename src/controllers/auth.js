// import matched data
const { matchedData } = require("express-validator");
// import compare and encrypt password
const { encrypt, compare } = require("../utils/handlePassword");
// import token sign
const { tokenSign } = require("../utils/handleJwt");
// import handle error
const { handleHttpError } = require("../utils/handleError");
const { registerUser, loginUser } = require("../services/user");

const register = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };

    const responseUser = await registerUser(body); //create the user on DB
    responseUser.set("password", undefined, { strict: false }); // hide the password on the response

    const data = {
      token: await tokenSign(responseUser),
      user: responseUser,
    };
    res.send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER " + error);
  }
};

const login = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await loginUser(req.email);

    //if user doesnt exist return the function
    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }

    // saves the hash password from user on DB
    const hashPassword = user.get("password");
    //compare the password and the hash password and verify if it matches
    const check = await compare(req.password, hashPassword);

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    //hide the password on the response
    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN_USER " + error);
  }
};

//export the register and login controllers
module.exports = { register, login };
