// src/routes/posts.ts
import { FastifyInstance } from 'fastify';
import BlogController from './blog-controller';


const blogRoutes = (fastify: FastifyInstance, controller: BlogController) => {
    fastify.get('/posts', controller.getAllPosts.bind(controller));
    fastify.get('/posts/:id', controller.getPostById.bind(controller));
    fastify.post('/posts', controller.createPost.bind(controller));
    fastify.put('/posts/:id', controller.updatePost.bind(controller));
    fastify.delete('/posts/:id', controller.deletePost.bind(controller));
  };
  
  export default blogRoutes;