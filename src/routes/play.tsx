import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { CopyBlock } from "@/components/copy-block";
import {
  APP_ANDROID_PACKAGE,
  APP_NAME,
  APP_PLAY_RATING,
  APP_PLAY_SKU,
  APP_PRICE_LABEL,
  APP_SHORT_DESCRIPTION,
  APP_UPLOAD_SHA256,
  APP_VERSION,
} from "@/lib/app-meta";
import {
  PLAY_ASSETLINKS_NOTE,
  PLAY_CONTENT_RATING,
  PLAY_DATA_SAFETY,
  PLAY_FULL_DESCRIPTION,
  PLAY_IAP_CONSOLE,
  PLAY_IAP_DESCRIPTION,
  PLAY_IAP_TITLE,
  PLAY_PRIVACY_URL,
  PLAY_PWABUILDER,
  PLAY_SUPPORT_URL,
} from "@/lib/play-listing";

export const Route = createFileRoute("/play")({ component: PlayPage });

function PlayPage() {
  return (
    <LegalPage title="Google Play listing" updated="September 21, 2026">
      <p>
        {APP_NAME} {APP_VERSION} is wrapped as a Trusted Web Activity with Play Billing on, Digital
        Asset Links published, and listing copy ready to paste. Google still sells the developer
        seat only to you.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">What’s already done</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          Trusted Web Activity for package {APP_ANDROID_PACKAGE}, target Android 16, Play Billing
          and notification delegation on. Upload that App Bundle in Play Console after you open
          the developer account.
        </li>
        <li>
          Digital Asset Links lists the upload-key SHA-256 ({APP_UPLOAD_SHA256.slice(0, 11)}…) so
          a locally signed build can open full screen.
        </li>
        <li>
          Inside the Play app, Unlock charges {APP_PRICE_LABEL} through Google Play Billing (product{" "}
          {APP_PLAY_SKU}). Chrome and iPhone still use Stripe.
        </li>
      </ul>

      <h2 className="font-display text-lg tracking-tight text-foreground">What Play still needs from you</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          Open a Google Play developer account — $25 once, under your Google identity. Google
          will not sell that seat to anyone else.
        </li>
        <li>
          Create the app with package {APP_ANDROID_PACKAGE}. Publish this site first so Digital
          Asset Links and the maskable icon are live, then upload the signed App Bundle{" "}
          <a
            href="/store/good-partner.aab"
            className="font-medium text-primary underline-offset-4 hover:underline"
            download="good-partner-1.0.0.aab"
          >
            good-partner.aab
          </a>
          . PWABuilder settings below are the fallback if you wrap again later.
        </li>
        <li>
          After the first upload, open App integrity, copy the <span className="font-medium">app
          signing</span> SHA-256, and send it back here. Play re-signs the store build; that
          fingerprint has to sit next to the upload key or Chrome shows an address bar.
        </li>
        <li>
          Monetize → In-app products → create {APP_PLAY_SKU} as a managed one-time product at{" "}
          {APP_PRICE_LABEL} and activate it. Play rejects a paid unlock that goes around their
          billing inside the listing.
        </li>
      </ol>

      <h2 className="font-display text-lg tracking-tight text-foreground">Store listing</h2>
      <CopyBlock label="App name" value={APP_NAME} />
      <CopyBlock label="Short description" value={APP_SHORT_DESCRIPTION} />
      <CopyBlock label="Full description" value={PLAY_FULL_DESCRIPTION} />
      <p>
        <span className="font-medium">Category.</span> Lifestyle · Productivity
        <br />
        <span className="font-medium">Content rating.</span> {APP_PLAY_RATING}
        <br />
        <span className="font-medium">Package name.</span> {APP_ANDROID_PACKAGE}
        <br />
        <span className="font-medium">Privacy.</span>{" "}
        <a href={PLAY_PRIVACY_URL} className="font-medium text-primary underline-offset-4 hover:underline">
          {PLAY_PRIVACY_URL}
        </a>
        <br />
        <span className="font-medium">Support.</span>{" "}
        <a href={PLAY_SUPPORT_URL} className="font-medium text-primary underline-offset-4 hover:underline">
          {PLAY_SUPPORT_URL}
        </a>
      </p>
      <CopyBlock label="IARC / content rating" value={PLAY_CONTENT_RATING} />

      <h2 className="font-display text-lg tracking-tight text-foreground">In-app product</h2>
      <p>
        Name {PLAY_IAP_TITLE}. {PLAY_IAP_DESCRIPTION}
      </p>
      <CopyBlock label="Play Console product" value={PLAY_IAP_CONSOLE} />

      <h2 className="font-display text-lg tracking-tight text-foreground">Data safety</h2>
      <CopyBlock label="Data safety answers" value={PLAY_DATA_SAFETY} />

      <h2 className="font-display text-lg tracking-tight text-foreground">Digital Asset Links</h2>
      <CopyBlock label="Upload-key fingerprint" value={PLAY_ASSETLINKS_NOTE} />
      <p>
        Live file:{" "}
        <a
          href="/.well-known/assetlinks.json"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          /.well-known/assetlinks.json
        </a>
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">PWABuilder settings</h2>
      <p>
        If you wrap on the web instead of uploading the App Bundle from this project, paste these
        values. Turn Google Play billing on. After you publish this site, the maskable icon and
        manifest URLs will resolve.
      </p>
      <CopyBlock label="PWABuilder" value={PLAY_PWABUILDER} />

      <h2 className="font-display text-lg tracking-tight text-foreground">Assets to upload</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <a
            href="/store/good-partner.aab"
            className="font-medium text-primary underline-offset-4 hover:underline"
            download="good-partner-1.0.0.aab"
          >
            Android App Bundle
          </a>{" "}
          — signed, Play Billing on, upload this in Play Console
        </li>
        <li>
          <a
            href="/store/feature-graphic.png"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Feature graphic
          </a>{" "}
          — 1024×500
        </li>
        <li>
          <a href="/icon-512.png" className="font-medium text-primary underline-offset-4 hover:underline">
            High-res icon
          </a>{" "}
          — 512×512
        </li>
        <li>
          <a
            href="/store/phone-today.png"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Phone screenshot — Today
          </a>
        </li>
        <li>
          <a
            href="/store/phone-dates.png"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Phone screenshot — Dates
          </a>
        </li>
        <li>
          <a
            href="/store/phone-ideas.png"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Phone screenshot — Ideas
          </a>
        </li>
        <li>
          <a
            href="/store/phone-unlock.png"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Phone screenshot — Unlock
          </a>
        </li>
        <li>
          <a
            href="/manifest.webmanifest"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Web app manifest
          </a>
        </li>
      </ul>

      <p>
        <Link to="/privacy" className="font-medium text-primary underline-offset-4 hover:underline">
          Privacy
        </Link>
        {" · "}
        <Link to="/support" className="font-medium text-primary underline-offset-4 hover:underline">
          Support
        </Link>
      </p>
    </LegalPage>
  );
}
