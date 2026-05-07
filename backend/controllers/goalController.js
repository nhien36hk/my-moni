const Goal = require('../models/Goal');

// [GET] Lấy tất cả mục tiêu của một ví (Budget)
exports.getGoals = async (req, res) => {
  try {
    const { budgetId } = req.query;
    
    // Sort tháng mới nhất lên đầu
    const goals = await Goal.find({ budget: budgetId }).sort({ monthKey: -1 });
    
    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// [POST] Thêm hoặc Cập nhật mục tiêu cho 1 tháng của một ví
exports.upsertGoal = async (req, res) => {
  try {
    const { monthKey, targetAmount, budgetId } = req.body;

    // Tìm xem tháng này đã có mục tiêu chưa, có rồi thì update, chưa có thì tạo mới (upsert)
    const goal = await Goal.findOneAndUpdate(
      { budget: budgetId, monthKey },
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
