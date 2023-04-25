//import express
const express = require("express");

//import check role and session authorization from middlewares
const authSession = require("../middlewares/session");
const checkRol = require("../middlewares/rol");

//import message validator
const {
  validatorCreateMessage,
  validatorGetMessage,
} = require("../validators/messages");

//import messages controller
const {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/messages");

//create router
const router = express.Router();

/**
 * Lista los mensajes
 */
router.get("/", authSession, checkRol(["admin"]), getMessages);
/**
 * Lista un mensaje
 */
router.get(
  "/:id",
  authSession,
  checkRol(["admin"]),
  validatorGetMessage,
  getMessage
);
/**
 * inserta un mensaje
 */
router.post(
  "/",
  authSession,
  checkRol(["user"]),
  validatorCreateMessage,
  createMessage
);
/**
 * actualiza un mensaje
 */
router.put("/:id", validatorGetMessage, validatorCreateMessage, updateMessage);
/**
 * elimina un mensaje
 */
router.delete(
  "/:id",
  authSession,
  checkRol(["admin"]),
  validatorGetMessage,
  deleteMessage
);

//export router
module.exports = router;
