import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import Lead from './models/Lead.js';
import Contact from './models/Contact.js';
import Settings from './models/Settings.js';

dotenv.config();

const courses = ['B.Ed', 'D.El.Ed', 'B.P.Ed', 'B.P.E.S'];
const statuses = [
  'New', 'Contacted', 'Interested', 'Documents Received',
  'Application Submitted', 'Admission Confirmed', 'Rejected',
];
const cities = [
  'Bhagalpur', 'Patna', 'Munger', 'Banka', 'Jamui',
  'Godda', 'Deoghar', 'Saharsa', 'Purnia', 'Katihar',
];
const names = [
  'Rahul Kumar', 'Priya Sharma', 'Amit Singh', 'Neha Gupta',
  'Vikash Yadav', 'Pooja Kumari', 'Ravi Ranjan', 'Sunita Devi',
  'Manish Kumar', 'Anita Kumari', 'Rohit Verma', 'Kajal Singh',
  'Deepak Mehta', 'Nisha Kumari', 'Suraj Prasad', 'Rina Sinha',
  'Arjun Das', 'Sweta Kumari', 'Rajesh Thakur', 'Mona Srivastava',
  'Arun Kumar', 'Pinky Devi', 'Sanjay Gupta', 'Meena Kumari',
  'Vivek Sharma',
];

function randomPhone() {
  return '9' + Math.floor(100000000 + Math.random() * 900000000).toString();
}

function randomDate(daysBack = 90) {
  const now = new Date();
  const past = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Admin.deleteMany({}),
      Lead.deleteMany({}),
      Contact.deleteMany({}),
      Settings.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash('Himanshu@985', 12);
    await Admin.create({
      email: 'himanshuinfo14@gmail.com',
      password: hashedPassword,
      name: 'Himanshu Kumar',
    });
    console.log('👤 Admin created: himanshuinfo14@gmail.com / Himanshu@985');

    // Create leads
    const leads = names.map((name) => ({
      name,
      phone: randomPhone(),
      course: courses[Math.floor(Math.random() * courses.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      message: `Interested in admission for ${courses[Math.floor(Math.random() * courses.length)]} course.`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      notes: Math.random() > 0.5 ? 'Student enquired via website.' : '',
      createdAt: randomDate(),
    }));
    await Lead.insertMany(leads);
    console.log(`📋 ${leads.length} leads created`);

    // Create contacts
    const contacts = names.slice(0, 8).map((name) => ({
      name,
      phone: randomPhone(),
      course: courses[Math.floor(Math.random() * courses.length)],
      message: 'I want to know more about admission process and fees.',
      createdAt: randomDate(30),
    }));
    await Contact.insertMany(contacts);
    console.log(`📞 ${contacts.length} contact requests created`);

    // Create default settings
    await Settings.create({});
    console.log('⚙️  Default settings created');

    console.log('\n🎉 Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
}

seed();
