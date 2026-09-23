import { useEffect } from "react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";
import { dispatchDueNotices } from "@/lib/notify";

export function NotifyWatcher() {
  const enabled = useAppStore((s) => s.notifications.enabled);
  const prefs = useAppStore((s) => s.notifications);
  const firstName = useAppStore((s) => s.partner.nickname || s.partner.name.split(" ")[0] || "");
  const dates = useAppStore((s) => s.dates);
  const rituals = useAppStore((s) => s.rituals);
  const quality = useAppStore((s) => s.quality);
  const weeklyGoal = useAppStore((s) => s.weeklyGoal);
  const partnerName = useAppStore((s) => s.partner.name);

  useEffect(() => {
    if (!enabled || !partnerName.trim()) return;

    const run = () => {
      if (document.visibilityState === "hidden") return;
      void dispatchDueNotices({
        prefs,
        firstName,
        dates,
        rituals,
        quality,
        weeklyGoal,
      }).then((fallback) => {
        if (fallback.length === 0) return;
        if (fallback.length === 1) {
          toast(fallback[0].title, { description: fallback[0].body, duration: 6000 });
          return;
        }
        toast(`${fallback.length} reminders`, {
          description: fallback.map((n) => n.title).join(" · "),
          duration: 7000,
        });
      });
    };

    run();
    const id = window.setInterval(run, 15 * 60 * 1000);
    document.addEventListener("visibilitychange", run);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", run);
    };
  }, [enabled, prefs, firstName, dates, rituals, quality, weeklyGoal, partnerName]);

  return null;
}
