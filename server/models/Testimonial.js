import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    achievement: { type: String, default: '' },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    imageUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Testimonial", testimonialSchema);