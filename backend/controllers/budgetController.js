const Budget = require('../models/Budget');
const bcrypt = require('bcryptjs');

// Lấy danh sách ví mà người dùng là thành viên
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ members: req.user.id })
      .populate('members', 'name username email'); // Lấy thêm thông tin user để hiển thị trong Modal chi tiết
    res.status(200).json({ success: true, data: budgets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Tạo ví mới (ví dụ: ví gia đình)
exports.createBudget = async (req, res) => {
  try {
    const { name, type, color, password, members } = req.body;
    
    // Luôn thêm người tạo vào danh sách thành viên
    const budgetMembers = members || [];
    if (!budgetMembers.includes(req.user.id)) {
      budgetMembers.push(req.user.id);
    }

    let hashedPassword = undefined;
    if (type === 'family' && password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const budget = await Budget.create({
      name,
      type: type || 'family',
      owner: req.user.id,
      members: budgetMembers,
      color,
      password: hashedPassword
    });

    res.status(201).json({ success: true, data: budget });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Tham gia ví bằng ID
exports.joinBudget = async (req, res) => {
  try {
    const { budgetId, password } = req.body;
    if (!budgetId) return res.status(400).json({ success: false, error: 'Vui lòng nhập ID ví' });

    const budget = await Budget.findById(budgetId);
    if (!budget) return res.status(404).json({ success: false, error: 'Không tìm thấy ngân quỹ với ID này' });

    // Kiểm tra xem user đã là thành viên chưa
    if (budget.members.includes(req.user.id)) {
      return res.status(400).json({ success: false, error: 'Bạn đã là thành viên của ví này rồi' });
    }

    // Kiểm tra mật khẩu nếu ví yêu cầu
    if (budget.type === 'family' && budget.password) {
      if (!password) {
        return res.status(400).json({ success: false, error: 'Mật khẩu ví gia đình là bắt buộc' });
      }
      const isMatch = await bcrypt.compare(password, budget.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, error: 'Mật khẩu ví gia đình không chính xác' });
      }
    }

    // Thêm user vào ví
    budget.members.push(req.user.id);
    await budget.save();

    res.status(200).json({ success: true, message: 'Tham gia ví thành công', data: budget });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Mã ID không hợp lệ hoặc có lỗi xảy ra' });
  }
};
