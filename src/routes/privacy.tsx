import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { APP_NAME } from "@/lib/app-meta";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="September 21, 2026">
      <p>
        {APP_NAME} is a journal that lives on the device in front of you. There is no account,
        no cloud sync, and no advertising. This page is the privacy policy you can use for
        App Store Connect and Google Play Data Safety.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">What we store</h2>
      <p>
        The name, dates, ideas, rituals, and notes you enter are saved in this browser’s
        local storage. They never leave the device unless you export them or tap Spark ideas.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">What we do not collect</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>No sign-in, email, or phone number</li>
        <li>No location, contacts, photos, or microphone</li>
        <li>No analytics, crash reports, or advertising identifiers</li>
        <li>No tracking across other apps or websites</li>
      </ul>

      <h2 className="font-display text-lg tracking-tight text-foreground">Spark ideas</h2>
      <p>
        Spark is optional and only runs when you tap the button. That request sends the
        first name, likes, love languages, upcoming dates, and recent gestures you have
        already typed, so Grok can suggest something specific. It is not sent on launch,
        on a timer, or in the background. If you do not want that, do not tap Spark.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">Reminders</h2>
      <p>
        Optional alerts stay on this device. In-app banners work without extra permission.
        Phone banners use the browser’s notification permission, only after you allow them,
        and never leave the phone. You can turn them off on the Us tab. They are not push
        messages from a server.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">Your controls</h2>
      <p>
        On the Us tab you can export a JSON copy of the journal, import one back, share a private
        brief with a Grok Bot, or delete everything on this device. Sharing sends only what you
        choose to hand over. Deleting cannot be undone. Uninstalling the Home Screen
        icon or clearing this site’s data also removes the journal.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">Payments</h2>
      <p>
        The lifetime unlock is a one-time charge. On the website and Chrome install it is
        processed by Stripe. Inside the Google Play app it is processed by Google Play Billing.
        We never see or store your card number. Paying does not create an account here; the
        journal still lives only on this device.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">Children</h2>
      <p>
        {APP_NAME} is rated 4+ / Google Play Everyone and does not target children. It does not collect personal
        information as Apple defines it in Guideline 5.1.3 or as Google defines it in Families Policy.
        There is no social graph and no user-generated public content.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">Google Play Data safety</h2>
      <p>
        We do not collect account data. Optional Spark requests go to xAI. Optional checkout
        goes to Stripe on the web, or Google Play Billing inside the Play Store app. Nothing
        is sold. You can export or delete the journal on the Us tab.
        The Play Console form is filled out on the{" "}
        <Link to="/play" className="font-medium text-primary underline-offset-4 hover:underline">
          Play listing
        </Link>{" "}
        page.
      </p>

      <h2 className="font-display text-lg tracking-tight text-foreground">Contact</h2>
      <p>
        There is no server-side account to write to. Questions about data on this device
        are answered in Support. If Spark is unavailable, nothing is stored remotely on
        your behalf.
      </p>
    </LegalPage>
  );
}
