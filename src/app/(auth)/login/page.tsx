import type { Metadata } from "next";
import LoginView from "./_components/login-view";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your BookNook account.",
};

export default function LoginPage() {
  return <LoginView />;
}
