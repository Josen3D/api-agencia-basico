// import item model
const itemModel = require("../models/item");

//creates methods
/**
 * devuelve resultado de la busqueda de los mensajes en la DB
 * @returns
 */
const getMessages = async () => {
  const responseItems = await itemModel.findAll({});
  return responseItems;
};
/**
 * devuelve resultado de la busqueda de un mensaje en la DB
 * @returns
 */
const getMessage = async (id) => {
  const responseItems = await itemModel.findOne({ where: { id } });
  return responseItems;
};
/**
 * Crea un nuevo mensaje en ña base de datos
 * @param {*} message
 * @returns
 */
const createMessage = async (message) => {
  const responseCreate = await itemModel.create(message);
  return responseCreate;
};

const updateMessage = async (id, message) => {
  const responseItems = await itemModel.update(message, { where: { id } });
  return responseItems;
};

const deleteMessage = async (id) => {
  const responseItems = await itemModel.destroy({ where: { id } });
  return responseItems;
};

//export services
module.exports = {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
