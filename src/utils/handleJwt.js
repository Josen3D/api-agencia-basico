// import jsonwebtoken
const jwt = require("jsonwebtoken");
// saves the jwt from enviroment variables
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Pasar objeto del usuario
 * @param user
 * @returns
 */
const tokenSign = async (user) => {
  //signs the token usin the password hash, id and role of user
  const sign = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return sign;
};

/**
 * Pasar token de sesión
 * @param tokenJwt
 * @returns
 */
const verifyToken = async (tokenJwt) => {
  try {
    //verifies the session token to comprove if is correct
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

//export sign and verify token
module.exports = { tokenSign, verifyToken };
