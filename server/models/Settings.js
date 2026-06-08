import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  businessName: {
    type: String,
    default: 'Career Compass Consultancy',
  },
  phone: {
    type: String,
    default: '6206177982',
  },
  whatsapp: {
    type: String,
    default: '6206177982',
  },
  address: {
    type: String,
    default: 'Bhagalpur, Bihar',
  },
  email: {
    type: String,
    default: 'info@careercompass.in',
  },
  facebookUrl: {
    type: String,
    default: 'https://facebook.com/careercompass05',
  },
  instagramUrl: {
    type: String,
    default: 'https://instagram.com/careercompass05',
  },
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
