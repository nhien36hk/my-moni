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

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Vui lòng cung cấp email' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy người dùng với email này' });
    }

    // Tạo mật khẩu tạm thời ngẫu nhiên
    const tempPassword = Math.random().toString(36).slice(-8);

    // Hash mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(tempPassword, salt);
    await user.save();

    // In ra console để dev dễ debug
    console.log(`\n========================================`);
    console.log(`[FORGOT PASSWORD] User: ${user.username} (${email})`);
    console.log(`[FORGOT PASSWORD] Temporary Password: ${tempPassword}`);
    console.log(`========================================\n`);

    // Gửi email
    const nodemailer = require('nodemailer');
    let transporter;
    
    // Kiểm tra cấu hình môi trường
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    } else {
      // Ethereal email test account fallback
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'kurtis.dickens91@ethereal.email',
          pass: '3pS923k1zT7sYt7DqG'
        }
      });
    }

    const mailOptions = {
      from: '"MyMony App" <no-reply@mymony.com>',
      to: email,
      subject: 'Yêu cầu khôi phục mật khẩu - MyMony',
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #f472b6;">Khôi phục mật khẩu MyMony</h2>
          <p>Xin chào <strong>${user.name}</strong>,</p>
          <p>Chúng tôi nhận được yêu cầu cấp lại mật khẩu cho tài khoản của bạn.</p>
          <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #eee; margin: 20px 0; text-align: center;">
            <p style="margin: 0; font-size: 14px; color: #666;">Mật khẩu tạm thời của bạn là:</p>
            <h3 style="margin: 10px 0; font-size: 24px; color: #333; letter-spacing: 1px;">${tempPassword}</h3>
          </div>
          <p>Vui lòng sử dụng mật khẩu này để đăng nhập và thay đổi lại mật khẩu của bạn trong phần cài đặt.</p>
          <p>Trân trọng,<br>Đội ngũ MyMony</p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Lỗi gửi mail:', error);
      } else {
        console.log('Email đã được gửi:', info.messageId);
        if (!process.env.EMAIL_USER) {
          console.log('Xem email tại:', nodemailer.getTestMessageUrl(info));
        }
      }
    });

    res.status(200).json({ success: true, message: 'Mật khẩu mới đã được gửi tới email của bạn' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
