import { i as __toESM } from "../_runtime.mjs";
import { a as APP_PLAY_SKU, c as APP_TAGLINE, i as APP_PLAY_RATING, l as APP_UPLOAD_SHA256, n as APP_NAME, r as APP_ORIGIN, s as APP_SHORT_DESCRIPTION, t as APP_ANDROID_PACKAGE, u as APP_VERSION } from "./app-meta-DYIgFBD-.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as LegalPage } from "./legal-page-CbBrz719.mjs";
import { t as cn } from "./utils-D19HL7Cl.mjs";
import { d as Copy, m as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play-34kcrMpZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CopyBlock({ label, value, className }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function copy() {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl bg-card p-4 shadow-[var(--shadow-card)]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => void copy(),
				className: "inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary",
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Copied" : "Copy"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-foreground/90",
			children: value
		})]
	});
}
var PLAY_PRIVACY_URL = `${APP_ORIGIN}/privacy`;
var PLAY_SUPPORT_URL = `${APP_ORIGIN}/support`;
var PLAY_MANIFEST_URL = `${APP_ORIGIN}/manifest.webmanifest`;
var PLAY_FULL_DESCRIPTION = `${APP_TAGLINE}

A quiet journal for the dates that sneak up, the gifts that should feel considered, and the little rituals that keep a partnership kind. Pay once (\$19 lifetime). There is no account, no ads, and no cloud copy — the journal lives on this phone.

Remember birthdays and anniversaries with lead times you set. Keep gift and date ideas tied to the occasion. Log gestures and undistracted hours. Spark a suggestion when you need a nudge — only when you ask. Reminders check when you open the app; lock-screen banners need your allow.

${APP_NAME} ${APP_VERSION}. Category: Lifestyle. Content rating: ${APP_PLAY_RATING}.`;
var PLAY_IAP_TITLE = "Lifetime unlock";
var PLAY_IAP_DESCRIPTION = `Unlock ${APP_NAME} forever on this Google account. One payment, no subscription. The journal still lives only on this phone.`;
var PLAY_DATA_SAFETY = `Does the app collect or share user data? Optional only — see below.
Location, contacts, photos, microphone, files: not collected.
Personal info (name, email, phone): not collected. There is no account.
Financial: Play Store purchases go through Google Play Billing. Website / Chrome purchases go through Stripe. We never see or store card numbers.
App activity: the journal stays in on-device storage. Spark, if tapped, sends first name, likes, love languages, upcoming dates, and recent gestures to xAI to write suggestions. It is not sent on launch.
Device IDs / advertising ID: not collected. No ads, no analytics SDK.
Data is encrypted in transit (HTTPS). Journal data is not encrypted at rest beyond the phone.
Data is not sold. Users can export or delete the journal on the Us tab.
Not designed for children. Target age 18+ even though the content is ${APP_PLAY_RATING}.
Privacy policy: ${PLAY_PRIVACY_URL}`;
var PLAY_CONTENT_RATING = `IARC questionnaire
Violence: none
Sexual content: none
Language: none
Controlled substances: none
User interaction / UGC: none (private journal, not shared)
Share location: no
Digital purchases: yes — optional one-time \$19 unlock
Age: ${APP_PLAY_RATING} / 18+ target audience (Older Users)
Ads: no`;
var PLAY_IAP_CONSOLE = `Play Console → Monetize → In-app products → Create product
Product ID: ${APP_PLAY_SKU}
Product type: Managed product (one-time, not a subscription)
Name: ${PLAY_IAP_TITLE}
Description: ${PLAY_IAP_DESCRIPTION}
Default price: \$19 USD
Status: Active`;
var PLAY_PWABUILDER = `Open https://www.pwabuilder.com and package ${APP_ORIGIN}
Use the Google Play tab with these exact values:

Package ID: ${APP_ANDROID_PACKAGE}
App name: ${APP_NAME}
Short name: ${APP_NAME}
Host: ${APP_ORIGIN}
Start URL: /
App version: ${APP_VERSION}
App version code: 1
Theme color: #F3EFE6
Background color: #F3EFE6
Icon URL: ${APP_ORIGIN}/icon-512.png
Maskable icon URL: ${APP_ORIGIN}/icon-512-maskable.png
Manifest URL: ${PLAY_MANIFEST_URL}
Google Play billing: On
Notification delegation: On
Location delegation: Off
Signing key: New (first upload) or Mine (later versions)
Fallback: Custom Tabs
Orientation: Portrait`;
var PLAY_ASSETLINKS_NOTE = `Digital Asset Links already lists package ${APP_ANDROID_PACKAGE} and the upload-key SHA-256:

${APP_UPLOAD_SHA256}

After the first App Bundle upload, open Play Console → Test and release → App integrity → App signing. Copy the App signing key certificate SHA-256 and send it back here. It becomes the second fingerprint so the Play-distributed app opens full screen.`;
function PlayPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalPage, {
		title: "Google Play listing",
		updated: "September 21, 2026",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				APP_NAME,
				" ",
				APP_VERSION,
				" is wrapped as a Trusted Web Activity with Play Billing on, Digital Asset Links published, and listing copy ready to paste. Google still sells the developer seat only to you."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "What’s already done"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "list-disc space-y-1 pl-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Trusted Web Activity for package ",
						APP_ANDROID_PACKAGE,
						", target Android 16, Play Billing and notification delegation on. Upload that App Bundle in Play Console after you open the developer account."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Digital Asset Links lists the upload-key SHA-256 (",
						APP_UPLOAD_SHA256.slice(0, 11),
						"…) so a locally signed build can open full screen."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Inside the Play app, Unlock charges ",
						"$19",
						" through Google Play Billing (product",
						" ",
						APP_PLAY_SKU,
						"). Chrome and iPhone still use Stripe."
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "What Play still needs from you"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "list-decimal space-y-2 pl-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open a Google Play developer account — $25 once, under your Google identity. Google will not sell that seat to anyone else." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Create the app with package ",
						APP_ANDROID_PACKAGE,
						". Publish this site first so Digital Asset Links and the maskable icon are live, then upload the signed App Bundle",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/store/good-partner.aab",
							className: "font-medium text-primary underline-offset-4 hover:underline",
							download: "good-partner-1.0.0.aab",
							children: "good-partner.aab"
						}),
						". PWABuilder settings below are the fallback if you wrap again later."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"After the first upload, open App integrity, copy the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: "app signing"
						}),
						" SHA-256, and send it back here. Play re-signs the store build; that fingerprint has to sit next to the upload key or Chrome shows an address bar."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Monetize → In-app products → create ",
						APP_PLAY_SKU,
						" as a managed one-time product at",
						" ",
						"$19",
						" and activate it. Play rejects a paid unlock that goes around their billing inside the listing."
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Store listing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBlock, {
				label: "App name",
				value: APP_NAME
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBlock, {
				label: "Short description",
				value: APP_SHORT_DESCRIPTION
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBlock, {
				label: "Full description",
				value: PLAY_FULL_DESCRIPTION
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: "Category."
				}),
				" Lifestyle · Productivity",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: "Content rating."
				}),
				" ",
				APP_PLAY_RATING,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: "Package name."
				}),
				" ",
				APP_ANDROID_PACKAGE,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: "Privacy."
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: PLAY_PRIVACY_URL,
					className: "font-medium text-primary underline-offset-4 hover:underline",
					children: PLAY_PRIVACY_URL
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: "Support."
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: PLAY_SUPPORT_URL,
					className: "font-medium text-primary underline-offset-4 hover:underline",
					children: PLAY_SUPPORT_URL
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBlock, {
				label: "IARC / content rating",
				value: PLAY_CONTENT_RATING
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "In-app product"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Name ",
				PLAY_IAP_TITLE,
				". ",
				PLAY_IAP_DESCRIPTION
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBlock, {
				label: "Play Console product",
				value: PLAY_IAP_CONSOLE
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Data safety"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBlock, {
				label: "Data safety answers",
				value: PLAY_DATA_SAFETY
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Digital Asset Links"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBlock, {
				label: "Upload-key fingerprint",
				value: PLAY_ASSETLINKS_NOTE
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Live file:",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/.well-known/assetlinks.json",
					className: "font-medium text-primary underline-offset-4 hover:underline",
					children: "/.well-known/assetlinks.json"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "PWABuilder settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If you wrap on the web instead of uploading the App Bundle from this project, paste these values. Turn Google Play billing on. After you publish this site, the maskable icon and manifest URLs will resolve." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBlock, {
				label: "PWABuilder",
				value: PLAY_PWABUILDER
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-foreground",
				children: "Assets to upload"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "list-disc space-y-1 pl-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/store/good-partner.aab",
							className: "font-medium text-primary underline-offset-4 hover:underline",
							download: "good-partner-1.0.0.aab",
							children: "Android App Bundle"
						}),
						" ",
						"— signed, Play Billing on, upload this in Play Console"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/store/feature-graphic.png",
							className: "font-medium text-primary underline-offset-4 hover:underline",
							children: "Feature graphic"
						}),
						" ",
						"— 1024×500"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/icon-512.png",
							className: "font-medium text-primary underline-offset-4 hover:underline",
							children: "High-res icon"
						}),
						" ",
						"— 512×512"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/store/phone-today.png",
						className: "font-medium text-primary underline-offset-4 hover:underline",
						children: "Phone screenshot — Today"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/store/phone-dates.png",
						className: "font-medium text-primary underline-offset-4 hover:underline",
						children: "Phone screenshot — Dates"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/store/phone-ideas.png",
						className: "font-medium text-primary underline-offset-4 hover:underline",
						children: "Phone screenshot — Ideas"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/store/phone-unlock.png",
						className: "font-medium text-primary underline-offset-4 hover:underline",
						children: "Phone screenshot — Unlock"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/manifest.webmanifest",
						className: "font-medium text-primary underline-offset-4 hover:underline",
						children: "Web app manifest"
					}) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/privacy",
					className: "font-medium text-primary underline-offset-4 hover:underline",
					children: "Privacy"
				}),
				" · ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/support",
					className: "font-medium text-primary underline-offset-4 hover:underline",
					children: "Support"
				})
			] })
		]
	});
}
//#endregion
export { PlayPage as component };
