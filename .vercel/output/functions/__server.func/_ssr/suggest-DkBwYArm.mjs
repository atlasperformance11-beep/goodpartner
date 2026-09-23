import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/suggest-DkBwYArm.js
function fallback(data) {
	const name = data.nickname || data.partnerName || "them";
	const langs = new Set(data.loveLanguages);
	const out = [];
	if (langs.has("Quality Time") || langs.size === 0) out.push({
		title: `A phone-free hour with ${name} tonight`,
		why: "Quality time lands when it is protected, not squeezed in. Put the phones in another room and let the evening be small.",
		effort: "small"
	});
	if (langs.has("Words of Affirmation") || out.length < 2) out.push({
		title: `A specific note about something ${name} did this week`,
		why: "Generic praise fades. Name the moment. Leave it where they'll find it without you watching.",
		effort: "small"
	});
	if (langs.has("Acts of Service") || out.length < 3) out.push({
		title: "Take one chore off their plate without announcing it",
		why: "Service is quieter than a gift. Do the thing they always end up doing, and don't make them thank you for it.",
		effort: "medium"
	});
	return out.slice(0, 3);
}
var sparkSuggestions_createServerFn_handler = createServerRpc({
	id: "e8e378687dfa890ecf9a50f4aaabb46128611cf4cb0d82c4362cd2fac8bcecd2",
	name: "sparkSuggestions",
	filename: "src/lib/suggest.ts"
}, (opts) => sparkSuggestions.__executeServer(opts));
var sparkSuggestions = createServerFn({ method: "POST" }).validator((input) => input).handler(sparkSuggestions_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	const backup = fallback(data);
	if (!apiKey) return {
		ok: false,
		error: "AI is not available",
		suggestions: backup
	};
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
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				messages: [{
					role: "user",
					content: prompt
				}],
				max_tokens: 500,
				temperature: .8
			})
		});
		if (!res.ok) return {
			ok: false,
			error: `xAI API error ${res.status}`,
			suggestions: backup
		};
		const text = (await res.json()).choices[0]?.message.content ?? "";
		const jsonStart = text.indexOf("{");
		const jsonEnd = text.lastIndexOf("}");
		if (jsonStart < 0 || jsonEnd < 0) return {
			ok: false,
			error: "Could not parse suggestions",
			suggestions: backup
		};
		const suggestions = (JSON.parse(text.slice(jsonStart, jsonEnd + 1)).suggestions ?? []).filter((s) => s && s.title && s.why).slice(0, 3).map((s) => ({
			title: String(s.title).slice(0, 120),
			why: String(s.why).slice(0, 400),
			effort: s.effort === "medium" ? "medium" : "small"
		}));
		if (suggestions.length === 0) return {
			ok: false,
			error: "Empty suggestions",
			suggestions: backup
		};
		return {
			ok: true,
			suggestions
		};
	} catch {
		return {
			ok: false,
			error: "Could not reach Grok",
			suggestions: backup
		};
	}
});
//#endregion
export { sparkSuggestions_createServerFn_handler };
