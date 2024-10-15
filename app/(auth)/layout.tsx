import { ReactNode } from "react";
import "../globals.css";
import { logout } from "@/actions/auth";
export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header id="auth-header">
          <p>Welcome Back</p>
          <form action={logout}>
            <button>Logout</button>
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}
