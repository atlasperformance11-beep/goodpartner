import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { I as Button, v as isoDate } from "./store-C7z6kliX.mjs";
import { i as NativeSelect, n as Field, r as Input, s as Textarea } from "./field-D1Ra45vy.mjs";
import { d as DialogContent, f as DialogDescription, h as DialogTitle, m as DialogHeader, p as DialogFooter, u as Dialog } from "./router-DVeLkr-O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/log-dialogs-CoIWIoeX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GestureDialog({ open, onOpenChange, onSave }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(isoDate());
	const [kind, setKind] = (0, import_react.useState)("note");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setTitle("");
		setNotes("");
		setDate(isoDate());
		setKind("note");
	}, [open]);
	function submit() {
		if (!title.trim()) return;
		onSave({
			title: title.trim(),
			notes: notes.trim(),
			date,
			kind
		});
		setTitle("");
		setNotes("");
		setDate(isoDate());
		setKind("note");
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Log a gesture" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "The small thing you actually did. It counts." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "What did you do?",
						htmlFor: "g-title",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "g-title",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "Left a note in her laptop sleeve"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Kind",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								value: kind,
								onChange: (e) => setKind(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "note",
										children: "Note"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "gift",
										children: "Gift"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "help",
										children: "Help"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "surprise",
										children: "Surprise"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "time",
										children: "Time"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "other",
										children: "Other"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "When",
							htmlFor: "g-date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "g-date",
								type: "date",
								value: date,
								onChange: (e) => setDate(e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Notes",
						htmlFor: "g-notes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "g-notes",
							value: notes,
							onChange: (e) => setNotes(e.target.value)
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
				disabled: !title.trim(),
				children: "Log it"
			})] })
		] })
	});
}
function QualityDialog({ open, onOpenChange, onSave }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(isoDate());
	const [minutes, setMinutes] = (0, import_react.useState)(60);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setTitle("");
		setNotes("");
		setDate(isoDate());
		setMinutes(60);
	}, [open]);
	function submit() {
		if (!title.trim()) return;
		onSave({
			title: title.trim(),
			notes: notes.trim(),
			date,
			minutes: Math.max(5, minutes)
		});
		setTitle("");
		setNotes("");
		setDate(isoDate());
		setMinutes(60);
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Log quality time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Undistracted time together — even a short walk." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "What did you do?",
						htmlFor: "q-title",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "q-title",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "Evening walk, no phones"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Minutes",
							htmlFor: "q-min",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "q-min",
								type: "number",
								min: 5,
								step: 5,
								value: minutes,
								onChange: (e) => setMinutes(Number(e.target.value))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "When",
							htmlFor: "q-date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "q-date",
								type: "date",
								value: date,
								onChange: (e) => setDate(e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Notes",
						htmlFor: "q-notes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "q-notes",
							value: notes,
							onChange: (e) => setNotes(e.target.value)
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
				disabled: !title.trim(),
				children: "Log time"
			})] })
		] })
	});
}
function RitualDialog({ open, onOpenChange, onSave }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [cadence, setCadence] = (0, import_react.useState)(7);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setTitle("");
		setNotes("");
		setCadence(7);
	}, [open]);
	function submit() {
		if (!title.trim()) return;
		onSave({
			title: title.trim(),
			notes: notes.trim(),
			cadenceDays: cadence,
			lastDone: null
		});
		setTitle("");
		setNotes("");
		setCadence(7);
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New little thing" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "A small ritual you want to keep. Daily, weekly, or your own cadence." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Ritual",
						htmlFor: "r-title",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "r-title",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "Leave a small note"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "How often",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: cadence,
							onChange: (e) => setCadence(Number(e.target.value)),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 1,
									children: "Every day"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 3,
									children: "Every 3 days"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 5,
									children: "Every 5 days"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 7,
									children: "Every week"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 14,
									children: "Every 2 weeks"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Notes",
						htmlFor: "r-notes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "r-notes",
							value: notes,
							onChange: (e) => setNotes(e.target.value)
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
				disabled: !title.trim(),
				children: "Add ritual"
			})] })
		] })
	});
}
//#endregion
export { QualityDialog as n, RitualDialog as r, GestureDialog as t };
