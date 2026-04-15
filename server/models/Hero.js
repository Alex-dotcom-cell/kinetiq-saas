import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    ctaText: { type: String, default: 'Book Now' },
    ctaLink: { type: String, default: '#contact' },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Hero", heroSchema);