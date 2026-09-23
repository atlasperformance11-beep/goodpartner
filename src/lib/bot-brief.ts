import { differenceInCalendarDays, format, startOfDay } from "date-fns";
import { APP_ORIGIN } from "./app-meta.ts";
import type { AppData, ImportantDate, Ritual } from "./types";

const SKILL_URL = `${APP_ORIGIN}/bot.md`;

function nextOccurrence(item: ImportantDate, from: Date): Date {
  const today = startOfDay(from);
  if (!item.recursYearly && item.year) {
    return startOfDay(new Date(item.year, item.month - 1, item.day));
  }
  const year = today.getFullYear();
  let next = startOfDay(new Date(year, item.month - 1, item.day));
  if (next < today) next = startOfDay(new Date(year + 1, item.month - 1, item.day));
  return next;
}

function ritualIsDue(ritual: Ritual, from: Date): boolean {
  if (!ritual.lastDone) return true;
  const elapsed = differenceInCalendarDays(startOfDay(from), startOfDay(new Date(ritual.lastDone)));
  return elapsed >= ritual.cadenceDays;
}

/** Plain-text handoff a person can drop into a Grok Bot chat or the system share sheet. */
export function buildBotBrief(data: AppData, from: Date = new Date()): string {
  const name = data.partner.name.trim();
  const nick = data.partner.nickname.trim();
  const who = !name ? "not named yet" : nick ? `${name} (${nick})` : name;
  const lines: string[] = [
    "Good Partner brief — for a Grok Bot. Private. Do not publish this.",
    "",
    `Partner: ${who}`,
  ];

  if (data.partner.pronouns.trim()) lines.push(`Pronouns: ${data.partner.pronouns.trim()}`);
  if (data.partner.loveLanguages.length) {
    lines.push(`Love languages: ${data.partner.loveLanguages.join(", ")}`);
  }
  if (data.partner.likes.length) lines.push(`Likes: ${data.partner.likes.slice(0, 12).join(", ")}`);
  if (data.partner.dislikes.length) {
    lines.push(`Dislikes: ${data.partner.dislikes.slice(0, 8).join(", ")}`);
  }

  const sizes = [
    data.partner.shirtSize && `shirt ${data.partner.shirtSize}`,
    data.partner.shoeSize && `shoes ${data.partner.shoeSize}`,
    data.partner.ringSize && `ring ${data.partner.ringSize}`,
  ].filter(Boolean);
  if (sizes.length) lines.push(`Sizes: ${sizes.join(", ")}`);

  const favorites = [
    data.partner.favoriteColor && `color ${data.partner.favoriteColor}`,
    data.partner.favoriteFlower && `flower ${data.partner.favoriteFlower}`,
    data.partner.favoriteFood && `food ${data.partner.favoriteFood}`,
    data.partner.favoriteDrink && `drink ${data.partner.favoriteDrink}`,
  ].filter(Boolean);
  if (favorites.length) lines.push(`Favorites: ${favorites.join("; ")}`);
  if (data.partner.notes.trim()) lines.push(`Notes: ${data.partner.notes.trim()}`);
  if (data.intention.text.trim()) lines.push(`This week: ${data.intention.text.trim()}`);

  const upcoming = data.dates
    .map((item) => ({
      item,
      days: differenceInCalendarDays(nextOccurrence(item, from), startOfDay(from)),
    }))
    .filter((row) => row.days <= 90)
    .sort((a, b) => a.days - b.days)
    .slice(0, 8);
  lines.push("", "Coming up:");
  if (!upcoming.length) lines.push("- None in the next 90 days.");
  else {
    for (const { item, days } of upcoming) {
      const when = days === 0 ? "today" : days === 1 ? "tomorrow" : `in ${days} days`;
      const note = item.notes.trim() ? ` ${item.notes.trim()}` : "";
      lines.push(`- ${item.title} — ${when} (${format(nextOccurrence(item, from), "MMM d")}).${note}`);
    }
  }

  const ideas = data.ideas.filter((idea) => idea.status !== "done").slice(0, 8);
  lines.push("", "Open ideas:");
  if (!ideas.length) lines.push("- None.");
  else {
    for (const idea of ideas) {
      const where = idea.occasion.trim() ? ` · ${idea.occasion.trim()}` : "";
      lines.push(`- [${idea.kind}] ${idea.title}${where}`);
    }
  }

  const due = data.rituals.filter((ritual) => ritualIsDue(ritual, from)).slice(0, 6);
  if (due.length) {
    lines.push("", "Rituals due:");
    for (const ritual of due) lines.push(`- ${ritual.title}`);
  }

  lines.push(
    "",
    `App: ${APP_ORIGIN}`,
    `How a Grok Bot should use it: ${SKILL_URL}`,
    "The journal lives only on the device that shared this. Do not post it, and do not invent dates or sizes that are not written here.",
  );
  return lines.join("\n");
}
