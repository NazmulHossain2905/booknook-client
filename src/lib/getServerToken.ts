import { headers } from "next/headers";
import { auth } from "./auth";

/**
 * `Authorization` header for backend calls, or `null` when the session has no
 * usable JWT. Returning `Bearer undefined` would only turn a missing/expired
 * session into an opaque 401 the UI can't explain, so callers get `null` and
 * decide what to do.
 */
export const getServerToken = async (): Promise<string | null> => {
  const jwt = await auth.api.getToken({
    headers: await headers(),
  });

  const token = jwt?.token;

  return token ? `Bearer ${token}` : null;
};
