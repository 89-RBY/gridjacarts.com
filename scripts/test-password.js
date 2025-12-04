// Test password hash
const bcrypt = require('bcryptjs');

async function testPassword() {
  // Inserisci qui l'hash dal database
  const hashFromDB = process.argv[2];
  const passwordToTest = 'admin123';

  console.log('🧪 Testing password hash...\n');
  console.log('Hash from DB:', hashFromDB);
  console.log('Testing password:', passwordToTest);
  console.log('');

  try {
    const isValid = await bcrypt.compare(passwordToTest, hashFromDB);
    console.log('Result:', isValid ? '✅ PASSWORD MATCHES!' : '❌ PASSWORD DOES NOT MATCH');

    if (!isValid) {
      console.log('\n🔧 Generating correct hash for "admin123"...');
      const correctHash = await bcrypt.hash('admin123', 10);
      console.log('Correct hash:', correctHash);
      console.log('\nExecute this SQL to fix:');
      console.log(`UPDATE "User" SET password = '${correctHash}' WHERE email = 'admin@gridjacarts.com';`);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

if (!process.argv[2]) {
  console.log('Usage: node test-password.js <hash-from-database>');
  process.exit(1);
}

testPassword();
