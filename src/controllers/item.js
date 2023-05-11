// import handleError
const { handleHttpError } = require("../utils/handleError");
// import matched data from exoress validator
const { matchedData } = require("express-validator");

// import message services
const {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} = require("../services/message");

/**
 * Obtiene la lista de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const response = await getMessages();
    res.send(response);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_MESSAGES " + error);
  }
};
/**
 * Obtiene un detalle de la base de datos
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const response = await getMessage(id);

    //if response is null, the message doesnt exist
    if (!response) {
      handleHttpError(res, "MESSAGE_NOT_FOUND", 404);
      return;
    }

    res.send(response);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_MESSAGE " + error);
  }
};

/**
 * Crear nuevo registro
 * @param {*} req
 * @param {*} res
 */
const postItem = async (req, res) => {
  try {
    // saves only the clean data that corresponds to the validation done
    const body = matchedData(req);
    const response = await createMessage(body);
    res.send(response);
  } catch (error) {
    handleHttpError(res, "ERROR_POST_MESSAGE " + error);
  }
};

/**
 * Actualizar un registro
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateItem = async (req, res) => {
  try {
    // saves only the clean data that corresponds to the validation done
    const { id, ...body } = matchedData(req); //save the id in an array, and the other data in other array
    const response = await updateMessage(id, body);

    if (response <= 0) {
      handleHttpError(res, "MESSAGE_NOT_FOUND ", 404);
      return;
    }

    const data = await getMessage(id);

    res.send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_MESSAGES " + error);
  }
};

/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteItem = async (req, res) => {
  try {
    // saves only the clean data that corresponds to the validation done
    req = matchedData(req);
    const { id } = req;
    const response = await deleteMessage(id);

    //if response is null, the message doesnt exist
    if (response <= 0) {
      handleHttp(res, "MESSAGE_NOT_FOUND", 404);
      return;
    }

    res.send({ message: "message deleted" });
  } catch (error) {
    console.log("Error: " + error);
  }
};

//Exports the controllers
module.exports = { getItems, getItem, postItem, updateItem, deleteItem };
