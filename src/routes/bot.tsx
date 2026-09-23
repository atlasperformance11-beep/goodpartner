import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { ShareWithBotButton } from "@/components/share-bot-button";
import { APP_NAME, APP_ORIGIN } from "@/lib/app-meta";

export const Route = createFileRoute("/bot")({ component: BotPage });

function BotPage() {
  return (
    <LegalPage title="For a Grok Bot" updated="September 22, 2026">
      <p>
        {APP_NAME} can hand a private brief to a Grok Bot. On iPhone, the share sheet lists
        Grok Bot. On the web, the brief is copied so you can paste it into a Bot chat. Nothing
        is sent until you share.
      </p>
      <ShareWithBotButton className="w-full sm:w-auto" />
      <h2 className="font-display text-lg tracking-tight text-foreground">What the Bot receives</h2>
      <p>
        Their name, the likes and sizes you typed, dates in the next 90 days, open ideas, and
        rituals that are due. It also gets a link to the skill at {APP_ORIGIN}/bot.md so the Bot
        knows not to publish the journal or invent a birthday.
      </p>
      <h2 className="font-display text-lg tracking-tight text-foreground">What stays here</h2>
      <p>
        The journal still lives only on this device. A Grok Bot does not get a login, your
        Stripe receipt, or a standing copy. Share again when the dates change.
      </p>
    </LegalPage>
  );
}
