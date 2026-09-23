import { getRequest } from "@tanstack/react-start/server";
import {
  APP_NAME,
  APP_ORIGIN,
  APP_PAYMENT_LINK,
  APP_PRICE_CENTS,
  APP_TAGLINE,
} from "./app-meta";
import { env } from "./env.server";

export type PayConfig = {
  configured: boolean;
  mode: "checkout" | "link" | "off";
  priceLabel: string;
};

function paymentLink(): string | undefined {
  return env("STRIPE_PAYMENT_LINK") || APP_PAYMENT_LINK || undefined;
}

export function payConfig(): PayConfig {
  if (env("STRIPE_SECRET_KEY")) {
    return { configured: true, mode: "checkout", priceLabel: "$19" };
  }
  if (paymentLink()) {
    return { configured: true, mode: "link", priceLabel: "$19" };
  }
  return { configured: false, mode: "off", priceLabel: "$19" };
}

/** Only Payment Links cannot verify a Checkout Session, so `?paid=1` is allowed there. */
export function honorPaidQuery(): boolean {
  return payConfig().mode === "link";
}

function publicOrigin(): string {
  const req = getRequest();
  const forwarded = req?.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const hostHeader = req?.headers.get("host")?.trim();
  const envHost = env("VITE_PUBLIC_HOSTNAME");
  const host = forwarded || envHost || hostHeader || "";
  if (!host) return APP_ORIGIN;
  const proto =
    req?.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
    (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function createCheckoutUrl(): Promise<
  { ok: true; url: string } | { ok: false; error: string; reason: "off" | "stripe" }
> {
  const origin = publicOrigin() || APP_ORIGIN;
  const link = paymentLink();
  const secret = env("STRIPE_SECRET_KEY");

  if (!secret && link) {
    return { ok: true, url: link };
  }
  if (!secret) {
    return { ok: false, error: "Stripe is not connected yet", reason: "off" };
  }

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
  body.set(
    "line_items[0][price_data][product_data][description]",
    `${APP_TAGLINE} Lifetime unlock on this device. No subscription.`,
  );
  body.set("line_items[0][price_data][product_data][metadata][app]", "good-partner");

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const json = (await res.json()) as { id?: string; url?: string; error?: { message?: string } };
  if (!res.ok || !json.url) {
    return {
      ok: false,
      error: json.error?.message || `Stripe error ${res.status}`,
      reason: "stripe",
    };
  }
  return { ok: true, url: json.url };
}

export async function sessionIsPaid(sessionId: string): Promise<boolean> {
  const secret = env("STRIPE_SECRET_KEY");
  if (!secret || !sessionId.startsWith("cs_")) return false;
  const res = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    { headers: { Authorization: `Bearer ${secret}` } },
  );
  if (!res.ok) return false;
  const json = (await res.json()) as { payment_status?: string };
  return json.payment_status === "paid";
}
