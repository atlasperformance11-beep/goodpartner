import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { N as useAppStore } from "./store-C7z6kliX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route$1 } from "./router-DVeLkr-O.mjs";
import { n as confirmCheckout, t as canUnlockFromPaidFlag } from "./checkout-Ao527YX7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/unlock-tppDrdBD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UnlockPage() {
	const { session_id, paid } = Route$1.useSearch();
	const unlock = useAppStore((s) => s.unlock);
	const navigate = useNavigate();
	const [status, setStatus] = (0, import_react.useState)("working");
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function run() {
			if (session_id) {
				const result = await confirmCheckout({ data: { sessionId: session_id } });
				if (cancelled) return;
				if (result.paid) {
					unlock();
					setStatus("ok");
					toast.success("You're in. Lifetime unlock on this device.");
					navigate({ to: "/" });
					return;
				}
				setStatus("fail");
				toast.error("Stripe did not confirm that payment.");
				return;
			}
			if (paid) {
				const allowed = await canUnlockFromPaidFlag();
				if (cancelled) return;
				if (allowed) {
					unlock();
					setStatus("ok");
					toast.success("You're in. Lifetime unlock on this device.");
					navigate({ to: "/" });
					return;
				}
			}
			setStatus("fail");
		}
		run();
		return () => {
			cancelled = true;
		};
	}, [
		session_id,
		paid,
		unlock,
		navigate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
				children: "Good Partner"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-display tracking-tight",
				children: status === "fail" ? "Payment not confirmed" : "Unlocking…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: status === "fail" ? "If you were charged, wait a moment and open this page from your Stripe receipt. Your journal is still on this device." : "Checking Stripe, then we’ll open the journal."
			})
		]
	});
}
//#endregion
export { UnlockPage as component };
