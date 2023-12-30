import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setupTestDatabase() {
  await prisma.$executeRaw`CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    author VARCHAR(255),
    user_id VARCHAR(255)
  )`;
}

async function teardownTestDatabase() {
  await prisma.$executeRaw`DROP TABLE IF EXISTS post CASCADE`;
}

export { setupTestDatabase, teardownTestDatabase };
