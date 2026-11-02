import type { Metadata } from "next";
import ProfileView from "./_components/profile-view";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Your BookNook reader's card — profile and library activity.",
};

export default function ProfilePage() {
  return <ProfileView />;
}
