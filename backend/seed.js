import 'dotenv/config';
import connectDB from './config/database.js';
import User from './models/User.js';
import HeroSection from './models/HeroSection.js';
import AboutSection from './models/AboutSection.js';
import Service from './models/Service.js';
import Testimonial from './models/Testimonial.js';
import Result from './models/Result.js';
import Program from './models/Program.js';

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await HeroSection.deleteMany({});
    await AboutSection.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    await Result.deleteMany({});
    await Program.deleteMany({});

    console.log('✓ Cleared existing data');

    // Create Admin User
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@kinetiq.com',
      password: 'admin123456',
      role: 'admin',
    });
    await adminUser.save();
    console.log('✓ Created admin user (email: admin@kinetiq.com, password: admin123456)');

    // Create Regular User
    const regularUser = new User({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'password123',
      role: 'user',
    });
    await regularUser.save();
    console.log('✓ Created regular user');

    // Create Hero Section
    const hero = new HeroSection({
      title: 'KINETIQ PERSONAL TRAINING',
      subtitle: 'Premium Personal Trainer with 20+ Years of Experience',
      image: null,
    });
    await hero.save();
    console.log('✓ Created hero section');

    // Create About Section
    const about = new AboutSection({
      text: 'As a dedicated gym trainer with over two decades of experience, I\'ve helped hundreds of clients achieve their fitness goals. My approach combines proven training methods with personalized attention to ensure sustainable results.',
      image: null,
    });
    await about.save();
    console.log('✓ Created about section');

    // Create Services
    const services = [
      {
        title: 'Personal Training',
        description: 'One-on-one personalized training sessions',
        price: 75,
      },
      {
        title: 'Group Classes',
        description: 'High-energy group fitness classes',
        price: 25,
      },
      {
        title: 'Online Coaching',
        description: 'Remote fitness coaching and meal planning',
        price: 50,
      },
      {
        title: 'Nutrition Consultation',
        description: 'Personalized nutrition plans and counseling',
        price: 100,
      },
    ];

    await Service.insertMany(services);
    console.log('✓ Created 4 services');

    // Create Testimonials
    const testimonials = [
      {
        name: 'Sarah Johnson',
        text: 'Transformed my body and mindset. The best investment in myself!',
        rating: 5,
      },
      {
        name: 'Mike Smith',
        text: 'Professional, motivating, and results-driven. Highly recommended!',
        rating: 5,
      },
      {
        name: 'Emma Wilson',
        text: 'Finally found a trainer who truly cares about my progress.',
        rating: 5,
      },
    ];

    await Testimonial.insertMany(testimonials);
    console.log('✓ Created 3 testimonials');

    // Create Results
    const results = [
      {
        beforeImage: null,
        afterImage: null,
        description: 'Lost 30 lbs in 3 months with consistent training',
      },
      {
        beforeImage: null,
        afterImage: null,
        description: 'Built muscle and improved strength by 50%',
      },
    ];

    await Result.insertMany(results);
    console.log('✓ Created 2 results');

    // Create Program
    const program = new Program({
      title: 'Elite 12-Week Transformation',
      description: 'A comprehensive 12-week program combining strength training, cardio, and nutrition planning for complete body transformation.',
    });
    await program.save();
    console.log('✓ Created program');

    console.log('\n✓ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
