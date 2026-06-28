import { getSeoAdminToken } from "@/integrations/supabase/seoAdminClient";

export type SeoAssistantRequest = {
  pageTitle: string;
  pageContent: string;
  pageUrl?: string;
  targetKeyword?: string;
};

export type SeoAssistantSuggestions = {
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  faq: { question: string; answer: string }[];
  schemaIdeas: string[];
  improvementIdeas: string[];
};

export async function generateSeoSuggestions(payload: SeoAssistantRequest) {
  const token = getSeoAdminToken();
  if (!token) throw new Error("Please sign in to SEO Admin first.");

  const response = await fetch("/api/seo", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-admin-token": token,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "SEO assistant request failed");
  }

  return data.suggestions as SeoAssistantSuggestions;
}
