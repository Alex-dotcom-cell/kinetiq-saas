import dotenv from "dotenv";
import connectDB from "./config/database.js";
import Hero from "./models/Hero.js";
import About from "./models/About.js";
import Service from "./models/Service.js";
import Program from "./models/Program.js";
import Testimonial from "./models/Testimonial.js";
import Result from "./models/Result.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Hero.deleteMany();
        await About.deleteMany();
        await Service.deleteMany();
        await Program.deleteMany();
        await Testimonial.deleteMany();
        await Result.deleteMany();

        // Seed Hero
        await Hero.create({
            title: "KINETIQ PERSONAL TRAINING",
            subtitle: "Premium Personal Trainer",
            description: "20+ Years of Experience • Build your body • Track your progress • Train like an athlete",
            ctaText: "Book Now",
            ctaLink: "#contact"
        });

        // Seed About
        await About.create({
            title: "About Me",
            description: "As a dedicated gym trainer with over two decades of experience, I've helped hundreds of clients achieve their fitness goals. My approach combines proven training methods with personalized attention to ensure sustainable results.",
            experience: "20+ Years of Fitness Excellence",
            stats: [
                { label: "Clients Trained", value: "500+" },
                { label: "Years Experience", value: "20+" },
                { label: "Success Rate", value: "95%" }
            ],
            certifications: [
                "Certified Personal Trainer",
                "Nutrition Specialist",
                "Weight Loss Expert",
                "Online Training Certified"
            ]
        });

        // Seed Services
        await Service.create([
            {
                title: "Personal Training",
                description: "One-on-one training sessions tailored to your goals and fitness level. Includes workout planning, form correction, and progress tracking.",
                icon: "💪",
                features: ["Custom workout plans", "Form correction", "Progress tracking", "Nutrition guidance"],
                order: 1
            },
            {
                title: "Weight Loss Program",
                description: "Comprehensive weight loss program combining effective workouts, nutrition guidance, and lifestyle coaching for sustainable results.",
                icon: "⚖️",
                features: ["HIIT workouts", "Meal planning", "Weekly check-ins", "Body measurements"],
                order: 2
            },
            {
                title: "Online Consultations",
                description: "Virtual training sessions and consultations for clients who prefer remote coaching. Includes video calls and personalized workout plans.",
                icon: "💻",
                features: ["Video sessions", "Online workout plans", "Progress monitoring", "Flexible scheduling"],
                order: 3
            }
        ]);

        // Seed Program
        await Program.create({
            title: "Weight Loss Program",
            description: "Our proven weight loss program combines high-intensity interval training (HIIT), strength training, and nutritional guidance to help you shed pounds and keep them off.",
            duration: "12 weeks",
            features: [
                { title: "HIIT Workouts", description: "High-intensity interval training to maximize calorie burn", icon: "🏃‍♂️" },
                { title: "Nutrition Plan", description: "Customized meal plans and dietary guidance", icon: "🥗" },
                { title: "Progress Tracking", description: "Weekly measurements and photo progress tracking", icon: "📊" },
                { title: "Weekly Check-ins", description: "Regular consultations to adjust your program", icon: "🤝" }
            ],
            results: [
                { label: "Weight Loss", value: "8-12 kg" },
                { label: "Waist Reduction", value: "5-10 cm" },
                { label: "Body Fat Decrease", value: "15-20%" }
            ]
        });

        // Seed Testimonials
        await Testimonial.create([
            {
                name: "Sarah Johnson",
                content: "Amazing trainer! Helped me lose 20kg and gain confidence. The personalized approach made all the difference.",
                achievement: "Lost 20kg in 6 months",
                rating: 5,
                order: 1
            },
            {
                name: "Mike Chen",
                content: "Professional, knowledgeable, and motivating. The online sessions are just as effective as in-person training.",
                achievement: "Built muscle mass",
                rating: 5,
                order: 2
            },
            {
                name: "Emma Davis",
                content: "With 20+ years experience, he knows what works. My fitness journey has been incredible under his guidance.",
                achievement: "Improved overall fitness",
                rating: 5,
                order: 3
            }
        ]);

        // Seed Results
        await Result.create([
            {
                title: "Before & After",
                description: "Lost 15kg in 3 months with personalized training and nutrition plan.",
                transformation: "Weight loss transformation",
                order: 1
            },
            {
                title: "Before & After",
                description: "Gained muscle mass and improved overall fitness level.",
                transformation: "Muscle building transformation",
                order: 2
            },
            {
                title: "Before & After",
                description: "Achieved weight loss goals and maintained healthy lifestyle.",
                transformation: "Lifestyle transformation",
                order: 3
            }
        ]);

        // Create admin user
        const adminPassword = await bcrypt.hash("admin123", 10);
        await User.findOneAndUpdate(
            { email: "admin@kinetiq.com" },
            {
                email: "admin@kinetiq.com",
                password: adminPassword,
                name: "Admin User",
                role: "admin"
            },
            { upsert: true, new: true }
        );

        console.log("✅ Database seeded successfully!");
        process.exit(0);

    } catch (error) {
        console.error("❌ Seeding error:", error);
        process.exit(1);
    }
};

seedData();