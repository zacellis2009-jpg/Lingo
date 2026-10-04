import { askJson, errorResponse } from "@/lib/claude";
import { isLangCode } from "@/lib/languages";
import { tutorSystemPrompt } from "@/lib/prompts";
import { TUTOR_REPLY_SCHEMA, type ChatRequest, type TutorReply } from "@/lib/tutor";

/** Only send the most recent turns so long chats stay fast and cheap. */
const MAX_TURNS = 30;

export async function POST(req: Request) {
  let body: ChatRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON", code: "bad_request" }, { status: 400 });
  }

  const { lang, scenario, messages, knownWords = [], todaysWords = [] } = body;
  if (!isLangCode(lang) || !Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Missing language or messages", code: "bad_request" }, { status: 400 });
  }

  let recent = messages.slice(-MAX_TURNS);
  // The API requires the conversation to start with a user turn.
  while (recent.length && recent[0].role !== "user") recent = recent.slice(1);

  try {
    const reply = await askJson<TutorReply>({
      system: tutorSystemPrompt(lang, scenario, knownWords.slice(0, 300), todaysWords.slice(0, 20)),
      messages: recent.map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) })),
      schema: TUTOR_REPLY_SCHEMA,
    });
    return Response.json(reply);
  } catch (err) {
    return errorResponse(err);
  }
}
