"use client";

import type { ApiError } from "./tutor";

export class ApiCallError extends Error {
  constructor(message: string, public code?: ApiError["code"]) {
    super(message);
  }
}

export async function postJson<T>(url: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiCallError("Can't reach the server. Check your internet connection.");
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = data as ApiError | null;
    throw new ApiCallError(err?.error ?? `Request failed (${res.status})`, err?.code);
  }
  return data as T;
}
