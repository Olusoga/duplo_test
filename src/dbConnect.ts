 import { PrismaClient } from '@prisma/client' 

async function connectToDatabase() {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    console.log('Connected to the database successfully.');
    // You can perform additional checks or operations if needed
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export default connectToDatabase;

