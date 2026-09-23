import { useEffect } from "react";
import { restorePlayUnlock } from "@/lib/play-billing";
import { useAppStore } from "@/lib/store";

/** If they already paid on Google Play, unlock this install. */
export function PlayRestore() {
  const unlocked = useAppStore((s) => s.unlocked);
  const unlock = useAppStore((s) => s.unlock);

  useEffect(() => {
    if (unlocked) return;
    let cancelled = false;
    void restorePlayUnlock().then((owned) => {
      if (!cancelled && owned) unlock();
    });
    return () => {
      cancelled = true;
    };
  }, [unlocked, unlock]);

  return null;
}
