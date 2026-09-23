import { useEffect } from "react";
import {
  captureInstallPrompt,
  clearInstallPrompt,
} from "@/lib/install-prompt";

export function PwaRegister() {
  useEffect(() => {
    const onPrompt = (event: Event) => captureInstallPrompt(event);
    const onInstalled = () => clearInstallPrompt();
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    if (import.meta.env.PROD && "serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  return null;
}
