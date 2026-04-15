import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    name: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);