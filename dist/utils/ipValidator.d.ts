type IpValidationResult = {
    isValid: boolean;
    reason?: string;
};
export declare const validateIp: (ip: string) => IpValidationResult;
export {};
