import fastify from 'fastify';
import 'dotenv/config';
import BlogService from '../src/blog/blog-service';
import BlogController from '../src/blog/blog-controller';
import blogRoutes from '../src/blog/blog-route'
import connectToDatabase from './dbConnect';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
connectToDatabase()

const blogService = new BlogService(prisma);
const blogController = new BlogController(blogService)
const server = fastify({ logger: true });


// Register routes
blogRoutes(server, blogController);


server.listen(3000, '0.0.0.0', (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening on ${address}`);

});

// Close Prisma on process exit
process.on('beforeExit', () => {
  prisma.$disconnect();
});

export { server, prisma };
