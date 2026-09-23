import { i as __toESM } from "../_runtime.mjs";
import { a as APP_PLAY_SKU } from "./app-meta-DYIgFBD-.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, l as Dialog$1, m as DialogPortal$1, p as DialogOverlay$1, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D19HL7Cl.mjs";
import { A as shouldPromptAndroidInstall, I as Button, N as useAppStore, _ as isStandaloneDisplay, h as isAndroidDevice, j as shouldPromptHomeScreen, s as dispatchDueNotices, t as INSTALL_DISMISS_KEY } from "./store-C7z6kliX.mjs";
import { a as Smartphone, c as House, h as Calendar, l as Gift, n as UserRound, o as Share, r as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Provider } from "../_libs/radix-ui__react-tooltip.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dialog-CpRaMEqD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card",
		className: cn("rounded-xl bg-card text-card-foreground shadow-[var(--shadow-card)]", className),
		...props
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-[overlay-in_250ms_var(--ease-smooth-out)]", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed left-1/2 top-1/2 z-50 grid w-[min(calc(100%-1.5rem),28rem)] max-h-[min(88dvh,40rem)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-2xl bg-card p-6 text-card-foreground shadow-[var(--shadow-float)] data-[state=open]:animate-[dialog-in_250ms_var(--ease-smooth-out)]", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-8", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DVeLkr-O.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		fill: "none",
		"aria-hidden": "true",
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "9",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10.5 19.5c0-5.2 3.4-9 5.5-9s5.5 3.8 5.5 9c0 2.4-1.2 4-2.6 4.8-.8.5-1.8.7-2.9.7s-2.1-.2-2.9-.7c-1.4-.8-2.6-2.4-2.6-4.8Z",
				fill: "var(--color-primary-foreground)",
				opacity: "0.95"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 8.5c.2 2.2-.2 4.4-1.4 6.2",
				stroke: "var(--color-primary)",
				strokeWidth: "1.4",
				strokeLinecap: "round"
			})
		]
	});
}
var deferred = null;
var listeners = /* @__PURE__ */ new Set();
function emit() {
	for (const fn of listeners) fn();
}
function captureInstallPrompt(event) {
	event.preventDefault();
	deferred = event;
	emit();
}
function clearInstallPrompt() {
	deferred = null;
	emit();
}
function hasInstallPrompt() {
	return deferred !== null;
}
function subscribeInstallPrompt(fn) {
	listeners.add(fn);
	return () => listeners.delete(fn);
}
async function promptInstall() {
	if (!deferred) return "unavailable";
	const event = deferred;
	deferred = null;
	emit();
	await event.prompt();
	const { outcome } = await event.userChoice;
	return outcome;
}
var IOS_STEPS = [
	"Open this page in Safari on iPhone or iPad.",
	"Tap the Share button in the toolbar.",
	"Scroll to Add to Home Screen, then tap Add."
];
var ANDROID_STEPS = [
	"Open this page in Chrome on your Android phone.",
	"Tap the three-dot menu in the corner.",
	"Tap Install app or Add to Home screen, then Install."
];
function InstallSteps({ compact = false, platform = "ios" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: compact ? "flex flex-col gap-2 text-sm" : "flex flex-col gap-3 text-sm",
		children: (platform === "android" ? ANDROID_STEPS : IOS_STEPS).map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sage-soft text-xs font-medium text-primary tabular-nums",
				children: i + 1
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "leading-relaxed text-foreground/90",
				children: step
			})]
		}, step))
	});
}
function InstallDialog({ open, onOpenChange }) {
	const [canPrompt, setCanPrompt] = (0, import_react.useState)(false);
	const android = typeof navigator !== "undefined" && isAndroidDevice();
	(0, import_react.useEffect)(() => {
		setCanPrompt(hasInstallPrompt());
		return subscribeInstallPrompt(() => setCanPrompt(hasInstallPrompt()));
	}, [open]);
	async function install() {
		const result = await promptInstall();
		if (result === "accepted") {
			toast.success("Installed on this phone");
			onOpenChange(false);
			return;
		}
		if (result === "dismissed") return;
		toast.message("Use Chrome’s menu → Install app");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Keep it on your phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Full screen, own icon, no browser chrome. A Google Play listing still needs a signed Android App Bundle from Play Console." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Android"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallSteps, { platform: "android" })
					}),
					canPrompt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3 w-full",
						onClick: () => void install(),
						children: "Install on this phone"
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "iPhone"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallSteps, { platform: "ios" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-3 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/?install=1&platform=ios",
							children: "Show the iPhone visual guide"
						})
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: android ? "Your journal stays on this device. Installing does not create an account." : "Your journal stays on this device. Adding it to the Home Screen does not create an account."
			})
		] })
	});
}
function InstallNowButton({ className }) {
	const [can, setCan] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setCan(hasInstallPrompt());
		return subscribeInstallPrompt(() => setCan(hasInstallPrompt()));
	}, []);
	if (!can) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		className: cn("w-full", className),
		onClick: () => {
			promptInstall().then((result) => {
				if (result === "accepted") toast.success("Installed on this phone");
			});
		},
		children: "Install on this phone"
	});
}
function InstallBanner({ offsetNav = true }) {
	const [show, setShow] = (0, import_react.useState)(false);
	const [android, setAndroid] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (isStandaloneDisplay()) return;
		if (window.localStorage.getItem("good-partner-install-dismissed") === "1") return;
		if (shouldPromptHomeScreen()) {
			setAndroid(false);
			setShow(true);
			return;
		}
		if (shouldPromptAndroidInstall()) {
			setAndroid(true);
			setShow(true);
		}
	}, []);
	if (!show) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pointer-events-none fixed inset-x-0 z-20 px-3 md:bottom-6 md:left-56", offsetNav ? "bottom-[calc(3.75rem+env(safe-area-inset-bottom))]" : "bottom-[max(1rem,env(safe-area-inset-bottom))]"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "pointer-events-auto mx-auto flex max-w-lg items-start gap-3 rounded-xl p-3 shadow-[var(--shadow-float)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-sage-soft text-primary",
					children: android ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {
						className: "size-4",
						strokeWidth: 1.75
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share, {
						className: "size-4",
						strokeWidth: 1.75
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Keep it on your Home Screen"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs leading-relaxed text-muted-foreground",
						children: android ? "Chrome menu → Install app. Opens full screen, like any other app." : "Share → Add to Home Screen. Opens full screen, no Safari chrome."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					className: "shrink-0",
					onClick: () => {
						window.localStorage.setItem(INSTALL_DISMISS_KEY, "1");
						setShow(false);
					},
					children: "Dismiss"
				})
			]
		})
	});
}
function NotifyWatcher() {
	const enabled = useAppStore((s) => s.notifications.enabled);
	const prefs = useAppStore((s) => s.notifications);
	const firstName = useAppStore((s) => s.partner.nickname || s.partner.name.split(" ")[0] || "");
	const dates = useAppStore((s) => s.dates);
	const rituals = useAppStore((s) => s.rituals);
	const quality = useAppStore((s) => s.quality);
	const weeklyGoal = useAppStore((s) => s.weeklyGoal);
	const partnerName = useAppStore((s) => s.partner.name);
	(0, import_react.useEffect)(() => {
		if (!enabled || !partnerName.trim()) return;
		const run = () => {
			if (document.visibilityState === "hidden") return;
			dispatchDueNotices({
				prefs,
				firstName,
				dates,
				rituals,
				quality,
				weeklyGoal
			}).then((fallback) => {
				if (fallback.length === 0) return;
				if (fallback.length === 1) {
					toast(fallback[0].title, {
						description: fallback[0].body,
						duration: 6e3
					});
					return;
				}
				toast(`${fallback.length} reminders`, {
					description: fallback.map((n) => n.title).join(" · "),
					duration: 7e3
				});
			});
		};
		run();
		const id = window.setInterval(run, 9e5);
		document.addEventListener("visibilitychange", run);
		return () => {
			window.clearInterval(id);
			document.removeEventListener("visibilitychange", run);
		};
	}, [
		enabled,
		prefs,
		firstName,
		dates,
		rituals,
		quality,
		weeklyGoal,
		partnerName
	]);
	return null;
}
function PwaRegister() {
	(0, import_react.useEffect)(() => {
		const onPrompt = (event) => captureInstallPrompt(event);
		const onInstalled = () => clearInstallPrompt();
		window.addEventListener("beforeinstallprompt", onPrompt);
		window.addEventListener("appinstalled", onInstalled);
		if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
		return () => {
			window.removeEventListener("beforeinstallprompt", onPrompt);
			window.removeEventListener("appinstalled", onInstalled);
		};
	}, []);
	return null;
}
var PLAY_BILLING = "https://play.google.com/billing";
function goodsApi() {
	return window.getDigitalGoodsService;
}
async function playBillingService() {
	if (typeof window === "undefined") return null;
	const get = goodsApi();
	if (!get) return null;
	try {
		return await get(PLAY_BILLING) ?? null;
	} catch {
		return null;
	}
}
async function playBillingAvailable() {
	return await playBillingService() !== null;
}
function ownsUnlock(purchases) {
	return purchases.some((p) => p.itemId === APP_PLAY_SKU);
}
async function restorePlayUnlock() {
	const service = await playBillingService();
	if (!service) return false;
	try {
		return ownsUnlock(await service.listPurchases());
	} catch {
		return false;
	}
}
async function purchasePlayUnlock() {
	const service = await playBillingService();
	if (!service) return "unavailable";
	try {
		if (ownsUnlock(await service.listPurchases())) return "owned";
	} catch {}
	const request = new PaymentRequest([{
		supportedMethods: PLAY_BILLING,
		data: {
			sku: APP_PLAY_SKU,
			itemId: APP_PLAY_SKU
		}
	}], { total: {
		label: `Good Partner \$19`,
		amount: {
			currency: "USD",
			value: "0"
		}
	} });
	try {
		const response = await request.show();
		const details = response.details;
		const token = details.purchaseToken || details.token;
		if (token && typeof service.acknowledge === "function") try {
			await service.acknowledge(token, "onetime");
		} catch {}
		await response.complete("success");
		try {
			if (ownsUnlock(await service.listPurchases())) return "purchased";
		} catch {}
		return "purchased";
	} catch (err) {
		if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
		return "failed";
	}
}
/** If they already paid on Google Play, unlock this install. */
function PlayRestore() {
	const unlocked = useAppStore((s) => s.unlocked);
	const unlock = useAppStore((s) => s.unlock);
	(0, import_react.useEffect)(() => {
		if (unlocked) return;
		let cancelled = false;
		restorePlayUnlock().then((owned) => {
			if (!cancelled && owned) unlock();
		});
		return () => {
			cancelled = true;
		};
	}, [unlocked, unlock]);
	return null;
}
var NAV = [
	{
		to: "/",
		label: "Today",
		icon: House
	},
	{
		to: "/dates",
		label: "Dates",
		icon: Calendar
	},
	{
		to: "/ideas",
		label: "Ideas",
		icon: Gift
	},
	{
		to: "/us",
		label: "Us",
		icon: UserRound
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const partnerName = useAppStore((s) => s.partner.name);
	const unlocked = useAppStore((s) => s.unlocked);
	const previewingSample = useAppStore((s) => s.previewingSample);
	const showChrome = Boolean(partnerName.trim());
	const showPreviewBar = previewingSample && !unlocked;
	const legal = pathname === "/privacy" || pathname === "/support" || pathname === "/unlock" || pathname === "/play" || pathname === "/bot";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PwaRegister, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayRestore, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotifyWatcher, {}),
			showChrome ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-border bg-card/70 px-4 py-6 pt-[max(1.5rem,env(safe-area-inset-top))] md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-8 flex items-center gap-2.5 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-8 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg tracking-tight",
							children: "Good Partner"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col gap-1",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150", active ? "bg-sage-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									strokeWidth: 1.75
								}), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 text-xs leading-relaxed text-muted-foreground",
						children: "Never forget the little things."
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: showChrome ? "md:pl-56" : "",
				children: [showPreviewBar ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border bg-sage-soft px-4 py-2.5 text-center text-sm text-primary",
					children: [
						"Sample journal — preview only.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "font-medium underline-offset-4 hover:underline",
							onClick: () => {
								useAppStore.getState().resetEmpty();
							},
							children: "Unlock yours for $19"
						})
					]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("mx-auto w-full max-w-5xl px-4 pt-[max(1.5rem,env(safe-area-inset-top))]", showChrome ? "pb-28 md:px-8 md:pb-12 md:pt-10" : "pb-16 md:px-8", legal && "md:pt-10"),
					children
				})]
			}),
			showChrome ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-4",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium", active ? "text-primary" : "text-muted-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: active ? 2.1 : 1.75
							}), item.label]
						}) }, item.to);
					})
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallBanner, { offsetNav: showChrome })
		]
	});
}
function ClientGate({ children }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const finish = () => setReady(true);
		const unsub = useAppStore.persist.onFinishHydration(finish);
		if (useAppStore.persist.hasHydrated()) finish();
		else useAppStore.persist.rehydrate();
		const t = window.setTimeout(finish, 400);
		return () => {
			unsub();
			window.clearTimeout(t);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ready ? void 0 : "pointer-events-none",
		children
	});
}
function Toaster$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme: "light",
		className: "toaster group",
		visibleToasts: 3,
		offset: {
			bottom: "1.25rem",
			right: "1.25rem"
		},
		mobileOffset: { bottom: "5.75rem" },
		toastOptions: { classNames: {
			toast: "group toast bg-card text-foreground border-border shadow-[var(--shadow-float)] font-sans",
			description: "text-muted-foreground",
			actionButton: "bg-primary text-primary-foreground",
			cancelButton: "bg-muted text-foreground"
		} },
		...props
	});
}
function TooltipProvider({ delayDuration = 400, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration,
		...props
	});
}
var styles_default = "/assets/styles-BMNxqjwR.css";
var APP_NAME = "Good Partner";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Never forget the little things. A quiet journal for dates, gestures, and quality time."
			},
			{
				name: "theme-color",
				content: "#f3efe6"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$8 = () => import("./routes-01rfAnOj.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./bot-Dmm9TGh5.mjs");
var Route$7 = createFileRoute("/bot")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./dates-CUwmJcKg.mjs");
var Route$6 = createFileRoute("/dates")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./ideas-BNIBZVVD.mjs");
var Route$5 = createFileRoute("/ideas")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./play-34kcrMpZ.mjs");
var Route$4 = createFileRoute("/play")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./privacy-B9Ee0Jb4.mjs");
var Route$3 = createFileRoute("/privacy")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./support-B2Nsexjt.mjs");
var Route$2 = createFileRoute("/support")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./unlock-tppDrdBD.mjs");
var Route$1 = createFileRoute("/unlock")({
	validateSearch: (raw) => ({
		session_id: typeof raw.session_id === "string" ? raw.session_id : "",
		paid: raw.paid === "1" || raw.paid === true || raw.paid === "true"
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./us-Bh7loxMA.mjs");
var Route = createFileRoute("/us")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	BotRoute: Route$7.update({
		id: "/bot",
		path: "/bot",
		getParentRoute: () => Route$9
	}),
	DatesRoute: Route$6.update({
		id: "/dates",
		path: "/dates",
		getParentRoute: () => Route$9
	}),
	IdeasRoute: Route$5.update({
		id: "/ideas",
		path: "/ideas",
		getParentRoute: () => Route$9
	}),
	PlayRoute: Route$4.update({
		id: "/play",
		path: "/play",
		getParentRoute: () => Route$9
	}),
	PrivacyRoute: Route$3.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$9
	}),
	SupportRoute: Route$2.update({
		id: "/support",
		path: "/support",
		getParentRoute: () => Route$9
	}),
	UnlockRoute: Route$1.update({
		id: "/unlock",
		path: "/unlock",
		getParentRoute: () => Route$9
	}),
	UsRoute: Route.update({
		id: "/us",
		path: "/us",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { InstallDialog as a, Mark as c, DialogContent as d, DialogDescription as f, DialogTitle as h, purchasePlayUnlock as i, Card as l, DialogHeader as m, Route$1 as n, InstallNowButton as o, DialogFooter as p, playBillingAvailable as r, InstallSteps as s, router_exports as t, Dialog as u };
