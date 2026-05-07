const express = require('express');
const router = express.Router();
const { getGoals, upsertGoal, closeGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/auth');
const { checkBudgetAccess } = require('../middleware/budgetMiddleware');

router.route('/')
  .get(protect, checkBudgetAccess, getGoals)
  .post(protect, checkBudgetAccess, upsertGoal);

router.route('/:id/close')
  .put(protect, closeGoal);


module.exports = router;
