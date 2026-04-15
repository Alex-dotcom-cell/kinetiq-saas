import mongoose from 'mongoose';

const heroSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'KINETIQ PERSONAL TRAINING',
  },
  subtitle: {
    type: String,
    default: 'Premium Personal Trainer with 20+ Years of Experience',
  },
  image: {
    type: String,
    default: null,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const HeroSection = mongoose.model('HeroSection', heroSectionSchema);
export default HeroSection;
