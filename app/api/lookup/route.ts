import { askJson, errorResponse } from "@/lib/claude";
import { isLangCode } from "@/lib/languages";
import { lookupSystemPrompt } from "@/lib/prompts";
import { LOOKUP_SCHEMA, type LookupResult } from "@/lib/tutor";

export async function POST(req: Request) {
  const { lang, word, context } = await req.json().catch(() => ({}));
  if (!isLangCode(lang) || typeof word !== "string" || !word.trim()) {
    return Response.json({ error: "Missing language or word", code: "bad_request" }, { status: 400 });
  }

  try {
    const result = await askJson<LookupResult>({
      system: lookupSystemPrompt(lang),
      messages: [
        {
          role: "user",
          content: `Word: ${word.slice(0, 100)}\nSentence: ${String(context ?? "").slice(0, 500)}`,
        },
      ],
      schema: LOOKUP_SCHEMA,
      maxTokens: 2000,
    });
    return Response.json(result);
  } catch (err) {
    return errorResponse(err);
  }
}
