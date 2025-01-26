"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backendSetup = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./../routers"));
const utils_1 = require("./../utils");
const middlewares_1 = require("./../middlewares");
const backendSetup = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(middlewares_1.routeMiddleware);
    app.use("/health", (_req, res) => {
        res.send("It's healthy!");
    });
    app.use("/api", routers_1.default);
    app.use(middlewares_1.errorHandlerMiddleware);
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        utils_1.Logger.info(`Sever is running on ${port}`);
    });
};
exports.backendSetup = backendSetup;
//# sourceMappingURL=backend.setup.js.map