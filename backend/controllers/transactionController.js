const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');

// [GET] Lấy danh sách giao dịch (Có hỗ trợ lọc theo ngày)
exports.getTransactions = async (req, res) => {
  try {
    const { startDate, endDate, budgetId } = req.query;
    
    let filter = { budget: budgetId };

    // Lọc theo khoảng thời gian nếu có truyền lên
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Sort mới nhất lên đầu
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// [POST] Thêm giao dịch mới
exports.addTransaction = async (req, res) => {
  try {
    const { name, amount, category, isIncome, date, description, budgetId } = req.body;
    
    const newTransaction = await Transaction.create({
      budget: budgetId,
      created_by: {
        _id: req.user.id,
        full_name: req.user.name
      },
      name,
      amount,
      category,
      isIncome,
      date,
      description
    });

    res.status(201).json({ success: true, data: newTransaction });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// [DELETE] Xóa giao dịch
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ success: false, error: "Không tìm thấy giao dịch" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// [PUT] Cập nhật giao dịch
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!transaction) {
      return res.status(404).json({ success: false, error: "Không tìm thấy giao dịch" });
    }
    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
