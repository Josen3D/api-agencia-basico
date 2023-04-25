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
    console.log(req.params.id);
    const { id } = req.params;
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
    const body = req.body;
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
    const id = req.params.id;
    const { ...body } = req.body;
    const data = await messageModel.update(body, { where: { id } });

    if (data <= 0) {
      handleHttpError(res, "MESSAGE_NOT_FOUND ", 404);
      return;
    }

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_MESSAGE " + error);
  }
};

/** */
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
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
