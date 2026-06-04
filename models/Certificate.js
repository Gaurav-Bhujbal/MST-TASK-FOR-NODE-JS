const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: [true, 'Please provide a certificate ID'],
    unique: true
  },
  recipientName: {
    type: String,
    required: [true, 'Please provide recipient name']
  },
  courseName: {
    type: String,
    required: [true, 'Please provide course name']
  },
  issueDate: {
    type: Date,
    required: [true, 'Please provide issue date']
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

certificateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Certificate', certificateSchema);
