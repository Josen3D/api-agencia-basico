//import users model
const userModel = require("../models/users");

const registerUser = async (user) => {
  try {
    const responseRegister = await userModel.create(user);

    return responseRegister;
  } catch (error) {
    console.log("Error: " + error);
  }
};

loginUser = async (email) => {
  responseLogin = await userModel.findOne({ where: { email } }); // find an user by email
  return responseLogin;
};

//export register and login
module.exports = { registerUser, loginUser };
