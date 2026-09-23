import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as Slot, P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as nid, t as cn } from "./utils-D19HL7Cl.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { a as differenceInCalendarDays, l as addDays, n as getDay, o as startOfDay, r as format, s as startOfWeek } from "../_libs/date-fns.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
			outline: "border border-border bg-card text-foreground hover:bg-muted shadow-[var(--shadow-card)]",
			ghost: "text-foreground hover:bg-muted",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-md px-3 text-sm",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/store-C7z6kliX.js
function isIosDevice() {
	if (typeof navigator === "undefined") return false;
	const ua = navigator.userAgent;
	if (/iPad|iPhone|iPod/.test(ua)) return true;
	return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}
function isAndroidDevice() {
	if (typeof navigator === "undefined") return false;
	return /Android/i.test(navigator.userAgent);
}
function isStandaloneDisplay() {
	if (typeof window === "undefined") return false;
	const nav = navigator;
	return window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: fullscreen)").matches || window.matchMedia("(display-mode: minimal-ui)").matches || Boolean(nav.standalone);
}
function isIosSafari() {
	if (!isIosDevice()) return false;
	const ua = navigator.userAgent;
	if (/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua)) return false;
	return /Safari/.test(ua) || isStandaloneDisplay();
}
function shouldPromptHomeScreen() {
	return isIosDevice() && isIosSafari() && !isStandaloneDisplay();
}
function shouldPromptAndroidInstall() {
	return isAndroidDevice() && !isStandaloneDisplay();
}
/** Cross-origin iframes throw when reading window.top. */
function isEmbeddedFrame() {
	if (typeof window === "undefined") return false;
	try {
		return window.self !== window.top;
	} catch {
		return true;
	}
}
var INSTALL_DISMISS_KEY = "good-partner-install-dismissed";
function isoDate(d = /* @__PURE__ */ new Date()) {
	return format(d, "yyyy-MM-dd");
}
function parseIso(s) {
	const [y, m, d] = s.split("-").map(Number);
	return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}
function nextOccurrence(item, from = /* @__PURE__ */ new Date()) {
	const today = startOfDay(from);
	if (!item.recursYearly && item.year) return startOfDay(new Date(item.year, item.month - 1, item.day));
	const year = today.getFullYear();
	let next = startOfDay(new Date(year, item.month - 1, item.day));
	if (next < today) next = startOfDay(new Date(year + 1, item.month - 1, item.day));
	return next;
}
function daysUntilDate(item, from = /* @__PURE__ */ new Date()) {
	return differenceInCalendarDays(nextOccurrence(item, from), startOfDay(from));
}
function yearsTogether(item, from = /* @__PURE__ */ new Date()) {
	if (!item.year) return null;
	return nextOccurrence(item, from).getFullYear() - item.year;
}
function weekStartIso(from = /* @__PURE__ */ new Date()) {
	return isoDate(startOfWeek(from, { weekStartsOn: 1 }));
}
function daysSince(iso, from = /* @__PURE__ */ new Date()) {
	if (!iso) return null;
	return differenceInCalendarDays(startOfDay(from), parseIso(iso));
}
function ritualDue(ritual, from = /* @__PURE__ */ new Date()) {
	if (!ritual.lastDone) return true;
	return (daysSince(ritual.lastDone, from) ?? 0) >= ritual.cadenceDays;
}
function ritualOverdueBy(ritual, from = /* @__PURE__ */ new Date()) {
	if (!ritual.lastDone) return ritual.cadenceDays;
	return (daysSince(ritual.lastDone, from) ?? 0) - ritual.cadenceDays;
}
function defaultRemindDays(kind) {
	switch (kind) {
		case "birthday": return [
			21,
			14,
			7,
			1
		];
		case "anniversary": return [
			30,
			14,
			7,
			1
		];
		case "first": return [7, 1];
		default: return [
			14,
			7,
			1
		];
	}
}
function remindWindow(item) {
	return item.remindDays.length ? Math.max(...item.remindDays) : 14;
}
function remindDaysFromWindow(window) {
	if (window >= 30) return [
		30,
		14,
		7,
		1
	];
	if (window >= 21) return [
		21,
		14,
		7,
		1
	];
	if (window >= 14) return [
		14,
		7,
		1
	];
	return [7, 1];
}
function inPlanningWindow(item, from = /* @__PURE__ */ new Date()) {
	const days = daysUntilDate(item, from);
	return days >= 0 && days <= remindWindow(item);
}
function occasionCaption(item, years) {
	if (!years) return "";
	if (item.kind === "birthday") return `turning ${years}`;
	if (years === 1) return "1 year";
	return `${years} years`;
}
function ideasForOccasion(ideas, occasion) {
	const t = occasion.trim().toLowerCase();
	if (!t) return [];
	return ideas.filter((i) => {
		const o = i.occasion.trim().toLowerCase();
		if (!o) return false;
		return o === t || o.includes(t) || t.includes(o);
	});
}
function formatLong(d) {
	return format(d, "EEEE, MMMM d");
}
function formatShort(d) {
	return format(d, "MMM d");
}
function greeting(from = /* @__PURE__ */ new Date()) {
	const h = from.getHours();
	if (h < 5) return "Still up";
	if (h < 12) return "Good morning";
	if (h < 17) return "Good afternoon";
	return "Good evening";
}
function monthMatrix(anchor) {
	const year = anchor.getFullYear();
	const month = anchor.getMonth();
	const first = new Date(year, month, 1);
	const startOffset = (getDay(first) + 6) % 7;
	const start = addDays(first, -startOffset);
	const weeks = [];
	let cursor = start;
	for (let w = 0; w < 6; w++) {
		const row = [];
		for (let d = 0; d < 7; d++) {
			row.push(cursor);
			cursor = addDays(cursor, 1);
		}
		weeks.push(row);
	}
	return weeks;
}
function sessionsThisWeek(entries, from = /* @__PURE__ */ new Date()) {
	const start = startOfWeek(from, { weekStartsOn: 1 });
	const end = addDays(start, 7);
	return entries.filter((e) => {
		const d = parseIso(e.date);
		return d >= start && d < end;
	});
}
function weekDays(from = /* @__PURE__ */ new Date()) {
	const start = startOfWeek(from, { weekStartsOn: 1 });
	return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}
