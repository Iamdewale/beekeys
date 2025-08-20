export const stepValidationRules = {
  1: {
    businessName: (val) =>
      !val?.trim()
        ? "Business name is required"
        : val.length < 3
        ? "Must be at least 3 characters"
        : null,
    slogan: (val) =>
      val && val.length > 50
        ? "Slogan must be under 50 characters"
        : null,
  },
  2: {
    email: [
      (val) => !val?.trim() && "Email is required",
      (val) =>
        val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) && "Enter a valid email",
    ],
    phone: [
      (val) => !val?.trim() && "Phone number is required",
      (val) =>
        val && !/^\+?[0-9]{7,15}$/.test(val) && "Enter a valid phone number",
    ],
    address: (val) => !val?.trim() && "Business address is required",
  },
  3: {
    tags: (val) => !val?.trim() && "At least one tag is required",
    description: (val) =>
      val && val.length > 300
        ? "Description must be under 300 characters"
        : null,
  },
  4: {
    businessName: (val) => !val?.trim() && "Business name is missing",
    phone: (val) => !val?.trim() && "Phone number is missing",
    email: (val) => !val?.trim() && "Email is missing",
    tags: (val) => !val?.trim() && "At least one tag is required",
  },
};
