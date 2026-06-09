import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(admin._id);

    // Format admin response
    const adminResponse = {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt,
    };

    res.json({
      success: true,
      token,
      admin: adminResponse,
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// @desc    Verify JWT token and return admin info
// @route   GET /api/auth/verify
// @access  Private
export const verifyAdmin = async (req, res) => {
  try {
    // If the flow gets here, it passed authMiddleware, which attached req.admin
    res.json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    console.error('Verify error:', error.message);
    res.status(500).json({ success: false, message: 'Server error during token verification' });
  }
};