function cadenceLabel(days) {
	if (days <= 1) return "Daily";
	if (days === 7) return "Weekly";
	if (days === 14) return "Every 2 weeks";
	return `Every ${days} days`;
}
function formatMinutes(mins) {
	if (mins < 60) return `${mins} min`;
	const h = Math.floor(mins / 60);
	const m = mins % 60;
	if (m === 0) return h === 1 ? "1 hr" : `${h} hr`;
	return `${h} hr ${m} min`;
}
function createSeed() {
	return {
		weeklyGoal: 3,
		intention: {
			weekStart: weekStartIso(),
			text: "One slow morning together — phones stay in the other room until the coffee is gone."
		},
		partner: {
			name: "Maya Chen",
			nickname: "May",
			pronouns: "she/her",
			howWeMet: "A friend's gallery opening in RiNo, spring 2018. She was arguing with the bartender about oat milk. You took her side.",
			notes: "Gets quiet when she's overwhelmed — that's when a walk helps more than a talk. Hates being late, loves a handwritten anything.",
			loveLanguages: ["Quality Time", "Words of Affirmation"],
			likes: [
				"Oat lattes",
				"Trail running",
				"Ceramic mugs",
				"Sunday crossword",
				"Radiohead",
				"Thai food",
				"Handwritten notes",
				"Moss green"
			],
			dislikes: [
				"Surprise parties",
				"Being late",
				"Overly sweet desserts",
				"Public spectacle"
			],
			shirtSize: "M",
			shoeSize: "8.5",
			ringSize: "6",
			favoriteColor: "Moss",
			favoriteFlower: "Ranunculus",
			favoriteFood: "Pad see ew",
			favoriteDrink: "Oat latte, extra shot",
			favoriteMovie: "Before Sunrise",
			favoriteSong: "Weird Fishes / Arpeggi"
		},
		dates: [
			{
				id: "d-mom",
				title: "Maya's mom's birthday",
				kind: "custom",
				month: 10,
				day: 5,
				year: 1968,
				recursYearly: true,
				notes: "Call in the morning. Ranunculus if you can find them — cream and blush, not red.",
				remindDays: [
					21,
					14,
					7,
					1
				]
			},
			{
				id: "d-santafe",
				title: "Weekend in Santa Fe",
				kind: "custom",
				month: 10,
				day: 17,
				year: 2026,
				recursYearly: false,
				notes: "She mentioned the plaza bookshop. Leave Saturday morning, no itinerary after lunch.",
				remindDays: [
					14,
					7,
					2
				]
			},
			{
				id: "d-bday",
				title: "Maya's birthday",
				kind: "birthday",
				month: 11,
				day: 8,
				year: 1994,
				recursYearly: true,
				notes: "Quiet dinner, not a party. The moss linen robe is the gift. Write the card the night before.",
				remindDays: [
					21,
					14,
					7,
					1
				]
			},
			{
				id: "d-first",
				title: "First date",
				kind: "first",
				month: 4,
				day: 3,
				year: 2018,
				recursYearly: true,
				notes: "Tacos on Colfax. Recreate it or just mention it — she remembers the song that was playing.",
				remindDays: [7, 1]
			},
			{
				id: "d-anniv",
				title: "Our anniversary",
				kind: "anniversary",
				month: 6,
				day: 14,
				year: 2019,
				recursYearly: true,
				notes: "The year you made it official. She still has the receipt from that diner in her journal.",
				remindDays: [
					30,
					14,
					7,
					1
				]
			}
		],
		ideas: [
			{
				id: "i-robe",
				kind: "gift",
				title: "Moss linen robe",
				notes: "Mid-weight, shawl collar. Not the cheap one — she notices fabric. Wrap with a note, not a bow.",
				tags: ["birthday", "home"],
				status: "planned",
				occasion: "Maya's birthday",
				createdAt: "2026-08-02"
			},
			{
				id: "i-pour",
				kind: "gift",
				title: "Hasami pour-over cone",
				notes: "She outgrew the plastic one. Pair with a bag from the shop on 32nd.",
				tags: ["coffee", "home"],
				status: "idea",
				occasion: "",
				createdAt: "2026-09-01"
			},
			{
				id: "i-vinyl",
				kind: "gift",
				title: "Clean copy of OK Computer",
				notes: "Only if you find one in good shape. Don't force it.",
				tags: ["music"],
				status: "idea",
				occasion: "",
				createdAt: "2026-07-18"
			},
			{
				id: "i-ceramics",
				kind: "date",
				title: "Ceramics workshop in RiNo",
				notes: "Saturday morning class. She already liked the studio from the window.",
				tags: ["hands", "city"],
				status: "planned",
				occasion: "",
				createdAt: "2026-09-04"
			},
			{
				id: "i-rocks",
				kind: "date",
				title: "Sunset picnic at Red Rocks",
				notes: "Thermos of tea, the good blanket, leave phones in the car. Go on a weeknight if the lot is empty.",
				tags: ["outdoors", "quiet"],
				status: "idea",
				occasion: "",
				createdAt: "2026-08-21"
			},
			{
				id: "i-thai",
				kind: "date",
				title: "Cook a new Thai recipe together",
				notes: "No recipe-scrolling at the table. Pick the dish in the morning. Pad see ew is already hers — try something she hasn't made.",
				tags: ["home", "food"],
				status: "idea",
				occasion: "",
				createdAt: "2026-09-10"
			},
			{
				id: "i-ranunculus",
				kind: "gift",
				title: "Ranunculus — cream and blush",
				notes: "For Maya's mom. Not red. Call in the morning too.",
				tags: ["family", "flowers"],
				status: "idea",
				occasion: "Maya's mom's birthday",
				createdAt: "2026-09-08"
			},
			{
				id: "i-golden",
				kind: "date",
				title: "Breakfast in Golden, then a trail",
				notes: "Diner first, then the easy loop. She'll want to be back before the afternoon heat.",
				tags: ["outdoors", "morning"],
				status: "idea",
				occasion: "",
				createdAt: "2026-06-12"
			}
		],
		gestures: [
			{
				id: "g-latte",
				title: "Oat latte after her long run",
				notes: "Caught her on the way back. She didn't ask.",
				date: "2026-09-18",
				kind: "gift"
			},
			{
				id: "g-pad",
				title: "Cooked pad see ew on a weeknight",
				notes: "Her favorite, extra basil. We ate on the floor.",
				date: "2026-09-16",
				kind: "time"
			},
			{
				id: "g-note",
				title: "Note in the laptop sleeve",
				notes: "Three sentences. She found it at work.",
				date: "2026-09-12",
				kind: "note"
			},
			{
				id: "g-wait",
				title: "Stayed up so we could talk about her week",
				notes: "She had the hard conversation with her director. Just listened.",
				date: "2026-09-07",
				kind: "time"
			}
		],
		quality: [{
			id: "q-dinner",
			date: "2026-09-16",
			minutes: 90,
			title: "Weeknight dinner, phones away",
			notes: "Pad see ew. She talked. You listened."
		}, {
			id: "q-walk",
			date: "2026-09-18",
			minutes: 40,
			title: "Morning walk after her run",
			notes: "Slow loop around the park. Coffee on a bench."
		}],
		rituals: [
			{
				id: "r-morning",
				title: "Morning check-in",
				cadenceDays: 1,
				lastDone: "2026-09-20",
				notes: "A real sentence, not a heart emoji."
			},
			{
				id: "r-friday",
				title: "Plan Friday night",
				cadenceDays: 7,
				lastDone: "2026-09-11",
				notes: "Decide by Wednesday so it doesn't become the couch by default."
			},
			{
				id: "r-note",
				title: "Leave a small note",
				cadenceDays: 5,
				lastDone: "2026-09-13",
				notes: "Somewhere she'll find it without being handed it."
			},
			{
				id: "r-dinner",
				title: "Phone-free dinner",
				cadenceDays: 7,
				lastDone: "2026-09-16",
				notes: "Even if it's leftovers."
			}
		]
	};
}
function createEmpty() {
	return {
		weeklyGoal: 3,
		intention: {
			weekStart: weekStartIso(),
			text: ""
		},
		partner: {
			name: "",
			nickname: "",
			pronouns: "",
			howWeMet: "",
			notes: "",
			loveLanguages: [],
			likes: [],
			dislikes: [],
			shirtSize: "",
			shoeSize: "",
			ringSize: "",
			favoriteColor: "",
			favoriteFlower: "",
			favoriteFood: "",
			favoriteDrink: "",
			favoriteMovie: "",
			favoriteSong: ""
		},
		dates: [],
		ideas: [],
		gestures: [],
		quality: [],
		rituals: []
	};
}
function classifyNotifySurface(input) {
	if (!input.supported) return {
		surface: "unsupported",
		canPrompt: false
	};
	if (input.permission === "granted") return {
		surface: "os",
		canPrompt: false
	};
	if (input.embedded) return {
		surface: "iframe",
		canPrompt: false
	};
	if (input.ios && !input.standalone) return {
		surface: "ios-install",
		canPrompt: false
	};
	if (input.permission === "denied") return {
		surface: "blocked",
		canPrompt: false
	};
	return {
		surface: "os",
		canPrompt: true
	};
}
function defaultNotifications() {
	return {
		enabled: false,
		dates: true,
		rituals: true,
		weekly: true,
		hour: 9
	};
}
function hourLabel(hour) {
	return `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`;
}
var REMINDER_HOURS = [
	7,
	8,
	9,
	10,
	11,
	12,
	17,
	18,
	19,
	20
];
function notificationPermission() {
	if (typeof window === "undefined" || typeof Notification === "undefined") return "unsupported";
	return Notification.permission;
}
function notifyCapability() {
	const permission = notificationPermission();
	if (permission === "unsupported") return {
		permission,
		surface: "unsupported",
		canPrompt: false
	};
	return {
		permission,
		...classifyNotifySurface({
			supported: true,
			permission,
			embedded: isEmbeddedFrame(),
			ios: isIosDevice(),
			standalone: isStandaloneDisplay()
		})
	};
}
async function requestNotificationPermission() {
	const cap = notifyCapability();
	if (cap.permission === "unsupported") return "unsupported";
	if (cap.permission === "granted") return "granted";
	if (!cap.canPrompt) return cap.permission;
	if (typeof Notification === "undefined") return "unsupported";
	try {
		return await Notification.requestPermission();
	} catch {
		return notificationPermission();
	}
}
var SEEN_KEY = "good-partner-notices";
function seenToday() {
	if (typeof window === "undefined") return /* @__PURE__ */ new Set();
	try {
		const raw = localStorage.getItem(SEEN_KEY);
		if (!raw) return /* @__PURE__ */ new Set();
		const parsed = JSON.parse(raw);
		if (parsed.day !== isoDate()) return /* @__PURE__ */ new Set();
		return new Set(parsed.tags ?? []);
	} catch {
		return /* @__PURE__ */ new Set();
	}
}
function markSeen(tag) {
	if (typeof window === "undefined") return;
	const tags = seenToday();
	tags.add(tag);
	localStorage.setItem(SEEN_KEY, JSON.stringify({
		day: isoDate(),
		tags: [...tags]
	}));
}
function collectNotices(input) {
	const now = input.now ?? /* @__PURE__ */ new Date();
	const first = input.firstName.trim() || "them";
	const out = [];
	if (input.prefs.dates) for (const item of input.dates) {
		const days = daysUntilDate(item, now);
		if (days < 0) continue;
		if (!(days === 0 || item.remindDays.includes(days))) continue;
		const when = days === 0 ? "today" : days === 1 ? "tomorrow" : `in ${days} days`;
		out.push({
			tag: `date:${item.id}:${isoDate(now)}`,
			title: item.title,
			body: `${when[0]?.toUpperCase()}${when.slice(1)} — a little time to get it right.`
		});
	}
	if (input.prefs.rituals) for (const ritual of input.rituals) {
		if (!ritualDue(ritual, now)) continue;
		out.push({
			tag: `ritual:${ritual.id}:${isoDate(now)}`,
			title: ritual.title,
			body: `Due with ${first}. Keep the little thing going.`
		});
	}
	if (input.prefs.weekly) {
		const weekday = getDay(now);
		const done = sessionsThisWeek(input.quality, now).length;
		if (weekday >= 4 && done < input.weeklyGoal) {
			const left = input.weeklyGoal - done;
			out.push({
				tag: `weekly:${weekStartIso(now)}`,
				title: "Quality time",
				body: left === 1 ? `One more undistracted stretch with ${first} this week.` : `${left} more this week with ${first}.`
			});
		}
	}
	return out;
}
async function activeRegistration() {
	if (typeof navigator === "undefined" || !navigator.serviceWorker) return null;
	try {
		const reg = await Promise.race([navigator.serviceWorker.getRegistration(), new Promise((resolve) => window.setTimeout(resolve, 250))]);
		return reg?.active ? reg : null;
	} catch {
		return null;
	}
}
async function showNotice(notice) {
	if (typeof window === "undefined" || typeof Notification === "undefined") return false;
	if (Notification.permission !== "granted") return false;
	const opts = {
		body: notice.body,
		tag: notice.tag,
		icon: "/icon-192.png",
		silent: false
	};
	try {
		const reg = await activeRegistration();
		if (reg?.showNotification) {
			await reg.showNotification(notice.title, opts);
			return true;
		}
	} catch {}
	try {
		new Notification(notice.title, opts);
		return true;
	} catch {
		return false;
	}
}
async function dispatchDueNotices(input) {
	if (!input.prefs.enabled) return [];
	const now = /* @__PURE__ */ new Date();
	if (now.getHours() < input.prefs.hour) return [];
	const already = seenToday();
	const due = collectNotices({
		...input,
		now
	}).filter((n) => !already.has(n.tag));
	const os = notificationPermission() === "granted";
	const leftover = [];
	for (const notice of due) {
		markSeen(notice.tag);
		if (os) {
			if (!await showNotice(notice)) leftover.push(notice);
		} else leftover.push(notice);
	}
	return leftover;
}
var empty = createEmpty();
var useAppStore = create()(persist((set) => ({
	...empty,
	unlocked: false,
	previewingSample: false,
	notifications: defaultNotifications(),
	setNotifications: (patch) => set((s) => ({ notifications: {
		...s.notifications,
		...patch
	} })),
	addDate: (item) => set((s) => ({ dates: [{
		...item,
		id: nid()
	}, ...s.dates] })),
	updateDate: (id, patch) => set((s) => ({ dates: s.dates.map((d) => d.id === id ? {
		...d,
		...patch
	} : d) })),
	removeDate: (id) => set((s) => ({ dates: s.dates.filter((d) => d.id !== id) })),
	addIdea: (item) => set((s) => ({ ideas: [{
		...item,
		id: nid(),
		createdAt: isoDate()
	}, ...s.ideas] })),
	updateIdea: (id, patch) => set((s) => ({ ideas: s.ideas.map((i) => i.id === id ? {
		...i,
		...patch
	} : i) })),
	removeIdea: (id) => set((s) => ({ ideas: s.ideas.filter((i) => i.id !== id) })),
	addGesture: (item) => set((s) => ({ gestures: [{
		...item,
		id: nid()
	}, ...s.gestures] })),
	removeGesture: (id) => set((s) => ({ gestures: s.gestures.filter((g) => g.id !== id) })),
	addQuality: (item) => set((s) => ({ quality: [{
		...item,
		id: nid()
	}, ...s.quality] })),
	removeQuality: (id) => set((s) => ({ quality: s.quality.filter((q) => q.id !== id) })),
	addRitual: (item) => set((s) => ({ rituals: [{
		...item,
		id: nid()
	}, ...s.rituals] })),
	updateRitual: (id, patch) => set((s) => ({ rituals: s.rituals.map((r) => r.id === id ? {
		...r,
		...patch
	} : r) })),
	completeRitual: (id) => set((s) => ({ rituals: s.rituals.map((r) => r.id === id ? {
		...r,
		lastDone: isoDate()
	} : r) })),
	removeRitual: (id) => set((s) => ({ rituals: s.rituals.filter((r) => r.id !== id) })),
	setPartner: (patch) => set((s) => ({ partner: {
		...s.partner,
		...patch
	} })),
	setIntention: (text) => set(() => ({ intention: {
		weekStart: weekStartIso(),
		text
	} })),
	setWeeklyGoal: (n) => set({ weeklyGoal: Math.max(1, Math.min(7, n)) }),
	loadJournal: (data) => set({
		partner: data.partner,
		dates: data.dates,
		ideas: data.ideas,
		gestures: data.gestures,
		quality: data.quality,
		rituals: data.rituals,
		intention: data.intention,
		weeklyGoal: data.weeklyGoal
	}),
	unlock: () => set({
		unlocked: true,
		previewingSample: false
	}),
	resetDemo: () => set((s) => ({
		...createSeed(),
		unlocked: s.unlocked,
		notifications: s.notifications,
		previewingSample: true
	})),
	resetEmpty: () => set((s) => ({
		...createEmpty(),
		unlocked: s.unlocked,
		notifications: s.notifications,
		previewingSample: false
	}))
}), {
	name: "good-partner-v4",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	merge: (persisted, current) => {
		const p = persisted ?? {};
		return {
			...current,
			...p,
			notifications: {
				...defaultNotifications(),
				...p.notifications ?? {}
			}
		};
	},
	partialize: (s) => ({
		partner: s.partner,
		dates: s.dates,
		ideas: s.ideas,
		gestures: s.gestures,
		quality: s.quality,
		rituals: s.rituals,
		intention: s.intention,
		weeklyGoal: s.weeklyGoal,
		unlocked: s.unlocked,
		previewingSample: s.previewingSample,
		notifications: s.notifications
	})
}));
//#endregion
export { shouldPromptAndroidInstall as A, parseIso as C, ritualDue as D, requestNotificationPermission as E, yearsTogether as F, Button as I, buttonVariants as L, showNotice as M, useAppStore as N, ritualOverdueBy as O, weekDays as P, occasionCaption as S, remindWindow as T, isStandaloneDisplay as _, daysUntilDate as a, nextOccurrence as b, formatLong as c, greeting as d, hourLabel as f, isIosDevice as g, isAndroidDevice as h, createEmpty as i, shouldPromptHomeScreen as j, sessionsThisWeek as k, formatMinutes as l, inPlanningWindow as m, REMINDER_HOURS as n, defaultRemindDays as o, ideasForOccasion as p, cadenceLabel as r, dispatchDueNotices as s, INSTALL_DISMISS_KEY as t, formatShort as u, isoDate as v, remindDaysFromWindow as w, notifyCapability as x, monthMatrix as y };
