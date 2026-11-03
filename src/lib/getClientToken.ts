import { authClient } from "./auth-client";

export const getClientToken = async () => {
  const { data, error } = await authClient.token();

  if (error) {
    console.error(error ?? "getClientToken Error");
  }

  const token = data?.token;

  return `Bearer ${token}`;
};
