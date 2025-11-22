// Script per creare utente admin con password corretta
// Esegui con: node scripts/create-admin.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('🔐 Creazione utente admin...');

    // Elimina vecchio admin se esiste
    const existing = await prisma.user.findUnique({
      where: { email: 'admin@gridjacarts.com' }
    });

    if (existing) {
      console.log('⚠️  Admin esistente trovato, lo elimino...');
      await prisma.user.delete({
        where: { email: 'admin@gridjacarts.com' }
      });
    }

    // Genera hash password
    console.log('🔑 Generazione hash password...');
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Crea nuovo admin
    console.log('👤 Creazione nuovo admin...');
    const admin = await prisma.user.create({
      data: {
        email: 'admin@gridjacarts.com',
        name: 'GridjaCards Admin',
        password: hashedPassword,
        role: 'admin',
      }
    });

    console.log('✅ Admin creato con successo!');
    console.log('\n📧 Email:', admin.email);
    console.log('🔑 Password: admin123');
    console.log('⚠️  CAMBIA LA PASSWORD DOPO IL PRIMO LOGIN!\n');

    // Verifica che l'hash funzioni
    const isValid = await bcrypt.compare('admin123', hashedPassword);
    console.log('🧪 Test password:', isValid ? '✅ OK' : '❌ ERRORE');

  } catch (error) {
    console.error('❌ Errore:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
