const express = require('express');
const router = express.Router();
const { getBudgets, createBudget, joinBudget } = require('../controllers/budgetController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getBudgets)
  .post(protect, createBudget);

router.post('/join', protect, joinBudget);

module.exports = router;
