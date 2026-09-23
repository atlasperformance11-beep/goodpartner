import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D19HL7Cl.mjs";
import { C as parseIso, D as ritualDue, F as yearsTogether, I as Button, N as useAppStore, O as ritualOverdueBy, P as weekDays, S as occasionCaption, a as daysUntilDate, b as nextOccurrence, c as formatLong, d as greeting, k as sessionsThisWeek, l as formatMinutes, m as inPlanningWindow, p as ideasForOccasion, r as cadenceLabel, u as formatShort, v as isoDate } from "./store-C7z6kliX.mjs";
import { i as Sparkles, m as Check, s as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ShareWithBotButton } from "./share-bot-button-EdHmIKK4.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { n as Field, o as Section, r as Input, s as Textarea, t as Badge } from "./field-D1Ra45vy.mjs";
import { t as IdeaDialog } from "./idea-dialog-CLrE70yD.mjs";
import { c as Mark, i as purchasePlayUnlock, l as Card, r as playBillingAvailable } from "./router-DVeLkr-O.mjs";
import { n as QualityDialog, t as GestureDialog } from "./log-dialogs-CoIWIoeX.mjs";
import { i as startCheckout, r as createSsrRpc } from "./checkout-Ao527YX7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-01rfAnOj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INCLUDED = [
	"Birthdays, anniversaries, and the dates that sneak up",
	"Gift and date ideas, tied to the occasion",
	"Little-thing rituals and a weekly quality-time goal",
	"Spark ideas when you need a nudge — optional, on tap"
];
function Paywall() {
	const unlock = useAppStore((s) => s.unlock);
	const resetDemo = useAppStore((s) => s.resetDemo);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [viaPlay, setViaPlay] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		playBillingAvailable().then(setViaPlay);
	}, []);
	async function buy() {
		setBusy(true);
		try {
			const play = await purchasePlayUnlock();
			if (play === "purchased" || play === "owned") {
				unlock();
				toast.success(play === "owned" ? "Google Play already has this unlock. You're in." : "You're in. Lifetime unlock on this device.");
				return;
			}
			if (play === "cancelled") return;
			if (play === "failed") {
				toast.error("Google Play could not complete that purchase.");
				return;
			}
			const result = await startCheckout();
			if (result.ok) {
				window.location.assign(result.url);
				return;
			}
			if (result.reason === "off") {
				unlock();
				toast.message("Unlocked on this device. Connect Stripe to take real payments.");
				return;
			}
			toast.error(result.error);
		} catch {
			toast.error("Could not start checkout");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-lg flex-col gap-8 pt-4 md:pt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-8 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
						children: "Good Partner"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-display tracking-tight",
					children: "Never forget the little things."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "A quiet journal for dates, gestures, and quality time. Pay once. It lives on this phone — no account, no subscription."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-col gap-5 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl tracking-tight",
							children: "Lifetime unlock"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl tracking-tight tabular-nums",
							children: "$19"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2.5 text-sm text-foreground/90",
						children: INCLUDED.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "leading-relaxed",
								children: line
							})]
						}, line))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void buy(),
						disabled: busy,
						className: "w-full",
						children: busy ? viaPlay ? "Opening Google Play…" : "Sending you to checkout…" : viaPlay ? `Unlock on Google Play — \$19` : `Unlock for \$19`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-muted-foreground",
						children: viaPlay ? "One payment through Google Play. Restore works if you reinstall from the same account." : "One payment through Stripe. Card details never touch this app. From the Play Store app, this button uses Google Play Billing."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 text-left text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
				onClick: () => {
					resetDemo();
					toast.success("Sample journal — preview only");
				},
				children: "Or preview with a sample journal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs leading-relaxed text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "font-medium text-primary underline-offset-4 hover:underline",
						children: "Privacy"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/support",
						className: "font-medium text-primary underline-offset-4 hover:underline",
						children: "Support"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/play",
						className: "font-medium text-primary underline-offset-4 hover:underline",
						children: "Play listing"
					})
				]
			})
		]
	});
}
var sparkSuggestions = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("e8e378687dfa890ecf9a50f4aaabb46128611cf4cb0d82c4362cd2fac8bcecd2"));
function oneThingToday(input) {
	const overdue = input.rituals.filter((r) => ritualDue(r)).sort((a, b) => ritualOverdueBy(b) - ritualOverdueBy(a));
	if (overdue[0]) {
		const r = overdue[0];
		const over = ritualOverdueBy(r);
		if (over > 0) return `If you do one thing today: ${uncap(r.title)} — ${over}d overdue.`;
		return `If you do one thing today: ${uncap(r.title)}.`;
	}
	const planning = input.upcoming.filter((u) => inPlanningWindow(u.item));
	if (planning[0]) {
		const u = planning[0];
		const related = ideasForOccasion(input.ideas, u.item.title).filter((i) => i.status !== "done");
		if (related.length === 0) return `If you do one thing today: start planning ${u.item.title} (${u.days}d).`;
		const next = related.find((i) => i.status === "idea") ?? related[0];
		if (next.status === "idea") return `If you do one thing today: move “${next.title}” from idea to planned.`;
		return `If you do one thing today: lock in “${next.title}” for ${u.item.title}.`;
	}
	if (input.weekCount < input.weeklyGoal) {
		const short = input.weeklyGoal - input.weekCount;
		return `If you do one thing today: protect time with ${input.firstName}. ${short} more ${short === 1 ? "session" : "sessions"} this week.`;
	}
	return `A few considered things for ${input.firstName} — and for the two of you.`;
}
function uncap(s) {
	if (!s) return s;
	return s.charAt(0).toLowerCase() + s.slice(1);
}
function TodayPage() {
	const partner = useAppStore((s) => s.partner);
	const unlocked = useAppStore((s) => s.unlocked);
	const previewingSample = useAppStore((s) => s.previewingSample);
	if (!unlocked && !previewingSample) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paywall, {});
	if (!partner.name.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Today, {});
}
function Today() {
	const partner = useAppStore((s) => s.partner);
	const dates = useAppStore((s) => s.dates);
	const rituals = useAppStore((s) => s.rituals);
	const quality = useAppStore((s) => s.quality);
	const gestures = useAppStore((s) => s.gestures);
	const ideas = useAppStore((s) => s.ideas);
	const intention = useAppStore((s) => s.intention);
	const weeklyGoal = useAppStore((s) => s.weeklyGoal);
	const completeRitual = useAppStore((s) => s.completeRitual);
	const addGesture = useAppStore((s) => s.addGesture);
	const addQuality = useAppStore((s) => s.addQuality);
	const addIdea = useAppStore((s) => s.addIdea);
	const setIntention = useAppStore((s) => s.setIntention);
	const setWeeklyGoal = useAppStore((s) => s.setWeeklyGoal);
	const [gOpen, setGOpen] = (0, import_react.useState)(false);
	const [qOpen, setQOpen] = (0, import_react.useState)(false);
	const [ideaOpen, setIdeaOpen] = (0, import_react.useState)(false);
	const [ideaOccasion, setIdeaOccasion] = (0, import_react.useState)("");
	const [editingIntention, setEditingIntention] = (0, import_react.useState)(false);
	const [intentDraft, setIntentDraft] = (0, import_react.useState)(intention.text);
	const [sparking, setSparking] = (0, import_react.useState)(false);
	const [suggestions, setSuggestions] = (0, import_react.useState)(null);
	const firstName = partner.nickname || partner.name.split(" ")[0];
	const upcoming = (0, import_react.useMemo)(() => dates.map((d) => ({
		item: d,
		days: daysUntilDate(d),
		next: nextOccurrence(d),
		years: yearsTogether(d)
	})).filter((x) => x.days >= 0).sort((a, b) => a.days - b.days), [dates]);
	const hero = upcoming[0];
	const due = rituals.filter((r) => ritualDue(r)).sort((a, b) => ritualOverdueBy(b) - ritualOverdueBy(a));
	const weekSessions = sessionsThisWeek(quality);
	const week = weekDays();
	const prompt = oneThingToday({
		firstName,
		rituals,
		upcoming,
		ideas,
		weekCount: weekSessions.length,
		weeklyGoal
	});
	const heroRelated = hero ? ideasForOccasion(ideas, hero.item.title).filter((i) => i.status !== "done") : [];
	const heroPlanning = hero ? inPlanningWindow(hero.item) : false;
	async function spark() {
		setSparking(true);
		try {
			const result = await sparkSuggestions({ data: {
				partnerName: partner.name,
				nickname: partner.nickname,
				loveLanguages: partner.loveLanguages,
				likes: partner.likes,
				dislikes: partner.dislikes,
				notes: partner.notes,
				favorites: [
					partner.favoriteFood && `food: ${partner.favoriteFood}`,
					partner.favoriteDrink && `drink: ${partner.favoriteDrink}`,
					partner.favoriteFlower && `flower: ${partner.favoriteFlower}`,
					partner.favoriteColor && `color: ${partner.favoriteColor}`,
					partner.favoriteSong && `song: ${partner.favoriteSong}`
				].filter(Boolean).join("; "),
				upcoming: upcoming.slice(0, 4).map((u) => ({
					title: u.item.title,
					inDays: u.days,
					notes: u.item.notes
				})),
				dueRituals: due.map((r) => r.title),
				recentGestures: gestures.slice(0, 5).map((g) => `${g.date}: ${g.title}`),
				ideas: ideas.filter((i) => i.status !== "done").map((i) => `${i.kind}: ${i.title}`)
			} });
			setSuggestions(result.suggestions);
			if (!result.ok) toast.message("Using standby ideas");
		} catch {
			toast.error("Could not spark ideas right now");
		} finally {
			setSparking(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
					children: formatLong(/* @__PURE__ */ new Date())
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-display tracking-tight",
					children: [greeting(), "."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-lg text-muted-foreground",
					children: prompt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => setGOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Log a gesture"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setQOpen(true),
							children: "Log time"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareWithBotButton, {
							size: "sm",
							label: "Share with a Grok Bot"
						})
					]
				})
			] }),
			hero ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "hero-wash overflow-hidden rounded-2xl p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.14em] text-primary",
						children: "Coming up"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-hero leading-none tracking-tight text-primary tabular-nums",
						children: hero.days
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: hero.days === 0 ? "today" : hero.days === 1 ? "day until" : "days until"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-2xl tracking-tight md:text-3xl",
						children: hero.item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							formatShort(hero.next),
							occasionCaption(hero.item, hero.years) ? ` · ${occasionCaption(hero.item, hero.years)}` : "",
							heroPlanning ? " · time to plan" : ""
						]
					}),
					hero.item.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-prose text-sm leading-relaxed",
						children: hero.item.notes
					}) : null,
					heroRelated.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 flex flex-col gap-1.5",
						children: heroRelated.slice(0, 3).map((idea) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									idea.kind === "gift" ? "Gift" : "Date",
									" ·",
									" "
								]
							}), idea.title]
						}, idea.id))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						className: "mt-4",
						onClick: () => {
							setIdeaOccasion(hero.item.title);
							setIdeaOpen(true);
						},
						children: "Plan a gift or date"
					}),
					upcoming.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 flex flex-col gap-2 border-t border-border/70 pt-4",
						children: upcoming.slice(1, 4).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: u.item.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 tabular-nums text-muted-foreground",
								children: [
									u.days === 0 ? "today" : `${u.days}d`,
									" · ",
									formatShort(u.next)
								]
							})]
						}, u.item.id))
					}) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl tracking-tight",
						children: "A quiet stretch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "No dates on the horizon. A good time to plant something small."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-4",
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dates",
							children: "Add a date"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Little things due",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/us",
						className: "text-xs font-medium text-primary",
						children: "All rituals"
					}),
					children: due.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "You're current. Nothing is waiting."
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2",
						children: due.map((r) => {
							const over = ritualOverdueBy(r);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "flex items-center gap-3 p-3 pl-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: r.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [cadenceLabel(r.cadenceDays), over > 0 ? ` · ${over}d overdue` : " · due today"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "secondary",
									onClick: () => {
										completeRitual(r.id);
										toast.success("Marked done");
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), "Done"]
								})]
							}) }, r.id);
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Quality time this week",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-end justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-3xl tabular-nums tracking-tight",
									children: [weekSessions.length, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-lg text-muted-foreground",
										children: [" / ", weeklyGoal]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "icon",
										variant: "ghost",
										"aria-label": "Decrease weekly goal",
										onClick: () => setWeeklyGoal(weeklyGoal - 1),
										children: "−"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "icon",
										variant: "ghost",
										"aria-label": "Increase weekly goal",
										onClick: () => setWeeklyGoal(weeklyGoal + 1),
										children: "+"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									formatMinutes(weekSessions.reduce((n, s) => n + s.minutes, 0)),
									" together · goal ",
									weeklyGoal,
									" / week"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid grid-cols-7 gap-1.5",
								children: week.map((d) => {
									const has = weekSessions.some((s) => s.date === isoDate(d));
									const isToday = isoDate(d) === isoDate();
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs uppercase tracking-wide text-muted-foreground",
											children: d.toLocaleDateString("en", { weekday: "narrow" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("flex size-8 items-center justify-center rounded-full text-xs tabular-nums", has ? "bg-primary text-primary-foreground" : isToday ? "bg-sage-soft text-primary" : "bg-muted text-muted-foreground"),
											children: d.getDate()
										})]
									}, isoDate(d));
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								className: "mt-4 w-full",
								onClick: () => setQOpen(true),
								children: "Log time together"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "This week's intention",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs font-medium text-primary",
					onClick: () => {
						setIntentDraft(intention.text);
						setEditingIntention((v) => !v);
					},
					children: editingIntention ? "Close" : "Edit"
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "p-5",
					children: editingIntention ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: intentDraft,
							onChange: (e) => setIntentDraft(e.target.value),
							rows: 3
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => {
									setIntention(intentDraft.trim());
									setEditingIntention(false);
									toast.success("Intention saved");
								},
								children: "Save"
							})
						})]
					}) : intention.text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl leading-snug tracking-tight",
						children: intention.text
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Set one intention for the week. Keep it small enough to keep."
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Need an idea?",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"Spark three gestures from ",
								firstName,
								"'s likes, the dates coming up, and what you've already done."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-4",
							onClick: () => void spark(),
							disabled: sparking,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), sparking ? "Thinking…" : "Spark ideas"]
						}),
						suggestions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 flex flex-col gap-3",
							children: suggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-lg bg-muted/80 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "min-w-0 flex-1 font-medium leading-snug",
											children: s.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "muted",
											children: s.effort
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-sm text-muted-foreground",
										children: s.why
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "secondary",
											onClick: () => {
												addIdea({
													kind: "date",
													title: s.title,
													notes: s.why,
													tags: ["spark"],
													status: "idea",
													occasion: ""
												});
												toast.success("Saved to ideas");
											},
											children: "Save as idea"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => {
												addGesture({
													title: s.title,
													notes: s.why,
													date: isoDate(),
													kind: "other"
												});
												toast.success("Logged");
											},
											children: "I did this"
										})]
									})
								]
							}, s.title))
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Recent gestures",
				children: gestures.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Nothing logged yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col",
					children: gestures.slice(0, 5).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-baseline justify-between gap-4 border-b border-border py-3 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: g.title
							}), g.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: g.notes
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-xs tabular-nums text-muted-foreground",
							children: formatShort(parseIso(g.date))
						})]
					}, g.id))
				})
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdeaDialog, {
				open: ideaOpen,
				onOpenChange: setIdeaOpen,
				defaultOccasion: ideaOccasion,
				onSave: (item) => {
					addIdea(item);
					toast.success("Idea saved");
				}
			})
		]
	});
}
function Onboarding() {
	const setPartner = useAppStore((s) => s.setPartner);
	const resetDemo = useAppStore((s) => s.resetDemo);
	const [name, setName] = (0, import_react.useState)("");
	const [nickname, setNickname] = (0, import_react.useState)("");
	function start() {
		const n = name.trim();
		if (!n) return;
		setPartner({
			name: n,
			nickname: nickname.trim()
		});
		toast.success(`Showing up for ${nickname.trim() || n.split(" ")[0]}.`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-lg flex-col gap-8 pt-6 md:pt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
					children: "Good Partner"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-display tracking-tight",
					children: "Never forget the little things."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Dates, gifts, and the small repeats — saved on this phone, not in an account."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-col gap-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Who are you showing up for?",
						htmlFor: "ob-name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "ob-name",
							autoComplete: "off",
							autoCapitalize: "words",
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "Their name"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nickname, if you use one",
						htmlFor: "ob-nick",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "ob-nick",
							value: nickname,
							onChange: (e) => setNickname(e.target.value),
							placeholder: "Optional"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: start,
						disabled: !name.trim(),
						children: "Open the journal"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 text-left text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
				onClick: () => {
					resetDemo();
					toast.success("Loaded a sample journal");
				},
				children: "Or explore with a sample journal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs leading-relaxed text-muted-foreground",
				children: [
					"On iPhone, add it to your Home Screen from Safari.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "font-medium text-primary underline-offset-4 hover:underline",
						children: "Privacy"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/support",
						className: "font-medium text-primary underline-offset-4 hover:underline",
						children: "Support"
					})
				]
			})
		]
	});
}
//#endregion
export { TodayPage as component };
