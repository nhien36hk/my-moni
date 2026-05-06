const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    // Validate không cho chứa @ để tránh nhầm lẫn với email
    match: [/^[a-zA-Z0-9_]+$/, 'Username chỉ được chứa chữ cái, số và dấu gạch dưới']
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Tự động tạo createdAt và updatedAt
});

module.exports = mongoose.model('User', userSchema);
