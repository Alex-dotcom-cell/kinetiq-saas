import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  text: {
    type: String,
    required: [true, 'Please provide testimonial text'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
