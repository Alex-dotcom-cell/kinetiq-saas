import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a program title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Program = mongoose.model('Program', programSchema);
export default Program;
