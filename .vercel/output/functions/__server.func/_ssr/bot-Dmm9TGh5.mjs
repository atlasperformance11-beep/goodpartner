import { n as APP_NAME, r as APP_ORIGIN } from "./app-meta-DYIgFBD-.mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as LegalPage } from "./legal-page-CbBrz719.mjs";
import { t as ShareWithBotButton } from "./share-bot-button-EdHmIKK4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bot-Dmm9TGh5.js
var import_jsx_runtime = require_jsx_runtime();
function BotPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalPage, {
		title: "For a Grok Bot",
		updated: "September 22, 2026",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [APP_NAME, " can hand a private brief to a Grok Bot. On iPhone, the share sheet lists Grok Bot. On the web, the brief is copied so you can paste it into a Bot chat. Nothing is sent until you share."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareWithBotButton, { className: "w-full sm:w-auto" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "What the Bot receives"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Their name, the likes and sizes you typed, dates in the next 90 days, open ideas, and rituals that are due. It also gets a link to the skill at ",
				APP_ORIGIN,
				"/bot.md so the Bot knows not to publish the journal or invent a birthday."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "What stays here"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The journal still lives only on this device. A Grok Bot does not get a login, your Stripe receipt, or a standing copy. Share again when the dates change." })
		]
	});
}
//#endregion
export { BotPage as component };
