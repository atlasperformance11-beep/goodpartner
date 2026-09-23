import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, NativeSelect } from "@/components/field";
import { Section } from "@/components/section";
import { InstallDialog } from "@/components/install-guide";
import { useAppStore } from "@/lib/store";
import { isIosDevice, isStandaloneDisplay } from "@/lib/device";
import {
  hourLabel,
  notifyCapability,
  REMINDER_HOURS,
  requestNotificationPermission,
  showNotice,
  type NotifyCapability,
} from "@/lib/notify";

function ToggleRow({
  title,
  hint,
  checked,
  onChange,
  disabled,
}: {
  title: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  const id = `n-${title.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <label
      htmlFor={id}
      className="flex min-h-14 items-center justify-between gap-4 border-t border-border px-5 py-3"
    >
      <span className="min-w-0">
        <span className="block text-sm font-medium">{title}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{hint}</span>
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="size-5 shrink-0 accent-primary"
      />
    </label>
  );
}

function useNotifyCapability() {
  const [cap, setCap] = useState<NotifyCapability>({
    permission: "unsupported",
    surface: "unsupported",
    canPrompt: false,
  });

  useEffect(() => {
    const read = () => setCap(notifyCapability());
    read();
    document.addEventListener("visibilitychange", read);
    window.addEventListener("focus", read);
    let status: PermissionStatus | null = null;
    if (navigator.permissions?.query) {
      void navigator.permissions
        .query({ name: "notifications" })
        .then((p) => {
          status = p;
          p.onchange = read;
          read();
        })
        .catch(() => {});
    }
    return () => {
      document.removeEventListener("visibilitychange", read);
      window.removeEventListener("focus", read);
      if (status) status.onchange = null;
    };
  }, []);

  return { cap, refresh: () => setCap(notifyCapability()) };
}

function blockedHint(): string {
  if (isIosDevice()) {
    return isStandaloneDisplay()
      ? "Phone alerts are blocked. iPhone Settings → Notifications → Good Partner. To be asked again, remove the Home Screen icon and add it back."
      : "Phone alerts are blocked. Add to Home Screen, then allow alerts from the icon.";
  }
  return "Phone alerts are blocked. Use the lock icon in the address bar, then Notifications → Allow.";
}

function statusLine(on: boolean, cap: NotifyCapability): { title: string; hint: string } {
  if (!on) {
    return {
      title: "Off",
      hint: "Dates, rituals, and the weekly quality-time goal. They check when you open the journal. Phone banners need a one-time allow.",
    };
  }
  if (cap.permission === "granted") {
    return {
      title: "On · phone alerts",
      hint: "Lock-screen banners are allowed. They also appear when you open the journal.",
    };
  }
  switch (cap.surface) {
    case "ios-install":
      return {
        title: "On · in the journal",
        hint: "On iPhone, lock-screen alerts need the Home Screen icon. Open it from there, then tap Allow phone alerts.",
      };
    case "iframe":
      return {
        title: "On · in the journal",
        hint: "Phone alerts need the site in its own window, not inside another page. Reminders still appear here.",
      };
    case "blocked":
      return {
        title: "On · in the journal",
        hint: blockedHint(),
      };
    case "unsupported":
      return {
        title: "On · in the journal",
        hint: "This browser cannot show phone alerts. Reminders still appear when you open the journal.",
      };
    default:
      return {
        title: "On · in the journal",
        hint: "Allow phone alerts for a banner when the journal is closed.",
      };
  }
}

export function NotifySettings() {
  const prefs = useAppStore((s) => s.notifications);
  const setNotifications = useAppStore((s) => s.setNotifications);
  const firstName = useAppStore((s) => s.partner.nickname || s.partner.name.split(" ")[0] || "them");
  const { cap, refresh } = useNotifyCapability();
  const [installOpen, setInstallOpen] = useState(false);

  async function turnOn() {
    const before = notifyCapability();
    setNotifications({ enabled: true });
    if (before.canPrompt) {
      const next = await requestNotificationPermission();
      refresh();
      if (next === "granted") {
        toast.success("Phone alerts on. They also check when you open the journal.");
        return;
      }
      if (next === "denied") {
        toast.message("Reminders on. Phone alerts were declined — they still appear in the journal.");
        return;
      }
      toast.success("Reminders on. They appear when you open the journal.");
      return;
    }
    refresh();
    if (before.surface === "ios-install") {
      toast.success("Reminders on. Add to Home Screen for lock-screen alerts.");
      return;
    }
    toast.success("Reminders on. They appear when you open the journal.");
  }

  function turnOff() {
    setNotifications({ enabled: false });
    toast.message("Reminders off");
  }

  async function allowPhone() {
    const next = await requestNotificationPermission();
    refresh();
    if (next === "granted") {
      toast.success("Phone alerts on");
      return;
    }
    if (next === "denied") {
      toast.message("Phone alerts were declined");
      return;
    }
    toast.message("No system prompt this time. Try from the Home Screen icon, in its own window.");
  }

  async function sendTest() {
    const ok = await showNotice({
      tag: `test:${Date.now()}`,
      title: "Good Partner",
      body: `This is how a reminder for ${firstName} will look.`,
    });
    if (ok) toast.success("Test sent to the lock screen");
    else toast("Good Partner", { description: `This is how a reminder for ${firstName} will look.` });
  }

  const on = prefs.enabled;
  const copy = statusLine(on, cap);

  return (
    <Section title="Reminders">
      <Card className="overflow-hidden p-0">
        <div className="p-5">
          <p className="text-sm font-medium">{copy.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{copy.hint}</p>
          {on ? (
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button className="w-full sm:w-auto" variant="outline" onClick={turnOff}>
                  Turn reminders off
                </Button>
                <Button className="w-full sm:w-auto" variant="secondary" onClick={() => void sendTest()}>
                  Send a test
                </Button>
              </div>
              {cap.canPrompt ? (
                <Button className="w-full sm:w-auto" onClick={() => void allowPhone()}>
                  Allow phone alerts
                </Button>
              ) : null}
              {cap.surface === "ios-install" ? (
                <Button className="w-full sm:w-auto" onClick={() => setInstallOpen(true)}>
                  Add to Home Screen
                </Button>
              ) : null}
            </div>
          ) : (
            <Button className="mt-4 w-full" onClick={() => void turnOn()}>
              Turn reminders on
            </Button>
          )}
        </div>
        <ToggleRow
          title="Dates"
          hint="Birthdays and occasions, on the lead times you set"
          checked={prefs.dates}
          disabled={!on}
          onChange={(dates) => setNotifications({ dates })}
        />
        <ToggleRow
          title="Rituals"
          hint="The little things that have come due"
          checked={prefs.rituals}
          disabled={!on}
          onChange={(rituals) => setNotifications({ rituals })}
        />
        <ToggleRow
          title="Weekly quality time"
          hint="A nudge later in the week if you are behind"
          checked={prefs.weekly}
          disabled={!on}
          onChange={(weekly) => setNotifications({ weekly })}
        />
        <div className="border-t border-border px-5 py-4">
          <Field label="Quiet until" htmlFor="n-hour">
            <NativeSelect
              id="n-hour"
              value={prefs.hour}
              disabled={!on}
              onChange={(e) => setNotifications({ hour: Number(e.target.value) })}
            >
              {REMINDER_HOURS.map((h) => (
                <option key={h} value={h}>
                  {hourLabel(h)}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <p className="mt-2 text-xs text-muted-foreground">
            Nothing before this hour, even if you open the journal earlier.
          </p>
        </div>
      </Card>
      <InstallDialog open={installOpen} onOpenChange={setInstallOpen} />
    </Section>
  );
}
