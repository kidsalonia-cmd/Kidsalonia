// Custom Supabase client that injects the admin session token on every request,
// so RLS policies on seo_* tables (which check x-admin-token) can authorize.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export const SEO_ADMIN_TOKEN_KEY = "kidsalonia_seo_admin_token";

export function getSeoAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SEO_ADMIN_TOKEN_KEY);
}

export function setSeoAdminToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(SEO_ADMIN_TOKEN_KEY, token);
  else localStorage.removeItem(SEO_ADMIN_TOKEN_KEY);
}

// Create a fresh client whenever the token changes so headers stay current.
export function makeSeoAdminClient(token: string) {
  return createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-admin-token": token } },
  });
}
