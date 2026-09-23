import { getDay } from "date-fns";
import {
  daysUntilDate,
  isoDate,
  ritualDue,
  sessionsThisWeek,
  weekStartIso,
} from "./dates";
import { isEmbeddedFrame, isIosDevice, isStandaloneDisplay } from "./device";
import type { ImportantDate, QualityEntry, Ritual } from "./types";
import {
  classifyNotifySurface,
  type NotifyCapability,
  type PermissionState,
} from "./notify-surface";

export type { NotifyCapability, NotifySurface, PermissionState } from "./notify-surface";
export { classifyNotifySurface } from "./notify-surface";

export type NotificationPrefs = {
  enabled: boolean;
  dates: boolean;
  rituals: boolean;
  weekly: boolean;
  hour: number;
};

export function defaultNotifications(): NotificationPrefs {
  return {
    enabled: false,
    dates: true,
    rituals: true,
    weekly: true,
    hour: 9,
  };
}

export function hourLabel(hour: number): string {
  const n = hour % 12 || 12;
  return `${n}:00 ${hour < 12 ? "AM" : "PM"}`;
}

export const REMINDER_HOURS = [7, 8, 9, 10, 11, 12, 17, 18, 19, 20] as const;

export function notificationPermission(): PermissionState {
  if (typeof window === "undefined" || typeof Notification === "undefined") {
    return "unsupported";
  }
  return Notification.permission;
}

export function notifyCapability(): NotifyCapability {
  const permission = notificationPermission();
  if (permission === "unsupported") {
    return { permission, surface: "unsupported", canPrompt: false };
  }
  const classified = classifyNotifySurface({
    supported: true,
    permission,
    embedded: isEmbeddedFrame(),
    ios: isIosDevice(),
    standalone: isStandaloneDisplay(),
  });
  return { permission, ...classified };
}

export async function requestNotificationPermission(): Promise<PermissionState> {
  const cap = notifyCapability();
  if (cap.permission === "unsupported") return "unsupported";
  if (cap.permission === "granted") return "granted";
  // Never call requestPermission unless a system dialog can appear — on iOS
  // Safari tabs it returns "denied" immediately and burns the chance.
  if (!cap.canPrompt) return cap.permission;
  if (typeof Notification === "undefined") return "unsupported";
  try {
    const result = await Notification.requestPermission();
    return result;
  } catch {
    return notificationPermission();
  }
}

export type Notice = {
  tag: string;
  title: string;
  body: string;
};

const SEEN_KEY = "good-partner-notices";

function seenToday(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as { day?: string; tags?: string[] };
    if (parsed.day !== isoDate()) return new Set();
    return new Set(parsed.tags ?? []);
  } catch {
    return new Set();
  }
}

function markSeen(tag: string) {
  if (typeof window === "undefined") return;
  const tags = seenToday();
  tags.add(tag);
  localStorage.setItem(SEEN_KEY, JSON.stringify({ day: isoDate(), tags: [...tags] }));
}

export function collectNotices(input: {
  prefs: NotificationPrefs;
  firstName: string;
  dates: ImportantDate[];
  rituals: Ritual[];
  quality: QualityEntry[];
  weeklyGoal: number;
  now?: Date;
}): Notice[] {
  const now = input.now ?? new Date();
  const first = input.firstName.trim() || "them";
  const out: Notice[] = [];

  if (input.prefs.dates) {
    for (const item of input.dates) {
      const days = daysUntilDate(item, now);
      if (days < 0) continue;
      const hits = days === 0 || item.remindDays.includes(days);
      if (!hits) continue;
      const when =
        days === 0
          ? "today"
          : days === 1
            ? "tomorrow"
            : `in ${days} days`;
      out.push({
        tag: `date:${item.id}:${isoDate(now)}`,
        title: item.title,
        body: `${when[0]?.toUpperCase()}${when.slice(1)} — a little time to get it right.`,
      });
    }
  }

  if (input.prefs.rituals) {
    for (const ritual of input.rituals) {
      if (!ritualDue(ritual, now)) continue;
      out.push({
        tag: `ritual:${ritual.id}:${isoDate(now)}`,
        title: ritual.title,
        body: `Due with ${first}. Keep the little thing going.`,
      });
    }
  }

  if (input.prefs.weekly) {
    const weekday = getDay(now);
    const done = sessionsThisWeek(input.quality, now).length;
    if (weekday >= 4 && done < input.weeklyGoal) {
      const left = input.weeklyGoal - done;
      out.push({
        tag: `weekly:${weekStartIso(now)}`,
        title: "Quality time",
        body:
          left === 1
            ? `One more undistracted stretch with ${first} this week.`
            : `${left} more this week with ${first}.`,
      });
    }
  }

  return out;
}

async function activeRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (typeof navigator === "undefined" || !navigator.serviceWorker) return null;
  try {
    const reg = await Promise.race([
      navigator.serviceWorker.getRegistration(),
      new Promise<undefined>((resolve) => window.setTimeout(resolve, 250)),
    ]);
    return reg?.active ? reg : null;
  } catch {
    return null;
  }
}

export async function showNotice(notice: Notice): Promise<boolean> {
  if (typeof window === "undefined" || typeof Notification === "undefined") return false;
  if (Notification.permission !== "granted") return false;
  const opts: NotificationOptions = {
    body: notice.body,
    tag: notice.tag,
    icon: "/icon-192.png",
    silent: false,
  };
  try {
    const reg = await activeRegistration();
    if (reg?.showNotification) {
      await reg.showNotification(notice.title, opts);
      return true;
    }
  } catch {
    // Page-level Notification is the reliable path on iOS Home Screen.
  }
  try {
    new Notification(notice.title, opts);
    return true;
  } catch {
    return false;
  }
}

export async function dispatchDueNotices(input: {
  prefs: NotificationPrefs;
  firstName: string;
  dates: ImportantDate[];
  rituals: Ritual[];
  quality: QualityEntry[];
  weeklyGoal: number;
}): Promise<Notice[]> {
  if (!input.prefs.enabled) return [];
  const now = new Date();
  if (now.getHours() < input.prefs.hour) return [];
  const already = seenToday();
  const due = collectNotices({ ...input, now }).filter((n) => !already.has(n.tag));
  const os = notificationPermission() === "granted";
  const leftover: Notice[] = [];
  for (const notice of due) {
    markSeen(notice.tag);
    if (os) {
      const ok = await showNotice(notice);
      if (!ok) leftover.push(notice);
    } else {
      leftover.push(notice);
    }
  }
  return leftover;
}
