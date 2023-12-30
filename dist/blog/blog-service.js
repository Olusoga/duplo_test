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
class BlogService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAllPosts({ page = 1, pageSize = 10 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * pageSize;
            return this.prisma.post.findMany({
                skip: offset,
                take: pageSize,
            });
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.post.findUnique({
                where: { id },
            });
        });
    }
    createPost(title, content, author, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.post.create({
                data: { title, content, author, user_id },
            });
        });
    }
    updatePost(id, title, content, author) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingPost = yield this.prisma.post.findUnique({
                where: { id },
            });
            if (!existingPost) {
                return null;
            }
            // Apply the update
            const updatedPost = yield this.prisma.post.updateMany({
                where: { id },
                data: {
                    title: title !== undefined ? { set: title } : undefined,
                    content: content !== undefined ? { set: content } : undefined,
                    author: author !== undefined ? { set: author } : undefined,
                },
            });
            return updatedPost;
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.post.delete({
                where: { id },
            });
        });
    }
}
exports.default = BlogService;
