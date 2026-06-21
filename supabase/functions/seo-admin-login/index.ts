// Hardcoded-credentials login for the /admin/seo dashboard.
// Returns a session token stored in seo_admin_sessions; the dashboard sends
// it back in every request via the x-admin-token header (RLS checks it).
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-token",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ADMIN_USER = "8373914073";
const ADMIN_PASS = "069829";
const SESSION_DAYS = 30;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") ?? "login";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (action === "verify") {
      const token = req.headers.get("x-admin-token") ?? "";
      if (!token) return json({ valid: false }, 200);
      const { data } = await supabase
        .from("seo_admin_sessions")
        .select("id,expires_at")
        .eq("token", token)
        .maybeSingle();
      const valid = !!data && new Date(data.expires_at).getTime() > Date.now();
      return json({ valid }, 200);
    }

    if (action === "logout") {
      const token = req.headers.get("x-admin-token") ?? "";
      if (token) await supabase.from("seo_admin_sessions").delete().eq("token", token);
      return json({ ok: true }, 200);
    }

    // login
    const body = await req.json().catch(() => ({}));
    const { username, password } = body as { username?: string; password?: string };
    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return json({ error: "Invalid credentials" }, 401);
    }
    const token = crypto.randomUUID() + "." + crypto.randomUUID();
    const expires = new Date(Date.now() + SESSION_DAYS * 86400 * 1000).toISOString();
    const { error } = await supabase.from("seo_admin_sessions").insert({
      token,
      expires_at: expires,
      ip: req.headers.get("x-forwarded-for") ?? null,
      user_agent: req.headers.get("user-agent") ?? null,
    });
    if (error) return json({ error: error.message }, 500);
    return json({ token, expires_at: expires }, 200);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(payload: unknown, status: number) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
