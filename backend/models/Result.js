import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  beforeImage: {
    type: String,
    default: null,
  },
  afterImage: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: '',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Result = mongoose.model('Result', resultSchema);
export default Result;
