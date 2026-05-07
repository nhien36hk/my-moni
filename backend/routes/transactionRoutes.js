const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction, updateTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');
const { checkBudgetAccess } = require('../middleware/budgetMiddleware');

router.route('/')
  .get(protect, checkBudgetAccess, getTransactions)
  .post(protect, checkBudgetAccess, addTransaction);

router.route('/:id')
  .delete(protect, deleteTransaction)
  .put(protect, updateTransaction);


module.exports = router;
