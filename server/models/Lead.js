import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
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
    required: true,
    enum: ['B.Ed', 'D.El.Ed', 'B.P.Ed', 'B.P.E.S'],
  },
  city: {
    type: String,
    trim: true,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: [
      'New',
      'Contacted',
      'Interested',
      'Documents Received',
      'Application Submitted',
      'Admission Confirmed',
      'Rejected',
    ],
    default: 'New',
  },
  notes: {
    type: String,
    default: '',
  },
}, { timestamps: true });

// Index for common queries
leadSchema.index({ status: 1 });
leadSchema.index({ course: 1 });
leadSchema.index({ createdAt: -1 });

export default mongoose.model('Lead', leadSchema);
