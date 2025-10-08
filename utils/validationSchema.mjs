export const createUserValidationSchema = {
  username: {
    isLength: {
      options: { min: 3, max: 30 },
      errorMessage: "Username must be between 3 and 30 characters",
    },
    notEmpty: { errorMessage: "Username is required" },
    isString: { errorMessage: "Username must be a string" },
  },

  password: {
    notEmpty: { errorMessage: "Password is required" },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
    isString: { errorMessage: "Password must be a string" },
  },
};
