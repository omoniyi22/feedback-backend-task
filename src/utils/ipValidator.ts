type IpValidationResult = {
  isValid: boolean;
  reason?: string;
};

/**
 * Regular expression to validate IPv4 address format
 */
const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

/**
 * Validates if the provided IP address is valid
 * @param ip - The IP address to validate
 * @returns IpValidationResult - Contains validation result and optional reason
 */
export const validateIp = (ip: string): IpValidationResult => {
  if (!ip) return { isValid: false, reason: "IP is empty" };

  // Check if the IP is 0.0.0.0, which means fully open
  if (ip === "0.0.0.0") {
    return { isValid: true }; // No restrictions for 0.0.0.0
  }

  // Validate IPv4 format using regex
  const isValidIpv4 = ipv4Regex.test(ip);
  return {
    isValid: isValidIpv4,
    reason: isValidIpv4 ? undefined : "Invalid IP format",
  };
};
