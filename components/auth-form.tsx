"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { auth, signUp, ValidationErrors } from "@/actions/auth";

type ValidationErrorKeys = "email" | "password";

interface AuthFormProps {
  mode: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [formState, formAction] = useFormState(auth.bind(null, mode), {
    errors: {} as ValidationErrors,
  });
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </p>
      {formState?.errors && Object.keys(formState.errors).length > 0 && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((key) => {
            const errorKey = key as ValidationErrorKeys;
            return <li key={errorKey}>{formState.errors[errorKey]}</li>;
          })}
        </ul>
      )}
      <p className="">
        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "signup" ? (
          <Link href="/?mode=login">Already have an account? Login</Link>
        ) : (
          <Link href="/?mode=signup">Don't have an account? Sign Up</Link>
        )}
      </p>
    </form>
  );
};

export default AuthForm;
