import HeroSection from '../models/HeroSection.js';
import AboutSection from '../models/AboutSection.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';
import Result from '../models/Result.js';
import Program from '../models/Program.js';
import { STATUS_CODES, MESSAGES } from '../config/constants.js';

// Get Hero Section
export const getHero = async (req, res, next) => {
  try {
    let hero = await HeroSection.findOne();

    if (!hero) {
      hero = new HeroSection();
      await hero.save();
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_FETCHED,
      data: hero,
    });
  } catch (error) {
    next(error);
  }
};

// Get About Section
export const getAbout = async (req, res, next) => {
  try {
    let about = await AboutSection.findOne();

    if (!about) {
      about = new AboutSection();
      await about.save();
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_FETCHED,
      data: about,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Services
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find();

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_FETCHED,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Testimonials
export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find();

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_FETCHED,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Results
export const getResults = async (req, res, next) => {
  try {
    const results = await Result.find();

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_FETCHED,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

// Get Program
export const getProgram = async (req, res, next) => {
  try {
    let program = await Program.findOne();

    if (!program) {
      program = new Program({ title: 'Training Program', description: '' });
      await program.save();
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_FETCHED,
      data: program,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getHero,
  getAbout,
  getServices,
  getTestimonials,
  getResults,
  getProgram,
};
