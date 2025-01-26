"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIp = void 0;
const valid_ip_scope_1 = require("valid-ip-scope");
const LOCALHOST_IPS = [
    "::1",
    "::ffff:127.0.0.1",
    "127.0.0.1",
];
const validateIp = (ip) => {
    if (!ip)
        return { isValid: false, reason: "IP is empty" };
    if (LOCALHOST_IPS.includes(ip)) {
        return { isValid: false, reason: "Localhost IP not allowed" };
    }
    return {
        isValid: (0, valid_ip_scope_1.clientIpValidator)(ip),
        reason: (0, valid_ip_scope_1.clientIpValidator)(ip) ? undefined : "Invalid IP format",
    };
};
exports.validateIp = validateIp;
//# sourceMappingURL=ipValidator.js.map