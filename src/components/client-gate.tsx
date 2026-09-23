import { useEffect, useState, type ReactNode } from "react";
import { useAppStore } from "@/lib/store";

export function ClientGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const finish = () => setReady(true);
    const unsub = useAppStore.persist.onFinishHydration(finish);
    if (useAppStore.persist.hasHydrated()) {
      finish();
    } else {
      void useAppStore.persist.rehydrate();
    }
    const t = window.setTimeout(finish, 400);
    return () => {
      unsub();
      window.clearTimeout(t);
    };
  }, []);

  return <div className={ready ? undefined : "pointer-events-none"}>{children}</div>;
}
