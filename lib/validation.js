// Form validation utilities
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateURL = (url) => {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return url.startsWith("http://") || url.startsWith("https://");
  } catch {
    return false;
  }
};

export const validateLinkedInURL = (url) => {
  if (!url) return true; // Optional field
  return url.includes("linkedin.com");
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateLength = (value, min, max, fieldName) => {
  if (value && value.length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  if (value && value.length > max) {
    return `${fieldName} must be less than ${max} characters`;
  }
  return null;
};

export const validateJobForm = (formData) => {
  const errors = {};

  // Required fields
  const companyError = validateRequired(formData.Company, "Company");
  if (companyError) errors.Company = companyError;

  const roleError = validateRequired(formData.Role, "Role");
  if (roleError) errors.Role = roleError;

  // URL validation
  if (formData.Careers_Page && !validateURL(formData.Careers_Page)) {
    errors.Careers_Page =
      "Please enter a valid URL (must start with http:// or https://)";
  }

  if (
    formData.LinkedIn_Profile &&
    !validateLinkedInURL(formData.LinkedIn_Profile)
  ) {
    errors.LinkedIn_Profile = "Please enter a valid LinkedIn URL";
  }

  // Length validation
  const notesError = validateLength(formData.Notes, 0, 500, "Notes");
  if (notesError) errors.Notes = notesError;

  // Priority validation
  const priority = parseInt(formData.Priority);
  if (priority < 1 || priority > 5) {
    errors.Priority = "Priority must be between 1 and 5";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateProductForm = (formData) => {
  const errors = {};

  // Required fields
  const companyError = validateRequired(formData.company, "Company");
  if (companyError) errors.company = companyError;

  const roleError = validateRequired(formData.target_role, "Role");
  if (roleError) errors.target_role = roleError;

  // URL validation
  if (formData.careers_page && !validateURL(formData.careers_page)) {
    errors.careers_page =
      "Please enter a valid URL (must start with http:// or https://)";
  }

  if (
    formData.linkedin_profile &&
    !validateLinkedInURL(formData.linkedin_profile)
  ) {
    errors.linkedin_profile = "Please enter a valid LinkedIn URL";
  }

  // Length validation
  const notesError = validateLength(formData.notes, 0, 500, "Notes");
  if (notesError) errors.notes = notesError;

  // Priority validation
  const priority = parseInt(formData.priority);
  if (priority < 1 || priority > 5) {
    errors.priority = "Priority must be between 1 and 5";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateAuthForm = (email, password, isSignup = false) => {
  const errors = {};

  // Email validation
  if (!email) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Please enter a valid email address";
  }

  // Password validation
  if (!password) {
    errors.password = "Password is required";
  } else if (isSignup && password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
