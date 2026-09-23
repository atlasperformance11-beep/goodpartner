import { createEmpty } from "./seed";
import type { AppData, LoveLanguage, Partner } from "./types";
import { emptyPartner, LOVE_LANGUAGES } from "./types";

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function asNumber(v: unknown, fallback = 0): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string").slice(0, 80);
}

function parsePartner(raw: unknown): Partner {
  const p = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const langs = asStringArray(p.loveLanguages).filter((l): l is LoveLanguage =>
    (LOVE_LANGUAGES as readonly string[]).includes(l),
  );
  return {
    ...emptyPartner(),
    name: asString(p.name).slice(0, 80),
    nickname: asString(p.nickname).slice(0, 40),
    pronouns: asString(p.pronouns).slice(0, 40),
    howWeMet: asString(p.howWeMet).slice(0, 400),
    notes: asString(p.notes).slice(0, 2000),
    loveLanguages: langs,
    likes: asStringArray(p.likes),
    dislikes: asStringArray(p.dislikes),
    shirtSize: asString(p.shirtSize).slice(0, 20),
    shoeSize: asString(p.shoeSize).slice(0, 20),
    ringSize: asString(p.ringSize).slice(0, 20),
    favoriteColor: asString(p.favoriteColor).slice(0, 40),
    favoriteFlower: asString(p.favoriteFlower).slice(0, 40),
    favoriteFood: asString(p.favoriteFood).slice(0, 80),
    favoriteDrink: asString(p.favoriteDrink).slice(0, 80),
    favoriteMovie: asString(p.favoriteMovie).slice(0, 80),
    favoriteSong: asString(p.favoriteSong).slice(0, 80),
  };
}

function parseList<T>(raw: unknown, map: (item: Record<string, unknown>) => T | null): T[] {
  if (!Array.isArray(raw)) return [];
  const out: T[] = [];
  for (const item of raw.slice(0, 200)) {
    if (!item || typeof item !== "object") continue;
    const parsed = map(item as Record<string, unknown>);
    if (parsed) out.push(parsed);
  }
  return out;
}

export function parseJournal(raw: unknown): AppData | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const empty = createEmpty();
  return {
    partner: parsePartner(o.partner),
    dates: parseList(o.dates, (d) => {
      const title = asString(d.title).trim();
      if (!title) return null;
      const kind = ["birthday", "anniversary", "first", "custom"].includes(asString(d.kind))
        ? (d.kind as AppData["dates"][number]["kind"])
        : "custom";
      const remind = Array.isArray(d.remindDays)
        ? d.remindDays.filter((n): n is number => typeof n === "number").slice(0, 6)
        : [14, 7, 1];
      return {
        id: asString(d.id) || crypto.randomUUID(),
        title: title.slice(0, 120),
        kind,
        month: Math.min(12, Math.max(1, asNumber(d.month, 1))),
        day: Math.min(31, Math.max(1, asNumber(d.day, 1))),
        year: typeof d.year === "number" ? d.year : undefined,
        recursYearly: d.recursYearly !== false,
        notes: asString(d.notes).slice(0, 2000),
        remindDays: remind.length ? remind : [14, 7, 1],
      };
    }),
    ideas: parseList(o.ideas, (i) => {
      const title = asString(i.title).trim();
      if (!title) return null;
      const kind = i.kind === "date" ? "date" : "gift";
      const status = i.status === "planned" || i.status === "done" ? i.status : "idea";
      return {
        id: asString(i.id) || crypto.randomUUID(),
        kind,
        title: title.slice(0, 120),
        notes: asString(i.notes).slice(0, 2000),
        tags: asStringArray(i.tags).slice(0, 12),
        status,
        occasion: asString(i.occasion).slice(0, 80),
        createdAt: asString(i.createdAt).slice(0, 32),
      };
    }),
    gestures: parseList(o.gestures, (g) => {
      const title = asString(g.title).trim();
      if (!title) return null;
      const kind = ["note", "gift", "help", "surprise", "time", "other"].includes(asString(g.kind))
        ? (g.kind as AppData["gestures"][number]["kind"])
        : "other";
      return {
        id: asString(g.id) || crypto.randomUUID(),
        title: title.slice(0, 120),
        notes: asString(g.notes).slice(0, 2000),
        date: asString(g.date).slice(0, 32),
        kind,
      };
    }),
    quality: parseList(o.quality, (q) => {
      const title = asString(q.title).trim();
      if (!title) return null;
      return {
        id: asString(q.id) || crypto.randomUUID(),
        date: asString(q.date).slice(0, 32),
        minutes: Math.min(24 * 60, Math.max(5, asNumber(q.minutes, 60))),
        title: title.slice(0, 120),
        notes: asString(q.notes).slice(0, 2000),
      };
    }),
    rituals: parseList(o.rituals, (r) => {
      const title = asString(r.title).trim();
      if (!title) return null;
      return {
        id: asString(r.id) || crypto.randomUUID(),
        title: title.slice(0, 120),
        cadenceDays: Math.min(90, Math.max(1, asNumber(r.cadenceDays, 7))),
        lastDone: typeof r.lastDone === "string" ? r.lastDone.slice(0, 32) : null,
        notes: asString(r.notes).slice(0, 2000),
      };
    }),
    intention: {
      weekStart: asString((o.intention as { weekStart?: unknown } | undefined)?.weekStart) || empty.intention.weekStart,
      text: asString((o.intention as { text?: unknown } | undefined)?.text).slice(0, 400),
    },
    weeklyGoal: Math.max(1, Math.min(7, asNumber(o.weeklyGoal, 3))),
  };
}

export function downloadJournal(data: AppData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `good-partner-${stamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
