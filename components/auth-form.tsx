"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { signUp } from "@/actions/auth";

type ValidationErrorKeys = "email" | "password";

function AuthForm() {
  const [formState, formAction] = useFormState(signUp, {
    errors: {},
  });

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState?.errors && Object.keys(formState.errors).length > 0 && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((key) => {
            const errorKey = key as ValidationErrorKeys;
        
            return (
              <li key={errorKey}>
                {formState.errors[errorKey]}
              </li>
            );
          })}
        </ul>
      )}
      <p>
        <button type="submit">Create Account</button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}

export default AuthForm;
