const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const todoController = require("../controllers/todo");

router.get("/:username", todoController.getAllTodo);
router.post("/", todoController.postCreateTodo);
router.put("/:id", todoController.putUpdateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
