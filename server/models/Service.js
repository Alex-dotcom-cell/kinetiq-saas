import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: '💪' },
    features: [{ type: String }],
    price: { type: String, default: '' },
    popular: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Service", serviceSchema);