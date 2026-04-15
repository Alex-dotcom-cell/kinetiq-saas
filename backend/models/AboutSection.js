import mongoose from 'mongoose';

const aboutSectionSchema = new mongoose.Schema({
  text: {
    type: String,
    default: '',
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

const AboutSection = mongoose.model('AboutSection', aboutSectionSchema);
export default AboutSection;
