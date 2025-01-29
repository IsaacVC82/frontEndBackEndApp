const express = require('express');
const { getAllTodo, postCreateTodo, putUpdateTodo, deleteTodo } = require('../controllers/todo');

const router = express.Router();

router.get('/todo', getAllTodo);
router.post('/todo', postCreateTodo);
router.put('/todo/:id', putUpdateTodo);
router.delete('/todo/:id', deleteTodo);

module.exports = router;

