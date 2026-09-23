import {
  addDays,
  differenceInCalendarDays,
  format,
  getDay,
  isSameDay,
  startOfDay,
  startOfWeek,
} from "date-fns";
import type { DateKind, Idea, ImportantDate, QualityEntry, Ritual } from "./types";

export function isoDate(d: Date = new Date()): string {
  return format(d, "yyyy-MM-dd");
}

export function parseIso(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

export function nextOccurrence(item: ImportantDate, from: Date = new Date()): Date {
  const today = startOfDay(from);
  if (!item.recursYearly && item.year) {
    return startOfDay(new Date(item.year, item.month - 1, item.day));
  }
  const year = today.getFullYear();
  let next = startOfDay(new Date(year, item.month - 1, item.day));
  if (next < today) {
    next = startOfDay(new Date(year + 1, item.month - 1, item.day));
  }
  return next;
}

export function daysUntilDate(item: ImportantDate, from: Date = new Date()): number {
  return differenceInCalendarDays(nextOccurrence(item, from), startOfDay(from));
}

export function yearsTogether(item: ImportantDate, from: Date = new Date()): number | null {
  if (!item.year) return null;
  const next = nextOccurrence(item, from);
  return next.getFullYear() - item.year;
}

export function weekStartIso(from: Date = new Date()): string {
  return isoDate(startOfWeek(from, { weekStartsOn: 1 }));
}

export function daysSince(iso: string | null, from: Date = new Date()): number | null {
  if (!iso) return null;
  return differenceInCalendarDays(startOfDay(from), parseIso(iso));
}

export function ritualDue(ritual: Ritual, from: Date = new Date()): boolean {
  if (!ritual.lastDone) return true;
  const elapsed = daysSince(ritual.lastDone, from) ?? 0;
  return elapsed >= ritual.cadenceDays;
}

export function ritualOverdueBy(ritual: Ritual, from: Date = new Date()): number {
  if (!ritual.lastDone) return ritual.cadenceDays;
  const elapsed = daysSince(ritual.lastDone, from) ?? 0;
  return elapsed - ritual.cadenceDays;
}

export function defaultRemindDays(kind: DateKind): number[] {
  switch (kind) {
    case "birthday":
      return [21, 14, 7, 1];
    case "anniversary":
      return [30, 14, 7, 1];
    case "first":
      return [7, 1];
    default:
      return [14, 7, 1];
  }
}

export function remindWindow(item: Pick<ImportantDate, "remindDays">): number {
  return item.remindDays.length ? Math.max(...item.remindDays) : 14;
}

export function remindDaysFromWindow(window: number): number[] {
  if (window >= 30) return [30, 14, 7, 1];
  if (window >= 21) return [21, 14, 7, 1];
  if (window >= 14) return [14, 7, 1];
  return [7, 1];
}

export function inPlanningWindow(item: ImportantDate, from: Date = new Date()): boolean {
  const days = daysUntilDate(item, from);
  return days >= 0 && days <= remindWindow(item);
}

export function occasionCaption(item: ImportantDate, years: number | null): string {
  if (!years) return "";
  if (item.kind === "birthday") return `turning ${years}`;
  if (years === 1) return "1 year";
  return `${years} years`;
}

export function ideasForOccasion(ideas: Idea[], occasion: string): Idea[] {
  const t = occasion.trim().toLowerCase();
  if (!t) return [];
  return ideas.filter((i) => {
    const o = i.occasion.trim().toLowerCase();
    if (!o) return false;
    return o === t || o.includes(t) || t.includes(o);
  });
}

export function formatLong(d: Date): string {
  return format(d, "EEEE, MMMM d");
}

export function formatShort(d: Date): string {
  return format(d, "MMM d");
}

export function formatWeekday(d: Date): string {
  return format(d, "EEE");
}

export function greeting(from: Date = new Date()): string {
  const h = from.getHours();
  if (h < 5) return "Still up";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function monthMatrix(anchor: Date): Date[][] {
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const first = new Date(year, month, 1);
  const startOffset = (getDay(first) + 6) % 7; // Monday = 0
  const start = addDays(first, -startOffset);
  const weeks: Date[][] = [];
  let cursor = start;
  for (let w = 0; w < 6; w++) {
    const row: Date[] = [];
    for (let d = 0; d < 7; d++) {
      row.push(cursor);
      cursor = addDays(cursor, 1);
    }
    weeks.push(row);
  }
  return weeks;
}

export function datesOnDay(items: ImportantDate[], day: Date): ImportantDate[] {
  return items.filter(
    (item) =>
      isSameDay(nextOccurrence(item, day), day) ||
      isSameDay(occurrenceThisYear(item, day), day),
  );
}

function occurrenceThisYear(item: ImportantDate, day: Date): Date {
  return startOfDay(new Date(day.getFullYear(), item.month - 1, item.day));
}

export function qualityOnDay(entries: QualityEntry[], day: Date): QualityEntry[] {
  return entries.filter((e) => isSameDay(parseIso(e.date), day));
}

export function minutesThisWeek(entries: QualityEntry[], from: Date = new Date()): number {
  const start = startOfWeek(from, { weekStartsOn: 1 });
  const end = addDays(start, 7);
  return entries
    .filter((e) => {
      const d = parseIso(e.date);
      return d >= start && d < end;
    })
    .reduce((sum, e) => sum + e.minutes, 0);
}

export function sessionsThisWeek(entries: QualityEntry[], from: Date = new Date()): QualityEntry[] {
  const start = startOfWeek(from, { weekStartsOn: 1 });
  const end = addDays(start, 7);
  return entries.filter((e) => {
    const d = parseIso(e.date);
    return d >= start && d < end;
  });
}

export function weekDays(from: Date = new Date()): Date[] {
  const start = startOfWeek(from, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function cadenceLabel(days: number): string {
  if (days <= 1) return "Daily";
  if (days === 7) return "Weekly";
  if (days === 14) return "Every 2 weeks";
  return `Every ${days} days`;
}

export function formatMinutes(mins: number): string {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return h === 1 ? "1 hr" : `${h} hr`;
  return `${h} hr ${m} min`;
}
