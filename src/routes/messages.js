//import express
const express = require("express");

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
 * Lista los items
 */
router.get("/", getMessages);
/**
 * Lista un item
 */
router.get("/:id", validatorGetMessage, getMessage);
/**
 * inserta un item
 */
router.post("/", validatorCreateMessage, createMessage);
/**
 * inserta un item
 */
router.put("/:id", validatorGetMessage, validatorCreateMessage, updateMessage);
/**
 * inserta un item
 */
router.delete("/:id", validatorGetMessage, deleteMessage);

//export router
module.exports = router;
