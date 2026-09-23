import { n as APP_NAME } from "./app-meta-DYIgFBD-.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as LegalPage } from "./legal-page-CbBrz719.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-B9Ee0Jb4.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalPage, {
		title: "Privacy",
		updated: "September 21, 2026",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [APP_NAME, " is a journal that lives on the device in front of you. There is no account, no cloud sync, and no advertising. This page is the privacy policy you can use for App Store Connect and Google Play Data Safety."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "What we store"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The name, dates, ideas, rituals, and notes you enter are saved in this browser’s local storage. They never leave the device unless you export them or tap Spark ideas." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "What we do not collect"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "list-disc space-y-1 pl-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No sign-in, email, or phone number" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No location, contacts, photos, or microphone" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No analytics, crash reports, or advertising identifiers" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No tracking across other apps or websites" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Spark ideas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Spark is optional and only runs when you tap the button. That request sends the first name, likes, love languages, upcoming dates, and recent gestures you have already typed, so Grok can suggest something specific. It is not sent on launch, on a timer, or in the background. If you do not want that, do not tap Spark." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Reminders"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Optional alerts stay on this device. In-app banners work without extra permission. Phone banners use the browser’s notification permission, only after you allow them, and never leave the phone. You can turn them off on the Us tab. They are not push messages from a server." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Your controls"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "On the Us tab you can export a JSON copy of the journal, import one back, share a private brief with a Grok Bot, or delete everything on this device. Sharing sends only what you choose to hand over. Deleting cannot be undone. Uninstalling the Home Screen icon or clearing this site’s data also removes the journal." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Payments"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The lifetime unlock is a one-time charge. On the website and Chrome install it is processed by Stripe. Inside the Google Play app it is processed by Google Play Billing. We never see or store your card number. Paying does not create an account here; the journal still lives only on this device." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Children"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [APP_NAME, " is rated 4+ / Google Play Everyone and does not target children. It does not collect personal information as Apple defines it in Guideline 5.1.3 or as Google defines it in Families Policy. There is no social graph and no user-generated public content."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Google Play Data safety"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"We do not collect account data. Optional Spark requests go to xAI. Optional checkout goes to Stripe on the web, or Google Play Billing inside the Play Store app. Nothing is sold. You can export or delete the journal on the Us tab. The Play Console form is filled out on the",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/play",
					className: "font-medium text-primary underline-offset-4 hover:underline",
					children: "Play listing"
				}),
				" ",
				"page."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Contact"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "There is no server-side account to write to. Questions about data on this device are answered in Support. If Spark is unavailable, nothing is stored remotely on your behalf." })
		]
	});
}
//#endregion
export { PrivacyPage as component };
