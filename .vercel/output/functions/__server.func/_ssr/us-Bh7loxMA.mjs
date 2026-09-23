import { i as __toESM } from "../_runtime.mjs";
import { i as APP_PLAY_RATING, u as APP_VERSION } from "./app-meta-DYIgFBD-.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime, a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D19HL7Cl.mjs";
import { C as parseIso, D as ritualDue, E as requestNotificationPermission, I as Button, L as buttonVariants, M as showNotice, N as useAppStore, _ as isStandaloneDisplay, f as hourLabel, g as isIosDevice, i as createEmpty, l as formatMinutes, n as REMINDER_HOURS, r as cadenceLabel, u as formatShort, x as notifyCapability } from "./store-C7z6kliX.mjs";
import { s as Plus, t as X, u as Ellipsis } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ShareWithBotButton } from "./share-bot-button-EdHmIKK4.mjs";
import { a as PageHeader, i as NativeSelect, n as Field, o as Section, r as Input, s as Textarea, t as Badge } from "./field-D1Ra45vy.mjs";
import { i as emptyPartner, r as LOVE_LANGUAGES } from "./types-D0s0ng40.mjs";
import { a as Separator2, i as Root2$1, n as Item2, o as Trigger, r as Portal2$1, t as Content2$1 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as InstallDialog, l as Card, o as InstallNowButton, s as InstallSteps } from "./router-DVeLkr-O.mjs";
import { n as QualityDialog, r as RitualDialog, t as GestureDialog } from "./log-dialogs-CoIWIoeX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/us-Bh7loxMA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DropdownMenu = Root2$1;
var DropdownMenuTrigger = Trigger;
var DropdownMenuPortal = Portal2$1;
function DropdownMenuContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		sideOffset,
		className: cn("z-50 min-w-44 overflow-hidden rounded-xl bg-popover p-1.5 text-popover-foreground shadow-[var(--shadow-float)] data-[state=open]:animate-[overlay-in_150ms_var(--ease-out)]", className),
		...props
	}) });
}
function DropdownMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2.5 text-sm outline-none transition-colors duration-150 focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
function ChipInput({ values, onChange, placeholder }) {
	const [draft, setDraft] = (0, import_react.useState)("");
	function add(raw) {
		const v = raw.trim();
		if (!v || values.includes(v)) {
			setDraft("");
			return;
		}
		onChange([...values, v]);
		setDraft("");
	}
	function onKey(e) {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			add(draft);
		}
		if (e.key === "Backspace" && !draft && values.length) onChange(values.slice(0, -1));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [values.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1.5",
			children: values.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs",
				children: [v, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "relative size-5 after:absolute after:left-1/2 after:top-1/2 after:size-10 after:-translate-x-1/2 after:-translate-y-1/2",
					onClick: () => onChange(values.filter((x) => x !== v)),
					"aria-label": `Remove ${v}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
				})]
			}, v))
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: draft,
			onChange: (e) => setDraft(e.target.value),
			onKeyDown: onKey,
			onBlur: () => add(draft),
			placeholder: placeholder ?? "Type and press Enter"
		})]
	});
}
function asString(v) {
	return typeof v === "string" ? v : "";
}
function asNumber(v, fallback = 0) {
	return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}
function asStringArray(v) {
	if (!Array.isArray(v)) return [];
	return v.filter((x) => typeof x === "string").slice(0, 80);
}
function parsePartner(raw) {
	const p = raw && typeof raw === "object" ? raw : {};
	const langs = asStringArray(p.loveLanguages).filter((l) => LOVE_LANGUAGES.includes(l));
	return {
		...emptyPartner(),
		name: asString(p.name).slice(0, 80),
		nickname: asString(p.nickname).slice(0, 40),
		pronouns: asString(p.pronouns).slice(0, 40),
		howWeMet: asString(p.howWeMet).slice(0, 400),
		notes: asString(p.notes).slice(0, 2e3),
		loveLanguages: langs,
		likes: asStringArray(p.likes),
		dislikes: asStringArray(p.dislikes),
		shirtSize: asString(p.shirtSize).slice(0, 20),
		shoeSize: asString(p.shoeSize).slice(0, 20),
		ringSize: asString(p.ringSize).slice(0, 20),
		favoriteColor: asString(p.favoriteColor).slice(0, 40),
		favoriteFlower: asString(p.favoriteFlower).slice(0, 40),
		favoriteFood: asString(p.favoriteFood).slice(0, 80),
		favoriteDrink: asString(p.favoriteDrink).slice(0, 80),
		favoriteMovie: asString(p.favoriteMovie).slice(0, 80),
		favoriteSong: asString(p.favoriteSong).slice(0, 80)
	};
}
function parseList(raw, map) {
	if (!Array.isArray(raw)) return [];
	const out = [];
	for (const item of raw.slice(0, 200)) {
		if (!item || typeof item !== "object") continue;
		const parsed = map(item);
		if (parsed) out.push(parsed);
	}
	return out;
}
function parseJournal(raw) {
	if (!raw || typeof raw !== "object") return null;
	const o = raw;
	const empty = createEmpty();
	return {
		partner: parsePartner(o.partner),
		dates: parseList(o.dates, (d) => {
			const title = asString(d.title).trim();
			if (!title) return null;
			const kind = [
				"birthday",
				"anniversary",
				"first",
				"custom"
			].includes(asString(d.kind)) ? d.kind : "custom";
			const remind = Array.isArray(d.remindDays) ? d.remindDays.filter((n) => typeof n === "number").slice(0, 6) : [
				14,
				7,
				1
			];
			return {
				id: asString(d.id) || crypto.randomUUID(),
				title: title.slice(0, 120),
				kind,
				month: Math.min(12, Math.max(1, asNumber(d.month, 1))),
				day: Math.min(31, Math.max(1, asNumber(d.day, 1))),
				year: typeof d.year === "number" ? d.year : void 0,
				recursYearly: d.recursYearly !== false,
				notes: asString(d.notes).slice(0, 2e3),
				remindDays: remind.length ? remind : [
					14,
					7,
					1
				]
			};
		}),
		ideas: parseList(o.ideas, (i) => {
			const title = asString(i.title).trim();
			if (!title) return null;
			const kind = i.kind === "date" ? "date" : "gift";
			const status = i.status === "planned" || i.status === "done" ? i.status : "idea";
			return {
				id: asString(i.id) || crypto.randomUUID(),
				kind,
				title: title.slice(0, 120),
				notes: asString(i.notes).slice(0, 2e3),
				tags: asStringArray(i.tags).slice(0, 12),
				status,
				occasion: asString(i.occasion).slice(0, 80),
				createdAt: asString(i.createdAt).slice(0, 32)
			};
		}),
		gestures: parseList(o.gestures, (g) => {
			const title = asString(g.title).trim();
			if (!title) return null;
			const kind = [
				"note",
				"gift",
				"help",
				"surprise",
				"time",
				"other"
			].includes(asString(g.kind)) ? g.kind : "other";
			return {
				id: asString(g.id) || crypto.randomUUID(),
				title: title.slice(0, 120),
				notes: asString(g.notes).slice(0, 2e3),
				date: asString(g.date).slice(0, 32),
				kind
			};
		}),
		quality: parseList(o.quality, (q) => {
			const title = asString(q.title).trim();
			if (!title) return null;
			return {
				id: asString(q.id) || crypto.randomUUID(),
				date: asString(q.date).slice(0, 32),
				minutes: Math.min(1440, Math.max(5, asNumber(q.minutes, 60))),
				title: title.slice(0, 120),
				notes: asString(q.notes).slice(0, 2e3)
			};
		}),
		rituals: parseList(o.rituals, (r) => {
			const title = asString(r.title).trim();
			if (!title) return null;
			return {
				id: asString(r.id) || crypto.randomUUID(),
				title: title.slice(0, 120),
				cadenceDays: Math.min(90, Math.max(1, asNumber(r.cadenceDays, 7))),
				lastDone: typeof r.lastDone === "string" ? r.lastDone.slice(0, 32) : null,
				notes: asString(r.notes).slice(0, 2e3)
			};
		}),
		intention: {
			weekStart: asString(o.intention?.weekStart) || empty.intention.weekStart,
			text: asString(o.intention?.text).slice(0, 400)
		},
		weeklyGoal: Math.max(1, Math.min(7, asNumber(o.weeklyGoal, 3)))
	};
}
function downloadJournal(data) {
	const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	const stamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	a.href = url;
	a.download = `good-partner-${stamp}.json`;
	a.click();
	URL.revokeObjectURL(url);
}
function ToggleRow({ title, hint, checked, onChange, disabled }) {
	const id = `n-${title.replace(/\s+/g, "-").toLowerCase()}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		htmlFor: id,
		className: "flex min-h-14 items-center justify-between gap-4 border-t border-border px-5 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-sm font-medium",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 block text-xs leading-relaxed text-muted-foreground",
				children: hint
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			type: "checkbox",
			checked,
			disabled,
			onChange: (e) => onChange(e.target.checked),
			className: "size-5 shrink-0 accent-primary"
		})]
	});
}
function useNotifyCapability() {
	const [cap, setCap] = (0, import_react.useState)({
		permission: "unsupported",
		surface: "unsupported",
		canPrompt: false
	});
	(0, import_react.useEffect)(() => {
		const read = () => setCap(notifyCapability());
		read();
		document.addEventListener("visibilitychange", read);
		window.addEventListener("focus", read);
		let status = null;
		if (navigator.permissions?.query) navigator.permissions.query({ name: "notifications" }).then((p) => {
			status = p;
			p.onchange = read;
			read();
		}).catch(() => {});
		return () => {
			document.removeEventListener("visibilitychange", read);
			window.removeEventListener("focus", read);
			if (status) status.onchange = null;
		};
	}, []);
	return {
		cap,
		refresh: () => setCap(notifyCapability())
	};
}
function blockedHint() {
	if (isIosDevice()) return isStandaloneDisplay() ? "Phone alerts are blocked. iPhone Settings → Notifications → Good Partner. To be asked again, remove the Home Screen icon and add it back." : "Phone alerts are blocked. Add to Home Screen, then allow alerts from the icon.";
	return "Phone alerts are blocked. Use the lock icon in the address bar, then Notifications → Allow.";
}
function statusLine(on, cap) {
	if (!on) return {
		title: "Off",
		hint: "Dates, rituals, and the weekly quality-time goal. They check when you open the journal. Phone banners need a one-time allow."
	};
	if (cap.permission === "granted") return {
		title: "On · phone alerts",
		hint: "Lock-screen banners are allowed. They also appear when you open the journal."
	};
	switch (cap.surface) {
		case "ios-install": return {
			title: "On · in the journal",
			hint: "On iPhone, lock-screen alerts need the Home Screen icon. Open it from there, then tap Allow phone alerts."
		};
		case "iframe": return {
			title: "On · in the journal",
			hint: "Phone alerts need the site in its own window, not inside another page. Reminders still appear here."
		};
		case "blocked": return {
			title: "On · in the journal",
			hint: blockedHint()
		};
		case "unsupported": return {
			title: "On · in the journal",
			hint: "This browser cannot show phone alerts. Reminders still appear when you open the journal."
		};
		default: return {
			title: "On · in the journal",
			hint: "Allow phone alerts for a banner when the journal is closed."
		};
	}
}
function NotifySettings() {
	const prefs = useAppStore((s) => s.notifications);
	const setNotifications = useAppStore((s) => s.setNotifications);
	const firstName = useAppStore((s) => s.partner.nickname || s.partner.name.split(" ")[0] || "them");
	const { cap, refresh } = useNotifyCapability();
	const [installOpen, setInstallOpen] = (0, import_react.useState)(false);
	async function turnOn() {
		const before = notifyCapability();
		setNotifications({ enabled: true });
		if (before.canPrompt) {
			const next = await requestNotificationPermission();
			refresh();
			if (next === "granted") {
				toast.success("Phone alerts on. They also check when you open the journal.");
				return;
			}
			if (next === "denied") {
				toast.message("Reminders on. Phone alerts were declined — they still appear in the journal.");
				return;
			}
			toast.success("Reminders on. They appear when you open the journal.");
			return;
		}
		refresh();
		if (before.surface === "ios-install") {
			toast.success("Reminders on. Add to Home Screen for lock-screen alerts.");
			return;
		}
		toast.success("Reminders on. They appear when you open the journal.");
	}
	function turnOff() {
		setNotifications({ enabled: false });
		toast.message("Reminders off");
	}
	async function allowPhone() {
		const next = await requestNotificationPermission();
		refresh();
		if (next === "granted") {
			toast.success("Phone alerts on");
			return;
		}
		if (next === "denied") {
			toast.message("Phone alerts were declined");
			return;
		}
		toast.message("No system prompt this time. Try from the Home Screen icon, in its own window.");
	}
	async function sendTest() {
		if (await showNotice({
			tag: `test:${Date.now()}`,
			title: "Good Partner",
			body: `This is how a reminder for ${firstName} will look.`
		})) toast.success("Test sent to the lock screen");
		else toast("Good Partner", { description: `This is how a reminder for ${firstName} will look.` });
	}
	const on = prefs.enabled;
	const copy = statusLine(on, cap);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Reminders",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "overflow-hidden p-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: copy.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-relaxed text-muted-foreground",
							children: copy.hint
						}),
						on ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 sm:flex-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full sm:w-auto",
										variant: "outline",
										onClick: turnOff,
										children: "Turn reminders off"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full sm:w-auto",
										variant: "secondary",
										onClick: () => void sendTest(),
										children: "Send a test"
									})]
								}),
								cap.canPrompt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "w-full sm:w-auto",
									onClick: () => void allowPhone(),
									children: "Allow phone alerts"
								}) : null,
								cap.surface === "ios-install" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "w-full sm:w-auto",
									onClick: () => setInstallOpen(true),
									children: "Add to Home Screen"
								}) : null
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-4 w-full",
							onClick: () => void turnOn(),
							children: "Turn reminders on"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: "Dates",
					hint: "Birthdays and occasions, on the lead times you set",
					checked: prefs.dates,
					disabled: !on,
					onChange: (dates) => setNotifications({ dates })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: "Rituals",
					hint: "The little things that have come due",
					checked: prefs.rituals,
					disabled: !on,
					onChange: (rituals) => setNotifications({ rituals })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: "Weekly quality time",
					hint: "A nudge later in the week if you are behind",
					checked: prefs.weekly,
					disabled: !on,
					onChange: (weekly) => setNotifications({ weekly })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Quiet until",
						htmlFor: "n-hour",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							id: "n-hour",
							value: prefs.hour,
							disabled: !on,
							onChange: (e) => setNotifications({ hour: Number(e.target.value) }),
							children: REMINDER_HOURS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: h,
								children: hourLabel(h)
							}, h))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Nothing before this hour, even if you open the journal earlier."
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallDialog, {
			open: installOpen,
			onOpenChange: setInstallOpen
		})]
	});
}
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
		className: cn("fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-[overlay-in_250ms_var(--ease-smooth-out)]", className),
		...props
	});
}
function AlertDialogContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: cn("fixed left-1/2 top-1/2 z-50 grid w-[min(calc(100%-1.5rem),28rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl bg-card p-6 text-card-foreground shadow-[var(--shadow-float)] data-[state=open]:animate-[dialog-in_250ms_var(--ease-smooth-out)]", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		className: cn("font-display text-xl tracking-tight", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		className: cn(buttonVariants(), className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		className: cn(buttonVariants({ variant: "ghost" }), className),
		...props
	});
}
function UsPage() {
	const partner = useAppStore((s) => s.partner);
	const setPartner = useAppStore((s) => s.setPartner);
	const rituals = useAppStore((s) => s.rituals);
	const gestures = useAppStore((s) => s.gestures);
	const quality = useAppStore((s) => s.quality);
	const completeRitual = useAppStore((s) => s.completeRitual);
	const removeRitual = useAppStore((s) => s.removeRitual);
	const addRitual = useAppStore((s) => s.addRitual);
	const addGesture = useAppStore((s) => s.addGesture);
	const addQuality = useAppStore((s) => s.addQuality);
	const removeGesture = useAppStore((s) => s.removeGesture);
	const removeQuality = useAppStore((s) => s.removeQuality);
	const resetDemo = useAppStore((s) => s.resetDemo);
	const resetEmpty = useAppStore((s) => s.resetEmpty);
	const loadJournal = useAppStore((s) => s.loadJournal);
	const unlocked = useAppStore((s) => s.unlocked);
	const fileRef = (0, import_react.useRef)(null);
	const [gOpen, setGOpen] = (0, import_react.useState)(false);
	const [qOpen, setQOpen] = (0, import_react.useState)(false);
	const [rOpen, setROpen] = (0, import_react.useState)(false);
	const [installOpen, setInstallOpen] = (0, import_react.useState)(false);
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	const first = partner.nickname || partner.name.split(" ")[0] || "them";
	function toggleLang(lang) {
		const has = partner.loveLanguages.includes(lang);
		setPartner({ loveLanguages: has ? partner.loveLanguages.filter((l) => l !== lang) : [...partner.loveLanguages, lang] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "The two of you",
				title: partner.name || "Your partner",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						"aria-label": "More",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => {
								resetDemo();
								toast.success("Sample journal restored");
							},
							children: "Restore sample journal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => {
								resetEmpty();
								toast.message("Journal cleared");
							},
							children: "Start fresh"
						})
					]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-2xl p-5 md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							htmlFor: "p-name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "p-name",
								value: partner.name,
								onChange: (e) => setPartner({ name: e.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nickname",
							htmlFor: "p-nick",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "p-nick",
								value: partner.nickname,
								onChange: (e) => setPartner({ nickname: e.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Pronouns",
							htmlFor: "p-pro",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "p-pro",
								value: partner.pronouns,
								onChange: (e) => setPartner({ pronouns: e.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "How you met",
							htmlFor: "p-met",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "p-met",
								value: partner.howWeMet,
								onChange: (e) => setPartner({ howWeMet: e.target.value })
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: `Notes on ${first}`,
					htmlFor: "p-notes",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "p-notes",
						value: partner.notes,
						onChange: (e) => setPartner({ notes: e.target.value }),
						rows: 3
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Love languages",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: LOVE_LANGUAGES.map((lang) => {
						const on = partner.loveLanguages.includes(lang);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggleLang(lang),
							className: cn("h-11 rounded-full px-4 text-sm font-medium transition-colors duration-150", on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"),
							children: lang
						}, lang);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Likes",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipInput, {
						values: partner.likes,
						onChange: (likes) => setPartner({ likes }),
						placeholder: "Add a like"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Dislikes",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipInput, {
						values: partner.dislikes,
						onChange: (dislikes) => setPartner({ dislikes }),
						placeholder: "Add a dislike"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Favorites & sizes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "grid gap-4 p-5 sm:grid-cols-2",
					children: [
						[
							"favoriteColor",
							"Color",
							partner.favoriteColor
						],
						[
							"favoriteFlower",
							"Flower",
							partner.favoriteFlower
						],
						[
							"favoriteFood",
							"Food",
							partner.favoriteFood
						],
						[
							"favoriteDrink",
							"Drink",
							partner.favoriteDrink
						],
						[
							"favoriteMovie",
							"Movie",
							partner.favoriteMovie
						],
						[
							"favoriteSong",
							"Song",
							partner.favoriteSong
						],
						[
							"shirtSize",
							"Shirt",
							partner.shirtSize
						],
						[
							"shoeSize",
							"Shoes",
							partner.shoeSize
						],
						[
							"ringSize",
							"Ring",
							partner.ringSize
						]
					].map(([key, label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label,
						htmlFor: `p-${key}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: `p-${key}`,
							value,
							onChange: (e) => setPartner({ [key]: e.target.value })
						})
					}, key))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Little-thing rituals",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => setROpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add"]
				}),
				children: rituals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Add the small repeats — a note, a Friday plan, a phone-free dinner."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: rituals.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex items-center gap-3 p-3 pl-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: r.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [cadenceLabel(r.cadenceDays), r.lastDone ? ` · last ${formatShort(parseIso(r.lastDone))}` : " · never done"]
								})]
							}),
							ritualDue(r) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "warn",
								children: "Due"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "muted",
								children: "Current"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => completeRitual(r.id),
								children: "Done"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => removeRitual(r.id),
								children: "Remove"
							})
						]
					}) }, r.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Gesture log",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => setGOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Log"]
				}),
				children: gestures.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "The things you actually did, in one place."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col",
					children: gestures.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-3 border-b border-border py-3 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: g.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									formatShort(parseIso(g.date)),
									" · ",
									g.kind,
									g.notes ? ` · ${g.notes}` : ""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => removeGesture(g.id),
							children: "Remove"
						})]
					}, g.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Quality time",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => setQOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Log"]
				}),
				children: quality.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Undistracted hours, counted honestly."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col",
					children: quality.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-3 border-b border-border py-3 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: q.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									formatShort(parseIso(q.date)),
									" · ",
									formatMinutes(q.minutes),
									q.notes ? ` · ${q.notes}` : ""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => removeQuality(q.id),
							children: "Remove"
						})]
					}, q.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotifySettings, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "This device",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "overflow-hidden p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/icon-192.png",
										alt: "",
										width: 40,
										height: 40,
										className: "size-10 rounded-lg"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: "Keep it on this phone"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs leading-relaxed text-muted-foreground",
											children: "Android: Chrome menu → Install app. iPhone: Share → Add to Home Screen. A Google Play listing still needs a signed Android App Bundle from Play Console."
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
										children: "Android"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallSteps, {
										compact: true,
										platform: "android"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
										children: "iPhone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallSteps, {
										compact: true,
										platform: "ios"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallNowButton, { className: "mt-3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareWithBotButton, { className: "mt-3 w-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "mt-3 w-full",
									variant: "outline",
									onClick: () => setInstallOpen(true),
									children: "Show install steps"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "flex min-h-12 items-center px-5 text-left text-sm hover:bg-muted",
									onClick: () => {
										const s = useAppStore.getState();
										downloadJournal({
											partner: s.partner,
											dates: s.dates,
											ideas: s.ideas,
											gestures: s.gestures,
											quality: s.quality,
											rituals: s.rituals,
											intention: s.intention,
											weeklyGoal: s.weeklyGoal
										});
										toast.success("Journal exported");
									},
									children: "Export journal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "flex min-h-12 items-center border-t border-border px-5 text-left text-sm hover:bg-muted",
									onClick: () => fileRef.current?.click(),
									children: "Import journal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/bot",
									className: "flex min-h-12 items-center border-t border-border px-5 text-sm hover:bg-muted",
									children: "Grok Bot"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/play",
									className: "flex min-h-12 items-center border-t border-border px-5 text-sm hover:bg-muted",
									children: "Play listing"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/privacy",
									className: "flex min-h-12 items-center border-t border-border px-5 text-sm hover:bg-muted",
									children: "Privacy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/support",
									className: "flex min-h-12 items-center border-t border-border px-5 text-sm hover:bg-muted",
									children: "Support"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "flex min-h-12 items-center border-t border-border px-5 text-left text-sm text-destructive hover:bg-muted",
									onClick: () => setDeleteOpen(true),
									children: "Delete journal"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Version ",
							APP_VERSION,
							" · Age ",
							"4+",
							" · Play ",
							APP_PLAY_RATING,
							" ·",
							" ",
							unlocked ? `Unlocked \$19 lifetime` : "Preview",
							" ",
							"· Stored only on this device"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "application/json,.json",
						className: "sr-only",
						"aria-label": "Import journal file",
						onChange: (e) => {
							const file = e.target.files?.[0];
							e.target.value = "";
							if (!file) return;
							(async () => {
								try {
									const text = await file.text();
									const parsed = parseJournal(JSON.parse(text));
									if (!parsed) {
										toast.error("That file is not a Good Partner journal");
										return;
									}
									loadJournal(parsed);
									toast.success("Journal imported");
								} catch {
									toast.error("Could not read that file");
								}
							})();
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GestureDialog, {
				open: gOpen,
				onOpenChange: setGOpen,
				onSave: (item) => {
					addGesture(item);
					toast.success("Gesture logged");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QualityDialog, {
				open: qOpen,
				onOpenChange: setQOpen,
				onSave: (item) => {
					addQuality(item);
					toast.success("Time logged");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RitualDialog, {
				open: rOpen,
				onOpenChange: setROpen,
				onSave: (item) => {
					addRitual(item);
					toast.success("Ritual added");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallDialog, {
				open: installOpen,
				onOpenChange: setInstallOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: deleteOpen,
				onOpenChange: setDeleteOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete this journal?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Everything on this device — dates, ideas, rituals, and notes — will be removed. This cannot be undone." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Keep it" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					onClick: () => {
						resetEmpty();
						toast.message("Journal cleared");
					},
					children: "Delete"
				})] })] })
			})
		]
	});
}
//#endregion
export { UsPage as component };
