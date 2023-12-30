"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostParamsSchema = exports.updatePostSchema = exports.createPostSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPostSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    user_id: joi_1.default.string().required(),
});
exports.updatePostSchema = joi_1.default.object({
    title: joi_1.default.string(),
    content: joi_1.default.string(),
    author: joi_1.default.string(),
});
exports.deletePostParamsSchema = joi_1.default.object({
    id: joi_1.default.string().required().pattern(/^[0-9]+$/),
});
