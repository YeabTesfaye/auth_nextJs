"use server";

type ValidationErrors = {
  email?: string[];
  password?: string[];
};

// Change errors type to ValidationErrors
type FormState = {
  errors: ValidationErrors; // Update this to match the validation errors
};

export async function signUp(prevState: FormState | undefined, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: ValidationErrors = {};

  // Validate email
  if (!email) {
    errors.email = [...(errors.email || []), "Email is required."];
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = [...(errors.email || []), "Invalid email format."];
  }

  // Validate password
  if (!password) {
    errors.password = [...(errors.password || []), "Password is required."];
  } else {
    const passwordValidationRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (password.length < 8) {
      errors.password = [...(errors.password || []), "Password must be at least 8 characters long."];
    }
    if (!passwordValidationRegex.test(password)) {
      errors.password = [...(errors.password || []), "Password must contain at least one uppercase letter, one number, and one special character."];
    }
  }

  // If there are any errors, return them
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Return undefined or a success state if needed
  return undefined; // Or return { success: true }; based on your logic
}
