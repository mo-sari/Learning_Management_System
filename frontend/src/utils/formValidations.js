export const validateRequiredFields = (name, email, password, re_password) => {
  if (!name || !email || !password || !re_password) {
    return "All fields are required.";
  }
  return null; // No error
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return null; // No error
};

export const validatePasswordMatch = (password, re_password) => {
  if (password !== re_password) {
    return "Passwords do not match.";
  }
  return null; // No error
};

export const validatePasswordStrength = (password) => {
  const passwordStrengthRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordStrengthRegex.test(password)) {
    return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }
  return null; // No error
};
