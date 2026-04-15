import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

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
app.use("/api/content", contentRoutes);
app.use("/api/admin", adminRoutes);

// =====================
// START SERVER
// =====================
const startServer = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in .env file");
        }

        await connectDB();

        console.log("✅ Database connected successfully");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("❌ Server startup error:", err);
        process.exit(1);
    }
};

startServer();

startServer();