//import bcryptjs to encrypt password
const bcryptjs = require("bcryptjs");

/**
 * Contraseña sin encriptar: password.123
 * @param {*} passwordPlain
 */
const encrypt = async (passwordPlain) => {
  //encrypts the password plain text to hash
  const hash = await bcryptjs.hash(passwordPlain, 10);
  return hash;
};
/**
 * Pasar contraseña sin encriptar y contraseña encriptada
 * @param {*} passwordPlain
 * @param {*} hashpassword
 */
const compare = async (passwordPlain, hashpassword) => {
  // compares the password in plain text and the password hash
  return await bcryptjs.compare(passwordPlain, hashpassword);
};

module.exports = { encrypt, compare };
