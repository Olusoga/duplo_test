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
exports.teardownTestDatabase = exports.setupTestDatabase = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function setupTestDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.$executeRaw `CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    author VARCHAR(255),
    user_id VARCHAR(255)
  )`;
    });
}
exports.setupTestDatabase = setupTestDatabase;
function teardownTestDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.$executeRaw `DROP TABLE IF EXISTS post CASCADE`;
    });
}
exports.teardownTestDatabase = teardownTestDatabase;
