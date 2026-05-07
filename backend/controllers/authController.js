const User = require('../models/User');
const Budget = require('../models/Budget');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_budget_app';

exports.register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // Check if user exists (check cả email và username)
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      const field = existingUser.email === email ? 'Email' : 'Username';
      return res.status(400).json({ success: false, error: `${field} đã được sử dụng` });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword
    });

    // Tự động tạo một ví cá nhân mặc định cho người dùng
    await Budget.create({
      name: `Ví của ${user.name}`,
      type: 'personal',
      owner: user._id,
      members: [user._id]
    });

    res.status(201).json({ success: true, message: 'Đăng ký thành công' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Find user (bằng email hoặc username)
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier.toLowerCase() }
      ]
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Thông tin đăng nhập không chính xác' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Thông tin đăng nhập không chính xác' });
    }

    // Create token
    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
