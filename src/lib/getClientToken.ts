import { authClient } from "./auth-client";

/**
 * `Authorization` header for backend calls from the browser, or `null` when
 * the token can't be retrieved. Callers must treat `null` as "no session" and
 * skip the request rather than sending `Bearer undefined`.
 */
export const getClientToken = async (): Promise<string | null> => {
  const { data, error } = await authClient.token();

  if (error) {
    console.error("getClientToken:", error);
    return null;
  }

  const token = data?.token;

  return token ? `Bearer ${token}` : null;
};
