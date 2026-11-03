import { headers } from "next/headers";
import { auth } from "./auth";

export const getServerToken = async () => {
  const jwt = await auth.api.getToken({
    headers: await headers(),
  });

  const token = jwt?.token;

  return `Bearer ${token}`;
};
