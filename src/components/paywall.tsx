import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mark } from "@/components/mark";
import { startCheckout } from "@/lib/checkout";
import { playBillingAvailable, purchasePlayUnlock } from "@/lib/play-billing";
import { APP_PRICE_LABEL } from "@/lib/app-meta";
import { useAppStore } from "@/lib/store";

const INCLUDED = [
  "Birthdays, anniversaries, and the dates that sneak up",
  "Gift and date ideas, tied to the occasion",
  "Little-thing rituals and a weekly quality-time goal",
  "Spark ideas when you need a nudge — optional, on tap",
];

export function Paywall() {
  const unlock = useAppStore((s) => s.unlock);
  const resetDemo = useAppStore((s) => s.resetDemo);
  const [busy, setBusy] = useState(false);
  const [viaPlay, setViaPlay] = useState(false);

  useEffect(() => {
    void playBillingAvailable().then(setViaPlay);
  }, []);

  async function buy() {
    setBusy(true);
    try {
      const play = await purchasePlayUnlock();
      if (play === "purchased" || play === "owned") {
        unlock();
        toast.success(
          play === "owned"
            ? "Google Play already has this unlock. You're in."
            : "You're in. Lifetime unlock on this device.",
        );
        return;
      }
      if (play === "cancelled") return;
      if (play === "failed") {
        toast.error("Google Play could not complete that purchase.");
        return;
      }

      const result = await startCheckout();
      if (result.ok) {
        window.location.assign(result.url);
        return;
      }
      if (result.reason === "off") {
        unlock();
        toast.message("Unlocked on this device. Connect Stripe to take real payments.");
        return;
      }
      toast.error(result.error);
    } catch {
      toast.error("Could not start checkout");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8 pt-4 md:pt-12">
      <div>
        <div className="flex items-center gap-2.5">
          <Mark className="size-8 text-primary" />
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Good Partner
          </p>
        </div>
        <h1 className="mt-4 font-display text-display tracking-tight">
          Never forget the little things.
        </h1>
        <p className="mt-3 text-muted-foreground">
          A quiet journal for dates, gestures, and quality time. Pay once. It lives on this
          phone — no account, no subscription.
        </p>
      </div>

      <Card className="flex flex-col gap-5 p-5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-display text-2xl tracking-tight">Lifetime unlock</p>
          <p className="font-display text-2xl tracking-tight tabular-nums">{APP_PRICE_LABEL}</p>
        </div>
        <ul className="flex flex-col gap-2.5 text-sm text-foreground/90">
          {INCLUDED.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
              <span className="leading-relaxed">{line}</span>
            </li>
          ))}
        </ul>
        <Button onClick={() => void buy()} disabled={busy} className="w-full">
          {busy
            ? viaPlay
              ? "Opening Google Play…"
              : "Sending you to checkout…"
            : viaPlay
              ? `Unlock on Google Play — ${APP_PRICE_LABEL}`
              : `Unlock for ${APP_PRICE_LABEL}`}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          {viaPlay
            ? "One payment through Google Play. Restore works if you reinstall from the same account."
            : "One payment through Stripe. Card details never touch this app. From the Play Store app, this button uses Google Play Billing."}
        </p>
      </Card>

      <button
        type="button"
        className="min-h-11 text-left text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        onClick={() => {
          resetDemo();
          toast.success("Sample journal — preview only");
        }}
      >
        Or preview with a sample journal
      </button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        <Link to="/privacy" className="font-medium text-primary underline-offset-4 hover:underline">
          Privacy
        </Link>
        {" · "}
        <Link to="/support" className="font-medium text-primary underline-offset-4 hover:underline">
          Support
        </Link>
        {" · "}
        <Link to="/play" className="font-medium text-primary underline-offset-4 hover:underline">
          Play listing
        </Link>
      </p>
    </div>
  );
}
