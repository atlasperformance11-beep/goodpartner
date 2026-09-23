import {
  ideasForOccasion,
  inPlanningWindow,
  ritualDue,
  ritualOverdueBy,
} from "./dates";
import type { Idea, ImportantDate, Ritual } from "./types";

export function oneThingToday(input: {
  firstName: string;
  rituals: Ritual[];
  upcoming: { item: ImportantDate; days: number }[];
  ideas: Idea[];
  weekCount: number;
  weeklyGoal: number;
}): string {
  const overdue = input.rituals
    .filter((r) => ritualDue(r))
    .sort((a, b) => ritualOverdueBy(b) - ritualOverdueBy(a));
  if (overdue[0]) {
    const r = overdue[0];
    const over = ritualOverdueBy(r);
    if (over > 0) {
      return `If you do one thing today: ${uncap(r.title)} — ${over}d overdue.`;
    }
    return `If you do one thing today: ${uncap(r.title)}.`;
  }

  const planning = input.upcoming.filter((u) => inPlanningWindow(u.item));
  if (planning[0]) {
    const u = planning[0];
    const related = ideasForOccasion(input.ideas, u.item.title).filter(
      (i) => i.status !== "done",
    );
    if (related.length === 0) {
      return `If you do one thing today: start planning ${u.item.title} (${u.days}d).`;
    }
    const next = related.find((i) => i.status === "idea") ?? related[0];
    if (next.status === "idea") {
      return `If you do one thing today: move “${next.title}” from idea to planned.`;
    }
    return `If you do one thing today: lock in “${next.title}” for ${u.item.title}.`;
  }

  if (input.weekCount < input.weeklyGoal) {
    const short = input.weeklyGoal - input.weekCount;
    return `If you do one thing today: protect time with ${input.firstName}. ${short} more ${short === 1 ? "session" : "sessions"} this week.`;
  }

  return `A few considered things for ${input.firstName} — and for the two of you.`;
}

function uncap(s: string): string {
  if (!s) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}
