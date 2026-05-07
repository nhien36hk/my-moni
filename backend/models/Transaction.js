const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Budget',
    required: true
  },
  created_by: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    full_name: {
      type: String,
      required: true
    }
  },
  name: {
    type: String,
    required: true, // Ví dụ: "Ăn trưa", "Mua iPhone", "Lương tháng 5"
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0 // Số tiền luôn là số dương, phân biệt thu/chi bằng isIncome
  },
  category: {
    type: String,
    required: true // Ví dụ: "Ăn uống", "Di chuyển", "Thu nhập"
  },
  isIncome: {
    type: Boolean,
    required: true,
    default: false // false = Chi tiêu, true = Thu vào
  },
  date: {
    type: Date,
    required: true,
    default: Date.now // Ngày diễn ra giao dịch
  },
  description: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true
});

// Thêm index để tối ưu hóa việc truy vấn theo budget và thời gian
transactionSchema.index({ budget: 1, date: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
