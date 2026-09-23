import { createServerFn } from "@tanstack/react-start";
import type { Suggestion } from "./types";

export type SparkPayload = {
  partnerName: string;
  nickname: string;
  loveLanguages: string[];
  likes: string[];
  dislikes: string[];
  notes: string;
  favorites: string;
  upcoming: { title: string; inDays: number; notes: string }[];
  dueRituals: string[];
  recentGestures: string[];
  ideas: string[];
};

function fallback(data: SparkPayload): Suggestion[] {
  const name = data.nickname || data.partnerName || "them";
  const langs = new Set(data.loveLanguages);
  const out: Suggestion[] = [];
  if (langs.has("Quality Time") || langs.size === 0) {
    out.push({
      title: `A phone-free hour with ${name} tonight`,
      why: "Quality time lands when it is protected, not squeezed in. Put the phones in another room and let the evening be small.",
      effort: "small",
    });
  }
  if (langs.has("Words of Affirmation") || out.length < 2) {
    out.push({
      title: `A specific note about something ${name} did this week`,
      why: "Generic praise fades. Name the moment. Leave it where they'll find it without you watching.",
      effort: "small",
    });
  }
  if (langs.has("Acts of Service") || out.length < 3) {
    out.push({
      title: "Take one chore off their plate without announcing it",
      why: "Service is quieter than a gift. Do the thing they always end up doing, and don't make them thank you for it.",
      effort: "medium",
    });
  }
  return out.slice(0, 3);
}

export const sparkSuggestions = createServerFn({ method: "POST" })
  .validator((input: SparkPayload) => input)
  .handler(async ({ data }): Promise<{ ok: true; suggestions: Suggestion[] } | { ok: false; error: string; suggestions: Suggestion[] }> => {
    const apiKey = process.env.XAI_API_KEY;
    const backup = fallback(data);
    if (!apiKey) {
      return { ok: false, error: "AI is not available", suggestions: backup };
    }

    const prompt = `You help someone be a more attentive partner. Be concrete, adult, and specific — never generic ("be more present", "just listen"). Match love languages. Do not repeat recent gestures. Prefer things that can happen in the next 72 hours.

Partner: ${data.partnerName}${data.nickname ? ` ("${data.nickname}")` : ""}
Love languages: ${data.loveLanguages.join(", ") || "unknown"}
Likes: ${data.likes.join(", ") || "unknown"}
Dislikes: ${data.dislikes.join(", ") || "unknown"}
Favorites / notes: ${data.favorites}. ${data.notes}
Upcoming dates: ${data.upcoming.map((u) => `${u.title} in ${u.inDays} days (${u.notes})`).join("; ") || "none"}
Rituals due: ${data.dueRituals.join("; ") || "none"}
Recent gestures: ${data.recentGestures.join("; ") || "none"}
Saved ideas: ${data.ideas.join("; ") || "none"}

Return JSON only, no markdown:
{"suggestions":[{"title":"short verb-led title","why":"one or two sentences, specific to this person","effort":"small"|"medium"}]}
Exactly 3 suggestions.`;

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500,
          temperature: 0.8,
        }),
      });
      if (!res.ok) {
        return { ok: false, error: `xAI API error ${res.status}`, suggestions: backup };
      }
      const body = (await res.json()) as {
        choices: { message: { content: string } }[];
      };
      const text = body.choices[0]?.message.content ?? "";
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}");
      if (jsonStart < 0 || jsonEnd < 0) {
        return { ok: false, error: "Could not parse suggestions", suggestions: backup };
      }
      const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as {
        suggestions?: Suggestion[];
      };
      const suggestions = (parsed.suggestions ?? [])
        .filter((s) => s && s.title && s.why)
        .slice(0, 3)
        .map((s): Suggestion => ({
          title: String(s.title).slice(0, 120),
          why: String(s.why).slice(0, 400),
          effort: s.effort === "medium" ? "medium" : "small",
        }));
      if (suggestions.length === 0) {
        return { ok: false, error: "Empty suggestions", suggestions: backup };
      }
      return { ok: true, suggestions };
    } catch {
      return { ok: false, error: "Could not reach Grok", suggestions: backup };
    }
  });
