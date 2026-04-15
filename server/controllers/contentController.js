import Hero from "../models/Hero.js";
import About from "../models/About.js";
import Service from "../models/Service.js";
import Program from "../models/Program.js";
import Testimonial from "../models/Testimonial.js";
import Result from "../models/Result.js";

// Hero Content
export const getHero = async (req, res) => {
    try {
        const hero = await Hero.findOne().sort({ updatedAt: -1 });
        res.json(hero || {});
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const updateHero = async (req, res) => {
    try {
        const hero = await Hero.findOneAndUpdate(
            {},
            { ...req.body, updatedAt: new Date() },
            { new: true, upsert: true }
        );
        res.json(hero);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// About Content
export const getAbout = async (req, res) => {
    try {
        const about = await About.findOne().sort({ updatedAt: -1 });
        res.json(about || {});
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const updateAbout = async (req, res) => {
    try {
        const about = await About.findOneAndUpdate(
            {},
            { ...req.body, updatedAt: new Date() },
            { new: true, upsert: true }
        );
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Services
export const getServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ order: 1 });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.json({ message: "Service deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Program
export const getProgram = async (req, res) => {
    try {
        const program = await Program.findOne().sort({ updatedAt: -1 });
        res.json(program || {});
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const updateProgram = async (req, res) => {
    try {
        const program = await Program.findOneAndUpdate(
            {},
            { ...req.body, updatedAt: new Date() },
            { new: true, upsert: true }
        );
        res.json(program);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Testimonials
export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ order: 1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const createTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.create(req.body);
        res.status(201).json(testimonial);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        res.json(testimonial);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        res.json({ message: "Testimonial deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Results
export const getResults = async (req, res) => {
    try {
        const results = await Result.find().sort({ order: 1 });
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const createResult = async (req, res) => {
    try {
        const result = await Result.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const updateResult = async (req, res) => {
    try {
        const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ message: "Result not found" });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const deleteResult = async (req, res) => {
    try {
        const result = await Result.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Result not found" });
        }
        res.json({ message: "Result deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};