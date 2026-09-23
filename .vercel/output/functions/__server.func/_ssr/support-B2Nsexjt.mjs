import { i as APP_PLAY_RATING, n as APP_NAME, t as APP_ANDROID_PACKAGE, u as APP_VERSION } from "./app-meta-DYIgFBD-.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as LegalPage } from "./legal-page-CbBrz719.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support-B2Nsexjt.js
var import_jsx_runtime = require_jsx_runtime();
function SupportPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalPage, {
		title: "Support",
		updated: "September 21, 2026",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				APP_NAME,
				" ",
				APP_VERSION,
				" · Age ",
				"4+",
				" / Play ",
				APP_PLAY_RATING,
				" · One-time",
				" ",
				"$19",
				" unlock through Stripe. No subscription, no ads. Android package",
				" ",
				APP_ANDROID_PACKAGE,
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Install on Android"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Open the site in Chrome, tap the three-dot menu, then Install app (or Add to Home screen). It opens full screen with its own icon. The Google Play listing uses a signed Android App Bundle wrapping this site — listing copy, Data Safety, and the bundle live on",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/play",
					className: "font-medium text-primary underline-offset-4 hover:underline",
					children: "Play listing"
				}),
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Install on iPhone"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This release is a Home Screen web app, not a binary from the App Store. Open it in Safari, tap Share, then Add to Home Screen. It will open full screen with its own icon. A native App Store build still requires an Apple Developer account and a signed wrapper — that step happens in Xcode, not here." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Buying and refunds"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Unlock is ",
				"$19",
				" once. On the website it is paid on Stripe. Inside the Google Play app it is paid with Google Play Billing (product ",
				APP_ANDROID_PACKAGE,
				" / lifetime_unlock). It unlocks this browser / Home Screen only — there is no cloud copy. If you were charged twice or the journal did not unlock, reply to the Stripe receipt or use Play’s subscription & purchases. Refunds are handled there."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "If something is missing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "list-disc space-y-1 pl-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Today is empty — add their name from the first screen, or load the sample journal." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A date did not remind you — open Us → Reminders and turn them on. For a lock-screen banner, add the app to the Home Screen, open it from the icon, and allow alerts. On Dates, set “Start reminding.”" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Spark did not return ideas — try again when you have a connection. Fallback ideas still appear." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The journal vanished — it is stored only in this browser. Clearing site data or a different device will look empty." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Grok Bot"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Today or Us → Share with a Grok Bot. On iPhone, choose Grok Bot in the share sheet. The brief includes the name, upcoming dates, and open ideas already in the journal — nothing else, and nothing until you send it. The Bot skill is also at /bot.md." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Move or erase your data"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Us → This device → Export journal saves a JSON file. Import puts it back. Delete journal removes every entry on this device and cannot be undone." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Privacy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Read the",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/privacy",
					className: "font-medium text-primary underline-offset-4 hover:underline",
					children: "privacy policy"
				}),
				". Journal data is not sold. Stripe sees the payment. Spark is the only other network call, and only when you ask for it."
			] })
		]
	});
}
//#endregion
export { SupportPage as component };
