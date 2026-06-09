import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import connectDB from './config/db.js';
import Admin from './models/Admin.js';

import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB().then(() => {
  seedDefaultAdmins();
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Career Compass Backend API is running' });
});

// Default admin seeding logic
async function seedDefaultAdmins() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('🌱 No admin users found. Seeding default admins...');

      // Admin 1 (Spec requirement)
      const hashedPassword1 = await bcrypt.hash('Admin@12345', 12);
      await Admin.create({
        name: 'Admin',
        email: 'admin@careercompass.in',
        password: hashedPassword1,
        role: 'admin'
      });
      console.log('👤 Admin 1 created: admin@careercompass.in / Admin@12345');

      // Admin 2 (User customized account)
      const hashedPassword2 = await bcrypt.hash('Himanshu@985', 12);
      await Admin.create({
        name: 'Himanshu Kumar',
        email: 'himanshuinfo14@gmail.com',
        password: hashedPassword2,
        role: 'admin'
      });
      console.log('👤 Admin 2 created: himanshuinfo14@gmail.com / Himanshu@985');
      
      console.log('✅ Default admins seeded successfully.');
    }
  } catch (error) {
    console.error('⚠️ Admin seeding failed:', error.message);
  }
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
