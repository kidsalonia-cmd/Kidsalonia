import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function verifyAdminToken(token: string | undefined) {
  if (!token) return false;

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase environment variables are not configured");
    return false;
  }

  const verifyResponse = await fetch(
    `${supabaseUrl}/functions/v1/seo-admin-login?action=verify`,
    {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        authorization: `Bearer ${supabaseKey}`,
        "content-type": "application/json",
        "x-admin-token": token,
      },
      body: "{}",
    },
  ).catch(() => null);

  if (!verifyResponse?.ok) return false;

  const data = await verifyResponse.json().catch(() => null);
  return data?.valid === true;
}

function parseBody(body: unknown) {
  if (!body) return {};
  if (typeof body === "string") return JSON.parse(body);
  return body as Record<string, unknown>;
}

export default async function handler(request: any, response: any) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const isAuthorized = await verifyAdminToken(request.headers["x-admin-token"]);
  if (!isAuthorized) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return response.status(500).json({ error: "OPENAI_API_KEY is not configured" });
  }

  let body: Record<string, unknown>;
  try {
    body = parseBody(request.body);
  } catch {
    return response.status(400).json({ error: "Invalid JSON body" });
  }

  const pageTitle = String(body.pageTitle ?? "").trim();
  const pageContent = String(body.pageContent ?? "").trim();
  const targetKeyword = String(body.targetKeyword ?? "").trim();
  const pageUrl = String(body.pageUrl ?? "").trim();

  if (!pageTitle || !pageContent) {
    return response.status(400).json({ error: "pageTitle and pageContent are required" });
  }

  const trimmedContent = pageContent.slice(0, 8000);

  try {
    const completion = await openai.responses.create({
      model: process.env.OPENAI_SEO_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are an SEO assistant for KidSalonia, a premium kids salon brand in Gurugram. Return only valid JSON with concise, practical suggestions. Do not include markdown.",
        },
        {
          role: "user",
          content: `Create SEO content for this web page.

Page title: ${pageTitle}
Page URL: ${pageUrl || "Not provided"}
Target keyword: ${targetKeyword || "Not provided"}
Page content: ${trimmedContent}

Return JSON with these keys:
metaTitle: string under 60 characters
metaDescription: string under 160 characters
primaryKeyword: string
secondaryKeywords: string[]
faq: array of 3 objects with question and answer
schemaIdeas: string[]
improvementIdeas: string[]`,
        },
      ],
    });

    const raw = completion.output_text;
    const suggestions = JSON.parse(raw);

    return response.status(200).json({ suggestions });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Failed to generate SEO suggestions" });
  }
}
