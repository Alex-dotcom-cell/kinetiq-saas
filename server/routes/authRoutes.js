import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/**
 * =========================
 * REGISTER USER
 * =========================
 */
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Проверка входных данных
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // 2. Проверка существует ли пользователь
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // 3. Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Создание пользователя
        const user = await User.create({
            email,
            password: hashedPassword
        });

        // 5. Ответ без пароля (ВАЖНО)
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
});


/**
 * =========================
 * LOGIN USER
 * =========================
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Проверка входных данных
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // 2. Поиск пользователя
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // 3. Проверка пароля
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        // 4. Генерация JWT токена
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 5. Ответ клиенту
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
});

export default router;