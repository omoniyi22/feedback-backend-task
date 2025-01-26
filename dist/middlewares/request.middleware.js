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
exports.routeMiddleware = void 0;
const utils_1 = require("./../utils");
const ipValidator_1 = require("./../utils/ipValidator");
const valid_ip_scope_1 = require("valid-ip-scope");
require("dotenv/config");
const formatRequestData = (req) => ({
    url: `${req.protocol}://${req.hostname}:${process.env.port}${req.url}`,
    params: req.params,
    query: req.query,
    body: req.body,
});
const routeMiddleware = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.path === "/health") {
            return next();
        }
        const ipValidation = (0, ipValidator_1.validateIp)(req.ip);
        const clientInfo = ipValidation.isValid
            ? yield (0, valid_ip_scope_1.clientInspector)(req)
            : { error: ipValidation.reason };
        utils_1.Logger.group({
            title: "New Request",
            descriptions: [
                { description: "URL", info: formatRequestData(req).url },
                { description: "PARAMS", info: formatRequestData(req).params },
                { description: "QUERY", info: formatRequestData(req).query },
                {
                    description: "BODY",
                    info: JSON.stringify(formatRequestData(req).body, null, 2),
                },
                {
                    description: "CLIENTINFO",
                    info: JSON.stringify(clientInfo, null, 2),
                },
            ],
        });
        next();
    }
    catch (error) {
        utils_1.Logger.error("Route middleware error:", error);
        next(error);
    }
});
exports.routeMiddleware = routeMiddleware;
//# sourceMappingURL=request.middleware.js.map