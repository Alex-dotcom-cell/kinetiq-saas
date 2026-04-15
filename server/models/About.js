import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    experience: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    stats: [{
        label: { type: String, required: true },
        value: { type: String, required: true }
    }],
    certifications: [{ type: String }],
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("About", aboutSchema);