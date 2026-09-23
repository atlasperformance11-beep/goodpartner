import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-D19HL7Cl.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-sage-soft text-primary",
		muted: "bg-muted text-muted-foreground",
		outline: "border border-border text-foreground",
		warn: "bg-secondary text-warn"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function PageHeader({ kicker, title, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-6 flex flex-wrap items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
			children: kicker
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-title tracking-tight",
			children: title
		})] }), action]
	});
}
function Section({ title, action, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("flex flex-col gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
				children: title
			}), action]
		}), children]
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("flex h-11 w-full rounded-lg border border-input bg-card px-3 text-base text-foreground shadow-[var(--shadow-card)] transition-[box-shadow,border-color] duration-150 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-slot": "textarea",
		className: cn("flex min-h-24 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-base text-foreground shadow-[var(--shadow-card)] transition-[box-shadow,border-color] duration-150 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		"data-slot": "label",
		className: cn("text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
function Field({ label, htmlFor, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor,
			children: label
		}), children]
	});
}
function NativeSelect({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("flex h-11 w-full rounded-lg border border-input bg-card px-3 text-base text-foreground shadow-[var(--shadow-card)] focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 md:text-sm", className),
		...props
	});
}
//#endregion
export { PageHeader as a, NativeSelect as i, Field as n, Section as o, Input as r, Textarea as s, Badge as t };
