const express = require('express');
const router = express.Router();
const { addExpenses, fetchExpenses, deleteExpenses } = require('../Controllers/ExpenseController');  // Import controllers

router.post('/add', addExpenses);  // POST request to add an expense
router.get('/fetch', fetchExpenses);  // GET request to fetch expenses
router.delete('/delete/:id', deleteExpenses);  // DELETE request with an ID parameter

module.exports = router;
