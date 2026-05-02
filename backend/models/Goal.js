const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  monthKey: {
    type: String,
    required: true, // Định dạng: "YYYY-MM" (VD: "2026-05"). Dùng string để dễ query
  },
  targetAmount: {
    type: Number,
    required: true,
    min: 0 // Số tiền kỳ vọng tiết kiệm trong tháng
  },
  
  /* --- PHẦN LỊCH SỬ (CHỐT SỔ) --- */
  actualAmount: {
    type: Number,
    default: 0 // Số tiền thực tế để dành được (Được cập nhật tự động bằng API khi kết thúc tháng)
  },
  status: {
    type: String,
    enum: ['ongoing', 'success', 'failed'],
    default: 'ongoing' // Trạng thái: Đang diễn ra, Đạt mục tiêu, Trượt mục tiêu
  }
}, {
  timestamps: true
});

// Mỗi user chỉ có 1 mục tiêu duy nhất cho 1 tháng
goalSchema.index({ user: 1, monthKey: 1 }, { unique: true });

module.exports = mongoose.model('Goal', goalSchema);
