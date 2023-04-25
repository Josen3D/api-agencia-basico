const { matchedData } = require("express-validator");
const messageModel = require("../models/messages");
const { handleHttpError } = require("../utils/handleError");

/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getMessages = async (req, res) => {
  try {
    const data = await messageModel.findAll({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_MESSAGES " + error);
  }
};

/**
 * Obtener un registro de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getMessage = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await messageModel.findOne({ where: { id } });

    if (!data) {
      handleHttpError(res, "item not found", 404);
      return;
    }

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_MESSAGE " + error);
  }
};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createMessage = async (req, res) => {
  try {
    // saves only the clean data that corresponds to the validation done
    const body = matchedData(req);
    const data = await messageModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_MESSAGE " + error);
  }
};

/**
 * Actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const updateMessage = async (req, res) => {
  try {
    // saves only the clean data that corresponds to the validation done
    const { id, ...body } = matchedData(req); //save the id in an array, and the other data in other array

    const result = await messageModel.update(body, { where: { id } });

    if (result <= 0) {
      handleHttpError(res, "MESSAGE_NOT_FOUND ", 404);
      return;
    }

    const data = await messageModel.findOne({ where: { id } });

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_MESSAGE " + error);
  }
};

/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteMessage = async (req, res) => {
  try {
    // saves only the clean data that corresponds to the validation done
    req = matchedData(req);
    const { id } = req;
    const data = await messageModel.destroy({ where: { id } });

    if (data <= 0) {
      handleHttpError(res, "message not found", 404);
      return;
    }

    res.send({ message: "message deleted" });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_MESSAGE " + error);
  }
};

//Export methods
module.exports = {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
