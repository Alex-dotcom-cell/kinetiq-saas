import HeroSection from '../models/HeroSection.js';
import AboutSection from '../models/AboutSection.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';
import Result from '../models/Result.js';
import Program from '../models/Program.js';
import { STATUS_CODES, MESSAGES } from '../config/constants.js';

// ============= HERO SECTION =============

export const updateHero = async (req, res, next) => {
  try {
    const { title, subtitle, image } = req.body;

    let hero = await HeroSection.findOne();
    if (!hero) {
      hero = new HeroSection();
    }

    if (title) hero.title = title;
    if (subtitle) hero.subtitle = subtitle;
    if (image) hero.image = image;
    hero.updatedAt = new Date();

    await hero.save();

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_UPDATED,
      data: hero,
    });
  } catch (error) {
    next(error);
  }
};

// ============= ABOUT SECTION =============

export const updateAbout = async (req, res, next) => {
  try {
    const { text, image } = req.body;

    let about = await AboutSection.findOne();
    if (!about) {
      about = new AboutSection();
    }

    if (text) about.text = text;
    if (image) about.image = image;
    about.updatedAt = new Date();

    await about.save();

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_UPDATED,
      data: about,
    });
  } catch (error) {
    next(error);
  }
};

// ============= SERVICES =============

export const createService = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_INPUT,
      });
    }

    const service = new Service({
      title,
      description,
      price,
      updatedAt: new Date(),
    });

    await service.save();

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: MESSAGES.CONTENT_CREATED,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: MESSAGES.CONTENT_NOT_FOUND,
      });
    }

    if (title) service.title = title;
    if (description) service.description = description;
    if (price !== undefined) service.price = price;
    service.updatedAt = new Date();

    await service.save();

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_UPDATED,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: MESSAGES.CONTENT_NOT_FOUND,
      });
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_DELETED,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// ============= TESTIMONIALS =============

export const createTestimonial = async (req, res, next) => {
  try {
    const { name, text, rating } = req.body;

    if (!name || !text) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_INPUT,
      });
    }

    const testimonial = new Testimonial({
      name,
      text,
      rating,
      updatedAt: new Date(),
    });

    await testimonial.save();

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: MESSAGES.CONTENT_CREATED,
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, text, rating } = req.body;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: MESSAGES.CONTENT_NOT_FOUND,
      });
    }

    if (name) testimonial.name = name;
    if (text) testimonial.text = text;
    if (rating) testimonial.rating = rating;
    testimonial.updatedAt = new Date();

    await testimonial.save();

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_UPDATED,
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: MESSAGES.CONTENT_NOT_FOUND,
      });
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_DELETED,
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// ============= RESULTS =============

export const createResult = async (req, res, next) => {
  try {
    const { beforeImage, afterImage, description } = req.body;

    const result = new Result({
      beforeImage,
      afterImage,
      description,
      updatedAt: new Date(),
    });

    await result.save();

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: MESSAGES.CONTENT_CREATED,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { beforeImage, afterImage, description } = req.body;

    const result = await Result.findById(id);
    if (!result) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: MESSAGES.CONTENT_NOT_FOUND,
      });
    }

    if (beforeImage) result.beforeImage = beforeImage;
    if (afterImage) result.afterImage = afterImage;
    if (description) result.description = description;
    result.updatedAt = new Date();

    await result.save();

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_UPDATED,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteResult = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Result.findByIdAndDelete(id);
    if (!result) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: MESSAGES.CONTENT_NOT_FOUND,
      });
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_DELETED,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ============= PROGRAM =============

export const updateProgram = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    let program = await Program.findOne();
    if (!program) {
      program = new Program();
    }

    if (title) program.title = title;
    if (description) program.description = description;
    program.updatedAt = new Date();

    await program.save();

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.CONTENT_UPDATED,
      data: program,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  updateHero,
  updateAbout,
  createService,
  updateService,
  deleteService,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  createResult,
  updateResult,
  deleteResult,
  updateProgram,
};
