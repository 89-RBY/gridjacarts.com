// Test database connection and user query
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDBConnection() {
  try {
    console.log('🔍 Testing database connection...\n');

    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully\n');

    // Count users
    const userCount = await prisma.user.count();
    console.log(`👥 Total users in database: ${userCount}\n`);

    // Find admin
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@gridjacarts.com' }
    });

    if (admin) {
      console.log('✅ Admin user found!');
      console.log('Email:', admin.email);
      console.log('Name:', admin.name);
      console.log('Role:', admin.role);
      console.log('Password hash (first 30 chars):', admin.password.substring(0, 30));
      console.log('');

      // Test password
      const bcrypt = require('bcryptjs');
      const isValid = await bcrypt.compare('admin123', admin.password);
      console.log('🧪 Password "admin123" test:', isValid ? '✅ VALID' : '❌ INVALID');
    } else {
      console.log('❌ Admin user NOT found in database!');
      console.log('Run: railway run node scripts/create-admin.js');
    }

  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDBConnection();
