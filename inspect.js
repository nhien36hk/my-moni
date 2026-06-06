const mongoose = require('mongoose');
const Goal = require('./backend/models/Goal');
const Transaction = require('./backend/models/Transaction');

async function run() {
  await mongoose.connect('mongodb://root:example@localhost:27017/budget_db?authSource=admin');
  const goals = await Goal.find();
  const txs = await Transaction.find();
  console.log("=== GOALS ===");
  console.log(JSON.stringify(goals, null, 2));
  console.log("=== TXS ===");
  console.log(JSON.stringify(txs, null, 2));
  process.exit(0);
}
run();
