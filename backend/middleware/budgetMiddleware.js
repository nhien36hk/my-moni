const Budget = require('../models/Budget');

/**
 * Middleware kiểm tra quyền truy cập ví (Budget)
 * Tự động lấy budgetId từ Query (GET) hoặc Body (POST/PUT)
 */
exports.checkBudgetAccess = async (req, res, next) => {
  try {
    const budgetId = req.query.budgetId || req.body.budgetId;

    if (!budgetId) {
      return res.status(400).json({ success: false, error: 'Thiếu Budget ID' });
    }

    // Tìm ví và kiểm tra user có phải thành viên không
    const budget = await Budget.findOne({ _id: budgetId, members: req.user.id });

    if (!budget) {
      return res.status(403).json({ success: false, error: 'Bạn không có quyền truy cập ngân quỹ này' });
    }

    // Gắn budget vào request để controller có thể dùng luôn nếu cần
    req.budget = budget;
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: 'Lỗi kiểm tra quyền truy cập ví' });
  }
};
