import type { Metadata } from "next";
import RegisterView from "./_components/register-view";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a free BookNook account and start borrowing.",
};

export default function RegisterPage() {
  return <RegisterView />;
}
