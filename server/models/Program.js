import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, default: '12 weeks' },
    features: [{
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, default: '🏃‍♂️' }
    }],
    results: [{
        label: { type: String, required: true },
        value: { type: String, required: true }
    }],
    ctaText: { type: String, default: 'Start Your Transformation' },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Program", programSchema);