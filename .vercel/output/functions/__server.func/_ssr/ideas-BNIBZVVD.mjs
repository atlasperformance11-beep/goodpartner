import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D19HL7Cl.mjs";
import { I as Button, N as useAppStore } from "./store-C7z6kliX.mjs";
import { s as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as PageHeader, t as Badge } from "./field-D1Ra45vy.mjs";
import { t as EmptyState } from "./empty-state-C-ubxyGe.mjs";
import { t as IdeaDialog } from "./idea-dialog-CLrE70yD.mjs";
import { n as IDEA_STATUS_LABEL } from "./types-D0s0ng40.mjs";
import { l as Card } from "./router-DVeLkr-O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ideas-BNIBZVVD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IdeasPage() {
	const ideas = useAppStore((s) => s.ideas);
	const addIdea = useAppStore((s) => s.addIdea);
	const updateIdea = useAppStore((s) => s.updateIdea);
	const removeIdea = useAppStore((s) => s.removeIdea);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		return ideas.filter((i) => {
			if (filter === "all") return true;
			if (filter === "gift" || filter === "date") return i.kind === filter;
			return i.status === filter;
		});
	}, [ideas, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "The list",
			title: "Gifts & date ideas",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => {
					setEditing(null);
					setOpen(true);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add idea"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex flex-wrap gap-1.5",
			children: [
				{
					id: "all",
					label: "All"
				},
				{
					id: "gift",
					label: "Gifts"
				},
				{
					id: "date",
					label: "Dates"
				},
				{
					id: "planned",
					label: "Planned"
				},
				{
					id: "done",
					label: "Done"
				}
			].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(f.id),
				className: cn("h-9 rounded-full px-3.5 text-sm font-medium transition-colors duration-150", filter === f.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"),
				children: f.label
			}, f.id))
		}),
		filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Nothing here yet",
			body: "Catch the idea when it shows up — a gift, a place, a night that would feel like them.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: () => {
					setEditing(null);
					setOpen(true);
				},
				children: "Add idea"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3 sm:grid-cols-2",
			children: filtered.map((idea) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex h-full flex-col p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: idea.kind === "gift" ? "default" : "muted",
							children: idea.kind === "gift" ? "Gift" : "Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: idea.status === "planned" ? "warn" : "outline",
							children: IDEA_STATUS_LABEL[idea.status]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 font-display text-lg tracking-tight",
						children: idea.title
					}),
					idea.occasion ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: ["For ", idea.occasion]
					}) : null,
					idea.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 flex-1 text-sm leading-relaxed text-foreground/80",
						children: idea.notes
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					idea.tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: idea.tags.join(" · ")
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-1",
						children: [
							idea.status !== "planned" && idea.status !== "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => updateIdea(idea.id, { status: "planned" }),
								children: "Plan it"
							}) : null,
							idea.status !== "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => {
									updateIdea(idea.id, { status: "done" });
									toast.success("Marked done");
								},
								children: "Mark done"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => {
									setEditing(idea);
									setOpen(true);
								},
								children: "Edit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => {
									removeIdea(idea.id);
									toast.success("Removed");
								},
								children: "Remove"
							})
						]
					})
				]
			}) }, idea.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdeaDialog, {
			open,
			onOpenChange: setOpen,
			initial: editing,
			onSave: (item) => {
				if (editing) {
					updateIdea(editing.id, item);
					toast.success("Idea updated");
				} else {
					addIdea(item);
					toast.success("Idea saved");
				}
			}
		})
	] });
}
//#endregion
export { IdeasPage as component };
