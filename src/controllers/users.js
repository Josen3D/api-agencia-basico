//import matched data
const { matchedData } = require("express-validator");
//import the encrypt password an compare from utils
const { encrypt, compare } = require("../utils/handlePassword");
//import teken sign from utils
const { tokenSign } = require("../utils/handleJwt");
//import users model
const userModel = require("../models/users");
//import hanlde errors
const { handleHttpError } = require("../utils/handleError");
const { use } = require("../routes/users");

/**
 * Controlador encargado de registrar un usuario en DB
 * @param {*} req
 * @param {*} res
 */
const registerUser = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };

    const dataUser = await userModel.create(body); //create the user on DB
    dataUser.set("password", undefined, { strict: false }); // hide the password on the response

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER " + error);
  }
};

/**
 * Controlador encargado de logear a una persona
 * @param {*} req
 * @param {*} res
 */
const loginUser = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await userModel.findOne({ where: { email: req.email } }); // find an user by email

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
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

//export the register and login controllers
module.exports = { registerUser, loginUser };
