//import bcryptjs to encrypt password
const bcryptjs = require("bcryptjs");

/**
 * Contraseña sin encriptar: passw.012
 * @param {*} passwordPlain
 * @returns
 */
const encrypt = async (passwordPlain) => {
  //encrypts the password plain text to hash
  const hash = await bcryptjs.hash(passwordPlain, 10);
  return hash;
};

/**
 * Pasar contraseña sin encriptar y contraseña encriptada
 * @param {*} passwordPlain
 * @param {*} passwordHash
 * @returns
 */
const compare = async (passwordPlain, passwordHash) => {
  // compares the password in plain text and the password hash
  return await bcryptjs.compare(passwordPlain, passwordHash);
};

//Exports modules
module.exports = { encrypt, compare };
