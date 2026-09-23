import { c as APP_TAGLINE, n as APP_NAME, o as APP_PRICE_CENTS, r as APP_ORIGIN } from "./app-meta-DYIgFBD-.mjs";
import { i as getRequest } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stripe.server-DM-tbYt4.js
function env(key) {
	return process.env[key]?.trim() || void 0;
}
function paymentLink() {
	return env("STRIPE_PAYMENT_LINK") || "https://buy.stripe.com/test_aFa28qdC285e4qpciw9MY00";
}
function payConfig() {
	if (env("STRIPE_SECRET_KEY")) return {
		configured: true,
		mode: "checkout",
		priceLabel: "$19"
	};
	if (paymentLink()) return {
		configured: true,
		mode: "link",
		priceLabel: "$19"
	};
	return {
		configured: false,
		mode: "off",
		priceLabel: "$19"
	};
}
/** Only Payment Links cannot verify a Checkout Session, so `?paid=1` is allowed there. */
function honorPaidQuery() {
	return payConfig().mode === "link";
}
function publicOrigin() {
	const req = getRequest();
	const forwarded = req?.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
	const hostHeader = req?.headers.get("host")?.trim();
	const envHost = env("VITE_PUBLIC_HOSTNAME");
	const host = forwarded || envHost || hostHeader || "";
	if (!host) return APP_ORIGIN;
	return `${req?.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https")}://${host}`;
}
async function createCheckoutUrl() {
	const origin = publicOrigin() || "https://goodpartner.grok.me";
	const link = paymentLink();
	const secret = env("STRIPE_SECRET_KEY");
	if (!secret && link) return {
		ok: true,
		url: link
	};
	if (!secret) return {
		ok: false,
		error: "Stripe is not connected yet",
		reason: "off"
	};
	const body = new URLSearchParams();
	body.set("mode", "payment");
	body.set("success_url", `${origin}/unlock?session_id={CHECKOUT_SESSION_ID}`);
	body.set("cancel_url", `${origin}/`);
	body.set("allow_promotion_codes", "true");
	body.set("submit_type", "pay");
	body.set("billing_address_collection", "auto");
	body.set("customer_creation", "if_required");
	body.set("client_reference_id", "good-partner-lifetime");
	body.set("metadata[app]", "good-partner");
	body.set("metadata[product]", "lifetime_unlock");
	body.set("payment_intent_data[description]", `${APP_NAME} lifetime unlock`);
	body.set("payment_intent_data[metadata][app]", "good-partner");
	body.set("line_items[0][quantity]", "1");
	body.set("line_items[0][price_data][currency]", "usd");
	body.set("line_items[0][price_data][unit_amount]", String(APP_PRICE_CENTS));
	body.set("line_items[0][price_data][product_data][name]", APP_NAME);
	body.set("line_items[0][price_data][product_data][description]", `${APP_TAGLINE} Lifetime unlock on this device. No subscription.`);
	body.set("line_items[0][price_data][product_data][metadata][app]", "good-partner");
	const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${secret}`,
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body
	});
	const json = await res.json();
	if (!res.ok || !json.url) return {
		ok: false,
		error: json.error?.message || `Stripe error ${res.status}`,
		reason: "stripe"
	};
	return {
		ok: true,
		url: json.url
	};
}
async function sessionIsPaid(sessionId) {
	const secret = env("STRIPE_SECRET_KEY");
	if (!secret || !sessionId.startsWith("cs_")) return false;
	const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, { headers: { Authorization: `Bearer ${secret}` } });
	if (!res.ok) return false;
	return (await res.json()).payment_status === "paid";
}
//#endregion
export { createCheckoutUrl, honorPaidQuery, payConfig, sessionIsPaid };
