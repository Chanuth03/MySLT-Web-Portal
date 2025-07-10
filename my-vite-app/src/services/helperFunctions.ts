export const parseTime = (expireTime: string) => {
  if (expireTime) {
    const year = +expireTime.slice(0, 4);
    const month = parseInt(expireTime.slice(4, 6), 10) - 1;
    const day = +expireTime.slice(6, 8);
    const hours = +expireTime.slice(8, 10) || 0;
    const minutes = +expireTime.slice(10, 12) || 0;
    const seconds = +expireTime.slice(12, 14) || 0;

    return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
  }
  return null;
};

export const determineUserType = (input: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email format
  const phoneRegex = /^\d{10}$/; // Validates a 10-digit mobile number
  if (emailRegex.test(input)) {
    return "EMAIL";
  }
  if (phoneRegex.test(input)) {
    return "MOBILE";
  }
  return "UNKNOWN";
};