import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import {
  APP_AGE_RATING,
  APP_ANDROID_PACKAGE,
  APP_NAME,
  APP_PLAY_RATING,
  APP_PRICE_LABEL,
  APP_VERSION,
} from "@/lib/app-meta";

export const Route = createFileRoute("/support")({ component: SupportPage });

function SupportPage() {
  return (
    <LegalPage title="Support" updated="September 21, 2026">
      <p>
        {APP_NAME} {APP_VERSION} · Age {APP_AGE_RATING} / Play {APP_PLAY_RATING} · One-time{" "}
        {APP_PRICE_LABEL} unlock through Stripe. No subscription, no ads. Android package{" "}
        {APP_ANDROID_PACKAGE}.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">Install on Android</h2>
      <p>
        Open the site in Chrome, tap the three-dot menu, then Install app (or Add to Home
        screen). It opens full screen with its own icon. The Google Play listing uses a signed
        Android App Bundle wrapping this site — listing copy, Data Safety, and the bundle live on{" "}
        <Link to="/play" className="font-medium text-primary underline-offset-4 hover:underline">
          Play listing
        </Link>
        .
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">Install on iPhone</h2>
      <p>
        This release is a Home Screen web app, not a binary from the App Store. Open it in
        Safari, tap Share, then Add to Home Screen. It will open full screen with its own
        icon. A native App Store build still requires an Apple Developer account and a
        signed wrapper — that step happens in Xcode, not here.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">Buying and refunds</h2>
      <p>
        Unlock is {APP_PRICE_LABEL} once. On the website it is paid on Stripe. Inside the
        Google Play app it is paid with Google Play Billing (product {APP_ANDROID_PACKAGE} /
        lifetime_unlock). It unlocks this browser / Home Screen only — there is no cloud copy.
        If you were charged twice or the journal did not unlock, reply to the Stripe receipt
        or use Play’s subscription & purchases. Refunds are handled there.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">If something is missing</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Today is empty — add their name from the first screen, or load the sample journal.</li>
        <li>A date did not remind you — open Us → Reminders and turn them on. For a lock-screen banner, add the app to the Home Screen, open it from the icon, and allow alerts. On Dates, set “Start reminding.”</li>
        <li>Spark did not return ideas — try again when you have a connection. Fallback ideas still appear.</li>
        <li>The journal vanished — it is stored only in this browser. Clearing site data or a different device will look empty.</li>
      </ul>

      <h2 className="font-display text-lg tracking-tight text-foreground">Grok Bot</h2>
      <p>
        Today or Us → Share with a Grok Bot. On iPhone, choose Grok Bot in the share sheet. The
        brief includes the name, upcoming dates, and open ideas already in the journal — nothing
        else, and nothing until you send it. The Bot skill is also at /bot.md.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">Move or erase your data</h2>
      <p>
        Us → This device → Export journal saves a JSON file. Import puts it back. Delete
        journal removes every entry on this device and cannot be undone.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">Privacy</h2>
      <p>
        Read the{" "}
        <Link to="/privacy" className="font-medium text-primary underline-offset-4 hover:underline">
          privacy policy
        </Link>
        . Journal data is not sold. Stripe sees the payment. Spark is the only other
        network call, and only when you ask for it.
      </p>
    </LegalPage>
  );
}
