import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type { ApiError } from "./tutor";

export const MODEL = process.env.CLAUDE_MODEL || "claude-opus-5-5";

export class MissingKeyError extends Error {}
export class RefusalError extends Error {}

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new MissingKeyError("ANTHROPIC_API_KEY is not set");
  }
  client ??= new Anthropic();
  return client;
}

interface JsonRequest {
  system: string;
  messages: Anthropic.Beta.BetaMessageParam[];
  schema: Record<string, unknown>;
  maxTokens?: number;
}

/**
 * Ask Claude for a reply that matches `schema` and return it parsed.
 * Uses low effort to keep chat fast and cheap, and opts into the
 * server-side refusal fallback so a declined turn is retried on another model.
 */
export async function askJson<T>({ system, messages, schema, maxTokens = 4000 }: JsonRequest): Promise<T> {
  const response = await getClient().beta.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    cache_control: { type: "ephemeral" },
    output_config: {
      effort: "low",
      format: { type: "json_schema", schema },
    },
    system,
    messages,
  });

  if (response.stop_reason === "refusal") {
    throw new RefusalError("The request was declined.");
  }

  const text = response.content
    .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
  return JSON.parse(text) as T;
}

/** Turn any thrown error into a JSON response the UI knows how to show. */
export function errorResponse(err: unknown): Response {
  let body: ApiError;
  let status: number;
  if (err instanceof MissingKeyError) {
    body = {
      error: "No Claude API key yet. Add ANTHROPIC_API_KEY to your environment (see README).",
      code: "missing_api_key",
    };
    status = 503;
  } else if (err instanceof RefusalError) {
    body = { error: "Claude couldn't answer that one. Try rephrasing.", code: "refusal" };
    status = 422;
  } else if (err instanceof Anthropic.AuthenticationError) {
    body = { error: "Your Claude API key was rejected. Double-check it.", code: "missing_api_key" };
    status = 503;
  } else if (err instanceof Anthropic.RateLimitError) {
    body = { error: "Too many requests right now. Wait a moment and try again.", code: "upstream" };
    status = 429;
  } else if (err instanceof Anthropic.APIError) {
    console.error("Claude API error", err.status, err.message);
    body = { error: "Claude is having trouble right now. Try again in a moment.", code: "upstream" };
    status = 502;
  } else {
    console.error(err);
    body = { error: "Something went wrong.", code: "upstream" };
    status = 500;
  }
  return Response.json(body, { status });
}
