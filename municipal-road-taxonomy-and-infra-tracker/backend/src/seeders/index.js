const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');
const { User, Road, Work } = require('../models');

const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'admin',
    });
    console.log('Admin user created:', adminUser.email);

    // Create sample roads
    const road1 = await Road.create({
      roadId: 'MG-W01-R001',
      name: 'Gandhi Road',
      ward: 'Ward 1',
      length: 2.5,
      description: 'Main road connecting market to residential area',
    });

    const road2 = await Road.create({
      roadId: 'MG-W02-R002',
      name: 'Nehru Marg',
      ward: 'Ward 2',
      length: 1.8,
      description: 'Road connecting hospital to main highway',
    });

    console.log('Sample roads created');

    // Create sample works
    await Work.create({
      roadId: road1.id,
      vendorName: 'ABC Construction Ltd.',
      cost: 1500000,
      phase: 'Phase 1',
      status: 'Completed',
      startDate: new Date('2023-01-15'),
      endDate: new Date('2023-03-20'),
      description: 'Road widening and resurfacing',
    });

    await Work.create({
      roadId: road1.id,
      vendorName: 'XYZ Infrastructure',
      cost: 800000,
      phase: 'Phase 2',
      status: 'In Progress',
      startDate: new Date('2023-04-10'),
      endDate: null,
      description: 'Drainage system installation',
    });

    await Work.create({
      roadId: road2.id,
      vendorName: 'Modern Roads Inc.',
      cost: 1200000,
      phase: 'Phase 1',
      status: 'Pending',
      startDate: new Date('2023-06-01'),
      endDate: null,
      description: 'Initial road construction',
    });

    console.log('Sample works created');
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit();
  }
};

seedDatabase();