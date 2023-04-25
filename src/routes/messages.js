//import express
const express = require("express");

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
router.get("/:id", getMessage);
/**
 * inserta un item
 */
router.post("/", createMessage);
/**
 * inserta un item
 */
router.put("/:id", updateMessage);
/**
 * inserta un item
 */
router.delete("/:id", deleteMessage);

//export router
module.exports = router;
