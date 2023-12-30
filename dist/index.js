"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.server = void 0;
const fastify_1 = __importDefault(require("fastify"));
require("dotenv/config");
const blog_service_1 = __importDefault(require("../src/blog/blog-service"));
const blog_controller_1 = __importDefault(require("../src/blog/blog-controller"));
const blog_route_1 = __importDefault(require("../src/blog/blog-route"));
const dbConnect_1 = __importDefault(require("./dbConnect"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
(0, dbConnect_1.default)();
const blogService = new blog_service_1.default(prisma);
const blogController = new blog_controller_1.default(blogService);
const server = (0, fastify_1.default)({ logger: true });
exports.server = server;
// Register routes
(0, blog_route_1.default)(server, blogController);
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
