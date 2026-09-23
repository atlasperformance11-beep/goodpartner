import { n as APP_NAME } from "./app-meta-DYIgFBD-.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal-page-CbBrz719.js
var import_jsx_runtime = require_jsx_runtime();
function LegalPage({ title, updated, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-prose",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
				children: APP_NAME
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-display tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: ["Updated ", updated]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "legal-copy mt-8 flex flex-col gap-5 text-sm leading-relaxed text-foreground/90",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm font-medium text-primary underline-offset-4 hover:underline",
					children: "Back to Today"
				})
			})
		]
	});
}
//#endregion
export { LegalPage as t };
