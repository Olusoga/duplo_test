"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blogRoutes = (fastify, controller) => {
    fastify.get('/posts', controller.getAllPosts.bind(controller));
    fastify.get('/posts/:id', controller.getPostById.bind(controller));
    fastify.post('/posts', controller.createPost.bind(controller));
    fastify.put('/posts/:id', controller.updatePost.bind(controller));
    fastify.delete('/posts/:id', controller.deletePost.bind(controller));
};
exports.default = blogRoutes;
