const Budget = require('../models/Budget');

// Lấy danh sách ví mà người dùng là thành viên
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ members: req.user.id });
    res.status(200).json({ success: true, data: budgets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Tạo ví mới (ví dụ: ví gia đình)
exports.createBudget = async (req, res) => {
  try {
    const { name, type, color, members } = req.body;
    
    // Luôn thêm người tạo vào danh sách thành viên
    const budgetMembers = members || [];
    if (!budgetMembers.includes(req.user.id)) {
      budgetMembers.push(req.user.id);
    }

    const budget = await Budget.create({
      name,
      type: type || 'family',
      owner: req.user.id,
      members: budgetMembers,
      color
    });

    res.status(201).json({ success: true, data: budget });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
