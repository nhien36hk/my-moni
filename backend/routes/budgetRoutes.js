const express = require('express');
const router = express.Router();
const { getBudgets, createBudget } = require('../controllers/budgetController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getBudgets)
  .post(protect, createBudget);

module.exports = router;
