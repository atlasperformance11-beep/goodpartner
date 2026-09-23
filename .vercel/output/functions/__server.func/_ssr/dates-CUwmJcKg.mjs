import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D19HL7Cl.mjs";
import { F as yearsTogether, I as Button, N as useAppStore, S as occasionCaption, T as remindWindow, a as daysUntilDate, b as nextOccurrence, m as inPlanningWindow, o as defaultRemindDays, p as ideasForOccasion, u as formatShort, w as remindDaysFromWindow, y as monthMatrix } from "./store-C7z6kliX.mjs";
import { c as addMonths, i as isSameDay, r as format, t as isSameMonth } from "../_libs/date-fns.mjs";
import { f as ChevronRight, p as ChevronLeft, s as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as PageHeader, i as NativeSelect, n as Field, r as Input, s as Textarea, t as Badge } from "./field-D1Ra45vy.mjs";
import { t as EmptyState } from "./empty-state-C-ubxyGe.mjs";
import { t as IdeaDialog } from "./idea-dialog-CLrE70yD.mjs";
import { t as DATE_KIND_LABEL } from "./types-D0s0ng40.mjs";
import { d as DialogContent, f as DialogDescription, h as DialogTitle, l as Card, m as DialogHeader, p as DialogFooter, u as Dialog } from "./router-DVeLkr-O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dates-CUwmJcKg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = {
	title: "",
	kind: "custom",
	month: 1,
	day: 1,
	year: "",
	recursYearly: true,
	notes: "",
	window: 14
};
function DateDialog({ open, onOpenChange, initial, prefill, onSave }) {
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		if (initial) setForm({
			title: initial.title,
			kind: initial.kind,
			month: initial.month,
			day: initial.day,
			year: initial.year ? String(initial.year) : "",
			recursYearly: initial.recursYearly,
			notes: initial.notes,
			window: remindWindow(initial)
		});
		else {
			const now = /* @__PURE__ */ new Date();
			setForm({
				...emptyForm,
				month: prefill?.month ?? now.getMonth() + 1,
				day: prefill?.day ?? now.getDate()
			});
		}
	}, [
		open,
		initial,
		prefill
	]);
	function setKind(kind) {
		setForm((f) => ({
			...f,
			kind,
			window: initial ? f.window : Math.max(...defaultRemindDays(kind))
		}));
	}
	function submit() {
		const title = form.title.trim();
		if (!title) return;
		const year = form.year ? Number(form.year) : void 0;
		onSave({
			title,
			kind: form.kind,
			month: form.month,
			day: form.day,
			year: Number.isFinite(year) ? year : void 0,
			recursYearly: form.recursYearly,
			notes: form.notes.trim(),
			remindDays: remindDaysFromWindow(form.window)
		});
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: initial ? "Edit date" : "Add a date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Birthdays, anniversaries, firsts, and the days that matter." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Title",
						htmlFor: "date-title",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "date-title",
							value: form.title,
							onChange: (e) => setForm({
								...form,
								title: e.target.value
							}),
							placeholder: "Maya's birthday"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Kind",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: form.kind,
							onChange: (e) => setKind(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "birthday",
									children: "Birthday"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "anniversary",
									children: "Anniversary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "first",
									children: "Firsts"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "custom",
									children: "Occasion"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Month",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									value: form.month,
									onChange: (e) => setForm({
										...form,
										month: Number(e.target.value)
									}),
									children: Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: i + 1,
										children: new Date(2e3, i, 1).toLocaleString("en", { month: "short" })
									}, i + 1))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Day",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1,
									max: 31,
									value: form.day,
									onChange: (e) => setForm({
										...form,
										day: Number(e.target.value)
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Year",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1900,
									max: 2100,
									value: form.year,
									onChange: (e) => setForm({
										...form,
										year: e.target.value
									}),
									placeholder: "Optional"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: form.recursYearly,
							onChange: (e) => setForm({
								...form,
								recursYearly: e.target.checked
							}),
							className: "size-4 accent-primary"
						}), "Repeats every year"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Start reminding",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: form.window,
							onChange: (e) => setForm({
								...form,
								window: Number(e.target.value)
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 7,
									children: "1 week before"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 14,
									children: "2 weeks before"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 21,
									children: "3 weeks before"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 30,
									children: "A month before"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Notes",
						htmlFor: "date-notes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "date-notes",
							value: form.notes,
							onChange: (e) => setForm({
								...form,
								notes: e.target.value
							}),
							placeholder: "What would make this day feel considered?"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: () => onOpenChange(false),
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: submit,
				disabled: !form.title.trim(),
				children: "Save date"
			})] })
		] })
	});
}
function DatesPage() {
	const dates = useAppStore((s) => s.dates);
	const ideas = useAppStore((s) => s.ideas);
	const addDate = useAppStore((s) => s.addDate);
	const updateDate = useAppStore((s) => s.updateDate);
	const removeDate = useAppStore((s) => s.removeDate);
	const addIdea = useAppStore((s) => s.addIdea);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [prefill, setPrefill] = (0, import_react.useState)(null);
	const [ideaOpen, setIdeaOpen] = (0, import_react.useState)(false);
	const [ideaOccasion, setIdeaOccasion] = (0, import_react.useState)("");
	const [month, setMonth] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const upcoming = (0, import_react.useMemo)(() => dates.map((d) => ({
		item: d,
		days: daysUntilDate(d),
		next: nextOccurrence(d),
		years: yearsTogether(d)
	})).filter((x) => x.days >= 0).sort((a, b) => a.days - b.days), [dates]);
	const weeks = monthMatrix(month);
	function openNew() {
		setEditing(null);
		setPrefill(null);
		setOpen(true);
	}
	function openEdit(item) {
		setPrefill(null);
		setEditing(item);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "The calendar",
			title: "Dates that matter",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: openNew,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add date"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-2xl p-4 md:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl tracking-tight",
							children: format(month, "MMMM yyyy")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Previous month",
								onClick: () => setMonth((m) => addMonths(m, -1)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Next month",
								onClick: () => setMonth((m) => addMonths(m, 1)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wide text-muted-foreground",
						children: [
							"Mon",
							"Tue",
							"Wed",
							"Thu",
							"Fri",
							"Sat",
							"Sun"
						].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-1",
							children: d
						}, d))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 grid grid-cols-7 gap-1",
						children: weeks.flat().map((day) => {
							const inMonth = isSameMonth(day, month);
							const marked = dates.filter((d) => d.month === day.getMonth() + 1 && d.day === day.getDate() && (d.recursYearly || d.year === day.getFullYear()));
							const today = isSameDay(day, /* @__PURE__ */ new Date());
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									if (marked[0]) openEdit(marked[0]);
									else if (inMonth) {
										setEditing(null);
										setPrefill({
											month: day.getMonth() + 1,
											day: day.getDate()
										});
										setOpen(true);
									}
								},
								className: cn("flex min-h-11 flex-col items-center justify-start rounded-lg py-1.5 text-sm tabular-nums transition-colors duration-150", inMonth ? "text-foreground" : "text-muted-foreground/40", today && "bg-sage-soft text-primary", marked.length > 0 && inMonth && !today && "bg-muted"),
								children: [day.getDate(), marked.length > 0 && inMonth ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-0.5 size-1 rounded-full bg-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-0.5 size-1" })]
							}, day.toISOString());
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No dates yet",
					body: "Add birthdays, anniversaries, and the days you want to meet with intention.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: openNew,
						size: "sm",
						children: "Add a date"
					})
				}) : upcoming.map((u) => {
					const related = ideasForOccasion(ideas, u.item.title).filter((i) => i.status !== "done");
					const planning = inPlanningWindow(u.item);
					const caption = occasionCaption(u.item, u.years);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-lg tracking-tight",
												children: u.item.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "muted",
												children: DATE_KIND_LABEL[u.item.kind]
											}),
											planning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "warn",
												children: "Plan"
											}) : null
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: [
											formatShort(u.next),
											caption ? ` · ${caption}` : "",
											u.item.recursYearly ? " · yearly" : ""
										]
									}),
									u.item.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-relaxed",
										children: u.item.notes
									}) : null,
									related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: related.map((i) => i.title).join(" · ")
									}) : null
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "shrink-0 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-2xl tabular-nums leading-none tracking-tight text-primary",
									children: u.days
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-wide text-muted-foreground",
									children: u.days === 1 ? "day" : "days"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									onClick: () => {
										setIdeaOccasion(u.item.title);
										setIdeaOpen(true);
									},
									children: "Plan a gift or date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => openEdit(u.item),
									children: "Edit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => {
										removeDate(u.item.id);
										toast.success("Date removed");
									},
									children: "Remove"
								})
							]
						})]
					}, u.item.id);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateDialog, {
			open,
			onOpenChange: setOpen,
			initial: editing,
			prefill,
			onSave: (item) => {
				if (editing) {
					updateDate(editing.id, item);
					toast.success("Date updated");
				} else {
					addDate(item);
					toast.success("Date added");
				}
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
	] });
}
//#endregion
export { DatesPage as component };
