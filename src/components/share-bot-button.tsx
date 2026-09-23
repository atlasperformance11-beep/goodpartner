import { useState } from "react";
import { Bot } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { buildBotBrief } from "@/lib/bot-brief";
import { shareWithGrokBot } from "@/lib/share-bot";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ShareWithBotButton({
  className,
  label = "Share with a Grok Bot",
  variant = "outline",
  size = "default",
}: {
  className?: string;
  label?: string;
  variant?: "outline" | "default" | "secondary" | "ghost";
  size?: "default" | "sm";
}) {
  const [busy, setBusy] = useState(false);

  async function share() {
    const s = useAppStore.getState();
    const text = buildBotBrief({
      partner: s.partner,
      dates: s.dates,
      ideas: s.ideas,
      gestures: s.gestures,
      quality: s.quality,
      rituals: s.rituals,
      intention: s.intention,
      weeklyGoal: s.weeklyGoal,
    });
    setBusy(true);
    try {
      const result = await shareWithGrokBot(text);
      if (result === "shared") {
        toast.success("If you picked Grok Bot, it has this brief.");
      } else if (result === "copied") {
        toast.success("Brief copied. Paste it into a Grok Bot chat.");
      } else if (result === "failed") {
        toast.error("Could not share that brief.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(className)}
      disabled={busy}
      data-bot="share-with-grok"
      onClick={() => void share()}
    >
      <Bot className="size-4" strokeWidth={1.75} />
      {busy ? "Preparing…" : label}
    </Button>
  );
}
