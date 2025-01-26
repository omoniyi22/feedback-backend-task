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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseSetup = void 0;
const entities_1 = require("./../entities");
const datasource_1 = require("./datasource");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const services_1 = require("./../services");
require("dotenv/config");
const databaseSetup = () => __awaiter(void 0, void 0, void 0, function* () {
    yield datasource_1.AppDataSource.initialize();
    const userRepository = datasource_1.AppDataSource.getRepository(entities_1.UserEntity);
    const userCount = yield userRepository.count();
    if (userCount === 0) {
        const adminHashedPassword = yield bcryptjs_1.default.hash(process.env.ADMIN_PASSWORD, 10);
        const adminUser = {
            name: process.env.ADMIN_NAME,
            hashedPassword: adminHashedPassword,
            role: "admin",
        };
        services_1.authService.createUser(adminUser);
    }
});
exports.databaseSetup = databaseSetup;
//# sourceMappingURL=database.setup.js.map