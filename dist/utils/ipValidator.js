"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIp = void 0;
const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const validateIp = (ip) => {
    if (!ip)
        return { isValid: false, reason: "IP is empty" };
    if (ip === "0.0.0.0") {
        return { isValid: true };
    }
    const isValidIpv4 = ipv4Regex.test(ip);
    return {
        isValid: isValidIpv4,
        reason: isValidIpv4 ? undefined : "Invalid IP format",
    };
};
exports.validateIp = validateIp;
//# sourceMappingURL=ipValidator.js.map