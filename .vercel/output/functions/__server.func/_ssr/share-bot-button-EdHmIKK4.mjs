import { i as __toESM } from "../_runtime.mjs";
import { r as APP_ORIGIN } from "./app-meta-DYIgFBD-.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D19HL7Cl.mjs";
import { I as Button, N as useAppStore } from "./store-C7z6kliX.mjs";
import { a as differenceInCalendarDays, o as startOfDay, r as format } from "../_libs/date-fns.mjs";
import { g as Bot } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/share-bot-button-EdHmIKK4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SKILL_URL = `${APP_ORIGIN}/bot.md`;
function nextOccurrence(item, from) {
	const today = startOfDay(from);
	if (!item.recursYearly && item.year) return startOfDay(new Date(item.year, item.month - 1, item.day));
	const year = today.getFullYear();
	let next = startOfDay(new Date(year, item.month - 1, item.day));
	if (next < today) next = startOfDay(new Date(year + 1, item.month - 1, item.day));
	return next;
}
function ritualIsDue(ritual, from) {
	if (!ritual.lastDone) return true;
	return differenceInCalendarDays(startOfDay(from), startOfDay(new Date(ritual.lastDone))) >= ritual.cadenceDays;
}
/** Plain-text handoff a person can drop into a Grok Bot chat or the system share sheet. */
function buildBotBrief(data, from = /* @__PURE__ */ new Date()) {
	const name = data.partner.name.trim();
	const nick = data.partner.nickname.trim();
	const lines = [
		"Good Partner brief — for a Grok Bot. Private. Do not publish this.",
		"",
		`Partner: ${!name ? "not named yet" : nick ? `${name} (${nick})` : name}`
	];
	if (data.partner.pronouns.trim()) lines.push(`Pronouns: ${data.partner.pronouns.trim()}`);
	if (data.partner.loveLanguages.length) lines.push(`Love languages: ${data.partner.loveLanguages.join(", ")}`);
	if (data.partner.likes.length) lines.push(`Likes: ${data.partner.likes.slice(0, 12).join(", ")}`);
	if (data.partner.dislikes.length) lines.push(`Dislikes: ${data.partner.dislikes.slice(0, 8).join(", ")}`);
	const sizes = [
		data.partner.shirtSize && `shirt ${data.partner.shirtSize}`,
		data.partner.shoeSize && `shoes ${data.partner.shoeSize}`,
		data.partner.ringSize && `ring ${data.partner.ringSize}`
	].filter(Boolean);
	if (sizes.length) lines.push(`Sizes: ${sizes.join(", ")}`);
	const favorites = [
		data.partner.favoriteColor && `color ${data.partner.favoriteColor}`,
		data.partner.favoriteFlower && `flower ${data.partner.favoriteFlower}`,
		data.partner.favoriteFood && `food ${data.partner.favoriteFood}`,
		data.partner.favoriteDrink && `drink ${data.partner.favoriteDrink}`
	].filter(Boolean);
	if (favorites.length) lines.push(`Favorites: ${favorites.join("; ")}`);
	if (data.partner.notes.trim()) lines.push(`Notes: ${data.partner.notes.trim()}`);
	if (data.intention.text.trim()) lines.push(`This week: ${data.intention.text.trim()}`);
	const upcoming = data.dates.map((item) => ({
		item,
		days: differenceInCalendarDays(nextOccurrence(item, from), startOfDay(from))
	})).filter((row) => row.days <= 90).sort((a, b) => a.days - b.days).slice(0, 8);
	lines.push("", "Coming up:");
	if (!upcoming.length) lines.push("- None in the next 90 days.");
	else for (const { item, days } of upcoming) {
		const when = days === 0 ? "today" : days === 1 ? "tomorrow" : `in ${days} days`;
		const note = item.notes.trim() ? ` ${item.notes.trim()}` : "";
		lines.push(`- ${item.title} — ${when} (${format(nextOccurrence(item, from), "MMM d")}).${note}`);
	}
	const ideas = data.ideas.filter((idea) => idea.status !== "done").slice(0, 8);
	lines.push("", "Open ideas:");
	if (!ideas.length) lines.push("- None.");
	else for (const idea of ideas) {
		const where = idea.occasion.trim() ? ` · ${idea.occasion.trim()}` : "";
		lines.push(`- [${idea.kind}] ${idea.title}${where}`);
	}
	const due = data.rituals.filter((ritual) => ritualIsDue(ritual, from)).slice(0, 6);
	if (due.length) {
		lines.push("", "Rituals due:");
		for (const ritual of due) lines.push(`- ${ritual.title}`);
	}
	lines.push("", `App: ${APP_ORIGIN}`, `How a Grok Bot should use it: ${SKILL_URL}`, "The journal lives only on the device that shared this. Do not post it, and do not invent dates or sizes that are not written here.");
	return lines.join("\n");
}
/** Hand a brief to Grok Bot via the system share sheet (iPhone lists Grok Bot). */
async function shareWithGrokBot(text) {
	if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
		const file = new File([text], "good-partner-for-grok-bot.md", { type: "text/plain" });
		try {
			if (typeof navigator.canShare === "function" && navigator.canShare({ files: [file] })) {
				await navigator.share({
					title: "Good Partner",
					text: "Brief for a Grok Bot. Private.",
					files: [file]
				});
				return "shared";
			}
		} catch (err) {
			if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
		}
		try {
			await navigator.share({
				title: "Good Partner",
				text,
				url: "https://goodpartner.grok.me/bot.md"
			});
			return "shared";
		} catch (err) {
			if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
		}
	}
	try {
		await navigator.clipboard.writeText(text);
		return "copied";
	} catch {
		return "failed";
	}
}
function ShareWithBotButton({ className, label = "Share with a Grok Bot", variant = "outline", size = "default" }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function share() {
		const s = useAppStore.getState();
		const text = buildBotBrief({
			partner: s.partner,
			dates: s.dates,
			ideas: s.ideas,
			gestures: s.gestures,
			quality: s.quality,
			rituals: s.rituals,
			intention: s.intention,
			weeklyGoal: s.weeklyGoal
		});
		setBusy(true);
		try {
			const result = await shareWithGrokBot(text);
			if (result === "shared") toast.success("If you picked Grok Bot, it has this brief.");
			else if (result === "copied") toast.success("Brief copied. Paste it into a Grok Bot chat.");
			else if (result === "failed") toast.error("Could not share that brief.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant,
		size,
		className: cn(className),
		disabled: busy,
		"data-bot": "share-with-grok",
		onClick: () => void share(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, {
			className: "size-4",
			strokeWidth: 1.75
		}), busy ? "Preparing…" : label]
	});
}
//#endregion
export { ShareWithBotButton as t };
