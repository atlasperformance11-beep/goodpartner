import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/empty-state-C-ubxyGe.js
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ title, body, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-start gap-3 rounded-xl bg-card px-5 py-8 shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-prose text-sm text-muted-foreground",
				children: body
			}),
			action
		]
	});
}
//#endregion
export { EmptyState as t };
