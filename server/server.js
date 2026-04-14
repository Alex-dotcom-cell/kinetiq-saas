import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// =====================
// CONFIG
// =====================
const PORT = process.env.PORT || 5001;

// =====================
// MIDDLEWARE
// =====================
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

// =====================
// TEST ROUTE
// =====================
app.get("/api/hello", (req, res) => {
    res.json({ message: "Backend is connected 🚀" });
});

// =====================
// ROUTES
// =====================
app.use("/api/auth", authRoutes);

// =====================
// START SERVER
// =====================
const startServer = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in .env file");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected ✅");

        app.listen(PORT, () => {
            console.log(`Backend running on http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("MongoDB connection error ❌", err);
        process.exit(1);
    }
};

startServer();