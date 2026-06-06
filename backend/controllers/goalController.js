const Goal = require('../models/Goal');
const Transaction = require('../models/Transaction');

// [GET] Lấy tất cả mục tiêu của một ví (Budget)
exports.getGoals = async (req, res) => {
  try {
    const { budgetId } = req.query;
    
    // Sort tháng mới nhất lên đầu
    let goals = await Goal.find({ budget: budgetId }).sort({ monthKey: -1 });

    // --- LOGIC AUTO-CLOSE PAST MONTHS ---
    const currentMonthKey = new Date().toISOString().slice(0, 7);
    let needUpdate = false;

    for (let goal of goals) {
      if (goal.status === 'ongoing' && goal.monthKey < currentMonthKey && goal.type !== 'yearly') {
        const [year, month] = goal.monthKey.split('-');
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        // Lấy TẤT CẢ giao dịch từ trước đến cuối tháng đó
        const txs = await Transaction.find({
          budget: budgetId,
          date: { $lte: endDate }
        });

        // Tính số dư tổng quát đến hết tháng đó
        const totalIncome = txs.filter(t => t.isIncome).reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = txs.filter(t => !t.isIncome).reduce((sum, t) => sum + t.amount, 0);
        const totalBalanceRaw = totalIncome - totalExpense;

        // Trừ đi các mục tiêu của các tháng TRƯỚC tháng đang xét
        const prevGoals = await Goal.find({
          budget: budgetId,
          type: 'monthly',
          monthKey: { $lt: goal.monthKey }
        });
        const totalPrevSaved = prevGoals.reduce((sum, g) => sum + (g.actualAmount > 0 ? g.actualAmount : g.targetAmount), 0);

        // Số dư khả dụng trong tháng đó (sau khi đã trừ mục tiêu tháng cũ)
        const availableBalance = totalBalanceRaw - totalPrevSaved;

        // Số tiền thực tế tiết kiệm được trong tháng đó
        // Nếu số dư lớn hơn mục tiêu -> đạt mục tiêu (lưu actual = target để đẩy số thừa sang tháng sau)
        // Nếu số dư < mục tiêu -> chỉ lưu actual = số dư thực tế
        const actualAmount = availableBalance >= goal.targetAmount ? goal.targetAmount : Math.max(0, availableBalance);

        goal.actualAmount = actualAmount;
        goal.status = actualAmount >= goal.targetAmount ? 'success' : 'failed';
        await goal.save();
        needUpdate = true;
      }
    }

    if (needUpdate) {
      goals = await Goal.find({ budget: budgetId }).sort({ monthKey: -1 });
    }
    // ------------------------------------
    
    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// [POST] Thêm hoặc Cập nhật mục tiêu cho 1 tháng/năm của một ví
exports.upsertGoal = async (req, res) => {
  try {
    const { monthKey, targetAmount, budgetId, type } = req.body;

    // Tìm xem mốc thời gian này đã có mục tiêu chưa, có rồi thì update, chưa có thì tạo mới (upsert)
    const goal = await Goal.findOneAndUpdate(
      { budget: budgetId, monthKey, type: type || 'monthly' },
      { targetAmount },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// [PUT] Đóng tháng (Cập nhật actualAmount và status)
exports.closeGoal = async (req, res) => {
  try {
    const { actualAmount } = req.body;
    
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ success: false, error: "Không tìm thấy mục tiêu" });

    goal.actualAmount = actualAmount;
    goal.status = actualAmount >= goal.targetAmount ? 'success' : 'failed';
    await goal.save();

    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
