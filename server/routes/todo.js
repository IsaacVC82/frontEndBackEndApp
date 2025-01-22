const express = require('express');
const { db } = require('../config/db');  

const router = express.Router();

router.post('/todo', (req, res) => {
  const { title, description } = req.body;

  const query = 'INSERT INTO todos (title, description, date, priority, done) VALUES (?, ? ,? ,? ,?)';
  
  db.query(query, [title, description], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: result.insertId, title, description });
  });
});

module.exports = router;
