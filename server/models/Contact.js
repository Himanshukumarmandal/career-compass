import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
}, { timestamps: true });

contactSchema.index({ createdAt: -1 });

export default mongoose.model('Contact', contactSchema);
