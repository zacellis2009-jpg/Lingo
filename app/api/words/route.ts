import { askJson, errorResponse } from "@/lib/claude";
import { isLangCode } from "@/lib/languages";
import { wordsSystemPrompt } from "@/lib/prompts";
import { WORDS_SCHEMA, type GeneratedWord } from "@/lib/tutor";

export async function POST(req: Request) {
  const { lang, existing = [], topic = "", count = 5 } = await req.json().catch(() => ({}));
  if (!isLangCode(lang)) {
    return Response.json({ error: "Missing language", code: "bad_request" }, { status: 400 });
  }
  const n = Math.min(Math.max(Number(count) || 5, 1), 10);
  const avoid = (Array.isArray(existing) ? existing : []).slice(0, 500).join(", ");

  try {
    const { words } = await askJson<{ words: GeneratedWord[] }>({
      system: wordsSystemPrompt(lang),
      messages: [
        {
          role: "user",
          content:
            `Give me ${n} new words to learn${topic ? ` about "${String(topic).slice(0, 80)}"` : ""}.\n` +
            `Do not repeat any of these words I already have: ${avoid || "(none)"}`,
        },
      ],
      schema: WORDS_SCHEMA,
    });
    return Response.json({ words: words.slice(0, n) });
  } catch (err) {
    return errorResponse(err);
  }
}
