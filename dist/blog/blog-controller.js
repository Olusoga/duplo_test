"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
;
const blogsValidation_1 = require("../utils/blogsValidation");
class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    getAllPosts(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = request.query.page ? parseInt(request.query.page, 10) : 1;
            const pageSize = request.query.pageSize ? parseInt(request.query.pageSize, 10) : 10;
            try {
                const posts = yield this.blogService.getAllPosts({ page, pageSize });
                reply.send(posts);
            }
            catch (error) {
                console.error(error);
                reply.code(500).send({ error: 'Internal Server Error' });
            }
        });
    }
    getPostById(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = parseInt(request.params.id, 10);
            const post = yield this.blogService.getPostById(postId);
            if (!post) {
                reply.code(404).send({ error: 'Post not found' });
                return;
            }
            reply.send(post);
        });
    }
    createPost(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate request payload using Joi schema
                const { error, value } = blogsValidation_1.createPostSchema.validate(request.body);
                if (error) {
                    reply.code(400).send({ error: error.details[0].message });
                    return;
                }
                const { title, content, author, user_id } = value;
                const post = yield this.blogService.createPost(title, content, author, user_id);
                reply.code(201).send(post);
            }
            catch (error) {
                console.error(error);
                reply.code(500).send({ error: 'Internal Server Error' });
            }
        });
    }
    updatePost(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = parseInt(request.params.id, 10);
            const { title, content, author } = request.body;
            try {
                // Validate request payload using Joi schema
                const { error, value } = blogsValidation_1.updatePostSchema.validate({ title, content, author });
                if (error) {
                    reply.code(400).send({ error: error.details[0].message });
                    return;
                }
                const updatedPost = yield this.blogService.updatePost(postId, value.title, value.content, value.author);
                if (!updatedPost) {
                    reply.code(404).send({ error: 'Post not found' });
                    return;
                }
                reply.send(updatedPost);
            }
            catch (error) {
                console.error(error);
                reply.code(500).send({ error: 'Internal Server Error' });
            }
        });
    }
    deletePost(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate request parameters using Joi schema
                const { error, value } = blogsValidation_1.deletePostParamsSchema.validate(request.params);
                if (error) {
                    reply.code(400).send({ error: error.details[0].message });
                    return;
                }
                const postId = parseInt(value.id, 10);
                const deletedPost = yield this.blogService.deletePost(postId);
                if (!deletedPost) {
                    reply.code(404).send({ error: 'Post not found' });
                    return;
                }
                reply.send(deletedPost);
            }
            catch (error) {
                console.error(error);
                reply.code(500).send({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = BlogController;
