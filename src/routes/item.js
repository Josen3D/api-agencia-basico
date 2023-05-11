//import Router from express
const { Router } = require("express");
//import check role and session authorization from middlewares
const authSession = require("../middlewares/session");
const checkRole = require("../middlewares/role");
// import controllers
const {
  getItems,
  getItem,
  postItem,
  updateItem,
  deleteItem,
} = require("../controllers/item");

// import validators
const {
  validatorCreateMessage,
  validatorGetMessage,
} = require("../validators/message");

// create the router
const router = Router();

/**
 * Listar los mensajes
 */
router.get("/", authSession, checkRole(["admin"]), getItems);
router.get(
  "/:id",
  authSession,
  checkRole(["admin"]),
  validatorGetMessage,
  getItem
);
router.post("/", authSession, validatorCreateMessage, postItem);
router.put("/:id", validatorGetMessage, validatorCreateMessage, updateItem);
router.delete(
  "/:id",
  authSession,
  checkRole(["admin"]),
  validatorGetMessage,
  deleteItem
);

//exports the router
module.exports = router;
