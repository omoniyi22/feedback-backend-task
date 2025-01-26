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
exports.signIn = exports.signUp = void 0;
const services_1 = require("./../services");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const utils_1 = require("./../utils");
const signUpHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, role } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = yield services_1.authService.createUser({
        name,
        hashedPassword,
        role,
    });
    if (newUser) {
        res.status(201).json(newUser);
    }
    else {
        res.status(409).json({ message: "User already exists" });
    }
});
const signInHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const user = yield services_1.authService.getUser(name);
    if (!user) {
        res.status(409).json({ messaage: "User not found" });
        return;
    }
    if (!(yield bcryptjs_1.default.compare(password, user.hashedPassword))) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ username: user.name }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    res.status(200).json({
        token: token,
        isAdmin: user.role === "admin",
        username: user.name,
    });
});
exports.signUp = (0, utils_1.errorHandlerWrapper)(signUpHandler);
exports.signIn = (0, utils_1.errorHandlerWrapper)(signInHandler);
//# sourceMappingURL=auth.controller.js.map