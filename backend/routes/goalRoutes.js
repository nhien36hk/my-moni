const express = require('express');
const router = express.Router();
const { getGoals, upsertGoal, closeGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getGoals)
  .post(protect, upsertGoal);

router.route('/:id/close')
  .put(protect, closeGoal);


module.exports = router;
