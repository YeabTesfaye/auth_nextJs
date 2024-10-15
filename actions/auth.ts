"use server";

import { createAuthSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { redirect } from "next/navigation";

export type ValidationErrors = {
  email?: string[];
  password?: string[];
};

type FormState = {
  errors: ValidationErrors;
};

export async function signUp(
  formState: FormState, // removed prevState and adapted to match useFormState expectations
  formData: FormData
) {
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
    // } else {
    //   const passwordValidationRegex =
    //     /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    //   if (password.length < 8) {
    //     errors.password = [
    //       ...(errors.password || []),
    //       "Password must be at least 8 characters long.",
    //     ];
    //   }
    //   if (!passwordValidationRegex.test(password)) {
    //     errors.password = [
    //       ...(errors.password || []),
    //       "Password must contain at least one uppercase letter, one number, and one special character.",
    //     ];
    //   }
  }

  // If there are any validation errors, return them
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);
  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(id);
    redirect("/training");
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email: ["An account with this email already exists."], // Fixed message format
        },
      };
    }
    throw error;
  }
}
export async function login(
  prevState: FormState | undefined,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existingUser: any = getUserByEmail(email);
  if (!existingUser) {
    return {
      errors: {
        email: "Could not authenticate user, please check your credentials",
      },
    };
  }
  const isValidPassword = verifyPassword(existingUser.password, password);
  if (!isValidPassword) {
    return {
      errors: {
        password: "Could not authenticate user, please check your credentials",
      },
    };
  }
  redirect("/training");
  return existingUser;
}

export async function auth(
  mode: any,
  prevState: FormState,
  formData: FormData
) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signUp(prevState, formData);
}
export async function logout() {
  await destroySession();
  redirect("/");
}
