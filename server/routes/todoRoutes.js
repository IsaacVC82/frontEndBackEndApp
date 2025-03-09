const express = require('express');
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/api/todo', authMiddleware, getTodos);
router.post('/api/todo', authMiddleware, createTodo);
router.put('/api/todo/:id', authMiddleware, updateTodo);
router.delete('/api/todo/:id', authMiddleware, deleteTodo);

module.exports = router;
