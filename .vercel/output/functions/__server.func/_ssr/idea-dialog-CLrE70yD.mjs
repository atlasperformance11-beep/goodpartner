import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { I as Button } from "./store-C7z6kliX.mjs";
import { i as NativeSelect, n as Field, r as Input, s as Textarea } from "./field-D1Ra45vy.mjs";
import { d as DialogContent, f as DialogDescription, h as DialogTitle, m as DialogHeader, p as DialogFooter, u as Dialog } from "./router-DVeLkr-O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/idea-dialog-CLrE70yD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = {
	title: "",
	kind: "gift",
	status: "idea",
	occasion: "",
	tags: "",
	notes: ""
};
function IdeaDialog({ open, onOpenChange, initial, defaultKind, defaultOccasion, onSave }) {
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		if (initial) setForm({
			title: initial.title,
			kind: initial.kind,
			status: initial.status,
			occasion: initial.occasion,
			tags: initial.tags.join(", "),
			notes: initial.notes
		});
		else setForm({
			...emptyForm,
			kind: defaultKind ?? "gift",
			occasion: defaultOccasion ?? ""
		});
	}, [
		open,
		initial,
		defaultKind,
		defaultOccasion
	]);
	function submit() {
		const title = form.title.trim();
		if (!title) return;
		onSave({
			title,
			kind: form.kind,
			status: form.status,
			occasion: form.occasion.trim(),
			notes: form.notes.trim(),
			tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean)
		});
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: initial ? "Edit idea" : "Save an idea" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Gifts and dates, waiting for the right moment." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Title",
						htmlFor: "idea-title",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "idea-title",
							value: form.title,
							onChange: (e) => setForm({
								...form,
								title: e.target.value
							}),
							placeholder: "Sunset picnic at Red Rocks"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Kind",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								value: form.kind,
								onChange: (e) => setForm({
									...form,
									kind: e.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "gift",
									children: "Gift"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "date",
									children: "Date"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								value: form.status,
								onChange: (e) => setForm({
									...form,
									status: e.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "idea",
										children: "Idea"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "planned",
										children: "Planned"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "done",
										children: "Done"
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Occasion",
						htmlFor: "idea-occ",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "idea-occ",
							value: form.occasion,
							onChange: (e) => setForm({
								...form,
								occasion: e.target.value
							}),
							placeholder: "Birthday, just because…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tags",
						htmlFor: "idea-tags",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "idea-tags",
							value: form.tags,
							onChange: (e) => setForm({
								...form,
								tags: e.target.value
							}),
							placeholder: "outdoors, coffee, home"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Notes",
						htmlFor: "idea-notes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "idea-notes",
							value: form.notes,
							onChange: (e) => setForm({
								...form,
								notes: e.target.value
							}),
							placeholder: "The details that make it theirs."
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
				children: "Save idea"
			})] })
		] })
	});
}
//#endregion
export { IdeaDialog as t };
