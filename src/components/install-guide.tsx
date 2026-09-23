import { useEffect, useState } from "react";
import { Share, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  INSTALL_DISMISS_KEY,
  isAndroidDevice,
  isStandaloneDisplay,
  shouldPromptAndroidInstall,
  shouldPromptHomeScreen,
} from "@/lib/device";
import { hasInstallPrompt, promptInstall, subscribeInstallPrompt } from "@/lib/install-prompt";
import { cn } from "@/lib/utils";

const IOS_STEPS = [
  "Open this page in Safari on iPhone or iPad.",
  "Tap the Share button in the toolbar.",
  "Scroll to Add to Home Screen, then tap Add.",
];

const ANDROID_STEPS = [
  "Open this page in Chrome on your Android phone.",
  "Tap the three-dot menu in the corner.",
  "Tap Install app or Add to Home screen, then Install.",
];

export function InstallSteps({
  compact = false,
  platform = "ios",
}: {
  compact?: boolean;
  platform?: "ios" | "android";
}) {
  const steps = platform === "android" ? ANDROID_STEPS : IOS_STEPS;
  return (
    <ol className={compact ? "flex flex-col gap-2 text-sm" : "flex flex-col gap-3 text-sm"}>
      {steps.map((step, i) => (
        <li key={step} className="flex gap-3">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sage-soft text-xs font-medium text-primary tabular-nums">
            {i + 1}
          </span>
          <span className="leading-relaxed text-foreground/90">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export function InstallDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [canPrompt, setCanPrompt] = useState(false);
  const android = typeof navigator !== "undefined" && isAndroidDevice();

  useEffect(() => {
    setCanPrompt(hasInstallPrompt());
    return subscribeInstallPrompt(() => setCanPrompt(hasInstallPrompt()));
  }, [open]);

  async function install() {
    const result = await promptInstall();
    if (result === "accepted") {
      toast.success("Installed on this phone");
      onOpenChange(false);
      return;
    }
    if (result === "dismissed") return;
    toast.message("Use Chrome’s menu → Install app");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keep it on your phone</DialogTitle>
          <DialogDescription>
            Full screen, own icon, no browser chrome. A Google Play listing still needs a
            signed Android App Bundle from Play Console.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm font-medium">Android</p>
            <div className="mt-2">
              <InstallSteps platform="android" />
            </div>
            {canPrompt ? (
              <Button className="mt-3 w-full" onClick={() => void install()}>
                Install on this phone
              </Button>
            ) : null}
          </div>
          <div>
            <p className="text-sm font-medium">iPhone</p>
            <div className="mt-2">
              <InstallSteps platform="ios" />
            </div>
            <Button asChild variant="outline" className="mt-3 w-full">
              <a href="/?install=1&platform=ios">Show the iPhone visual guide</a>
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {android
            ? "Your journal stays on this device. Installing does not create an account."
            : "Your journal stays on this device. Adding it to the Home Screen does not create an account."}
        </p>
      </DialogContent>
    </Dialog>
  );
}

export function InstallNowButton({ className }: { className?: string }) {
  const [can, setCan] = useState(false);

  useEffect(() => {
    setCan(hasInstallPrompt());
    return subscribeInstallPrompt(() => setCan(hasInstallPrompt()));
  }, []);

  if (!can) return null;

  return (
    <Button
      className={cn("w-full", className)}
      onClick={() => {
        void promptInstall().then((result) => {
          if (result === "accepted") toast.success("Installed on this phone");
        });
      }}
    >
      Install on this phone
    </Button>
  );
}

export function InstallBanner({ offsetNav = true }: { offsetNav?: boolean }) {
  const [show, setShow] = useState(false);
  const [android, setAndroid] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isStandaloneDisplay()) return;
    if (window.localStorage.getItem(INSTALL_DISMISS_KEY) === "1") return;
    if (shouldPromptHomeScreen()) {
      setAndroid(false);
      setShow(true);
      return;
    }
    if (shouldPromptAndroidInstall()) {
      setAndroid(true);
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-20 px-3 md:bottom-6 md:left-56",
        offsetNav
          ? "bottom-[calc(3.75rem+env(safe-area-inset-bottom))]"
          : "bottom-[max(1rem,env(safe-area-inset-bottom))]",
      )}
    >
      <Card className="pointer-events-auto mx-auto flex max-w-lg items-start gap-3 rounded-xl p-3 shadow-[var(--shadow-float)]">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sage-soft text-primary">
          {android ? (
            <Smartphone className="size-4" strokeWidth={1.75} />
          ) : (
            <Share className="size-4" strokeWidth={1.75} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Keep it on your Home Screen</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {android
              ? "Chrome menu → Install app. Opens full screen, like any other app."
              : "Share → Add to Home Screen. Opens full screen, no Safari chrome."}
          </p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="shrink-0"
          onClick={() => {
            window.localStorage.setItem(INSTALL_DISMISS_KEY, "1");
            setShow(false);
          }}
        >
          Dismiss
        </Button>
      </Card>
    </div>
  );
}
