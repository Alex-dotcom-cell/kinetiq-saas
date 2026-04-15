import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    beforeImage: { type: String, default: '' },
    afterImage: { type: String, default: '' },
    transformation: { type: String, default: '' },
    order: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Result", resultSchema);