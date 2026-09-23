import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/field";
import { Section } from "@/components/section";
import { GestureDialog, QualityDialog } from "@/components/log-dialogs";
import { IdeaDialog } from "@/components/idea-dialog";
import { Paywall } from "@/components/paywall";
import { useAppStore } from "@/lib/store";
import { sparkSuggestions } from "@/lib/suggest";
import { oneThingToday } from "@/lib/one-thing";
import {
  cadenceLabel,
  daysUntilDate,
  formatLong,
  formatMinutes,
  formatShort,
  greeting,
  ideasForOccasion,
  inPlanningWindow,
  isoDate,
  nextOccurrence,
  occasionCaption,
  parseIso,
  ritualDue,
  ritualOverdueBy,
  sessionsThisWeek,
  weekDays,
  yearsTogether,
} from "@/lib/dates";
import type { Suggestion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ShareWithBotButton } from "@/components/share-bot-button";

export const Route = createFileRoute("/")({ component: TodayPage });

function TodayPage() {
  const partner = useAppStore((s) => s.partner);
  const unlocked = useAppStore((s) => s.unlocked);
  const previewingSample = useAppStore((s) => s.previewingSample);
  if (!unlocked && !previewingSample) return <Paywall />;
  if (!partner.name.trim()) return <Onboarding />;
  return <Today />;
}

function Today() {
  const partner = useAppStore((s) => s.partner);
  const dates = useAppStore((s) => s.dates);
  const rituals = useAppStore((s) => s.rituals);
  const quality = useAppStore((s) => s.quality);
  const gestures = useAppStore((s) => s.gestures);
  const ideas = useAppStore((s) => s.ideas);
  const intention = useAppStore((s) => s.intention);
  const weeklyGoal = useAppStore((s) => s.weeklyGoal);
  const completeRitual = useAppStore((s) => s.completeRitual);
  const addGesture = useAppStore((s) => s.addGesture);
  const addQuality = useAppStore((s) => s.addQuality);
  const addIdea = useAppStore((s) => s.addIdea);
  const setIntention = useAppStore((s) => s.setIntention);
  const setWeeklyGoal = useAppStore((s) => s.setWeeklyGoal);

  const [gOpen, setGOpen] = useState(false);
  const [qOpen, setQOpen] = useState(false);
  const [ideaOpen, setIdeaOpen] = useState(false);
  const [ideaOccasion, setIdeaOccasion] = useState("");
  const [editingIntention, setEditingIntention] = useState(false);
  const [intentDraft, setIntentDraft] = useState(intention.text);
  const [sparking, setSparking] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);

  const firstName = partner.nickname || partner.name.split(" ")[0];
  const upcoming = useMemo(
    () =>
      dates
        .map((d) => ({
          item: d,
          days: daysUntilDate(d),
          next: nextOccurrence(d),
          years: yearsTogether(d),
        }))
        .filter((x) => x.days >= 0)
        .sort((a, b) => a.days - b.days),
    [dates],
  );
  const hero = upcoming[0];
  const due = rituals.filter((r) => ritualDue(r)).sort((a, b) => ritualOverdueBy(b) - ritualOverdueBy(a));
  const weekSessions = sessionsThisWeek(quality);
  const week = weekDays();
  const prompt = oneThingToday({
    firstName,
    rituals,
    upcoming,
    ideas,
    weekCount: weekSessions.length,
    weeklyGoal,
  });
  const heroRelated = hero
    ? ideasForOccasion(ideas, hero.item.title).filter((i) => i.status !== "done")
    : [];
  const heroPlanning = hero ? inPlanningWindow(hero.item) : false;

  async function spark() {
    setSparking(true);
    try {
      const result = await sparkSuggestions({
        data: {
          partnerName: partner.name,
          nickname: partner.nickname,
          loveLanguages: partner.loveLanguages,
          likes: partner.likes,
          dislikes: partner.dislikes,
          notes: partner.notes,
          favorites: [
            partner.favoriteFood && `food: ${partner.favoriteFood}`,
            partner.favoriteDrink && `drink: ${partner.favoriteDrink}`,
            partner.favoriteFlower && `flower: ${partner.favoriteFlower}`,
            partner.favoriteColor && `color: ${partner.favoriteColor}`,
            partner.favoriteSong && `song: ${partner.favoriteSong}`,
          ]
            .filter(Boolean)
            .join("; "),
          upcoming: upcoming.slice(0, 4).map((u) => ({
            title: u.item.title,
            inDays: u.days,
            notes: u.item.notes,
          })),
          dueRituals: due.map((r) => r.title),
          recentGestures: gestures.slice(0, 5).map((g) => `${g.date}: ${g.title}`),
          ideas: ideas.filter((i) => i.status !== "done").map((i) => `${i.kind}: ${i.title}`),
        },
      });
      setSuggestions(result.suggestions);
      if (!result.ok) toast.message("Using standby ideas");
    } catch {
      toast.error("Could not spark ideas right now");
    } finally {
      setSparking(false);
    }
  }

  return (
    <div className="stagger-in flex flex-col gap-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {formatLong(new Date())}
        </p>
        <h1 className="mt-1 font-display text-display tracking-tight">
          {greeting()}.
        </h1>
        <p className="mt-2 max-w-lg text-muted-foreground">
          {prompt}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => setGOpen(true)}>
            <Plus className="size-4" />
            Log a gesture
          </Button>
          <Button size="sm" variant="outline" onClick={() => setQOpen(true)}>
            Log time
          </Button>
          <ShareWithBotButton size="sm" label="Share with a Grok Bot" />
        </div>
      </header>

      {hero ? (
        <Card className="hero-wash overflow-hidden rounded-2xl p-6 md:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
            Coming up
          </p>
          <p className="mt-3 font-display text-hero leading-none tracking-tight text-primary tabular-nums">
            {hero.days}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {hero.days === 0 ? "today" : hero.days === 1 ? "day until" : "days until"}
          </p>
          <h2 className="mt-4 font-display text-2xl tracking-tight md:text-3xl">
            {hero.item.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatShort(hero.next)}
            {occasionCaption(hero.item, hero.years)
              ? ` · ${occasionCaption(hero.item, hero.years)}`
              : ""}
            {heroPlanning ? " · time to plan" : ""}
          </p>
          {hero.item.notes ? (
            <p className="mt-4 max-w-prose text-sm leading-relaxed">{hero.item.notes}</p>
          ) : null}
          {heroRelated.length > 0 ? (
            <ul className="mt-4 flex flex-col gap-1.5">
              {heroRelated.slice(0, 3).map((idea) => (
                <li key={idea.id} className="text-sm">
                  <span className="text-muted-foreground">
                    {idea.kind === "gift" ? "Gift" : "Date"} ·{" "}
                  </span>
                  {idea.title}
                </li>
              ))}
            </ul>
          ) : null}
          <Button
            size="sm"
            variant="outline"
            className="mt-4"
            onClick={() => {
              setIdeaOccasion(hero.item.title);
              setIdeaOpen(true);
            }}
          >
            Plan a gift or date
          </Button>
          {upcoming.length > 1 ? (
            <ul className="mt-6 flex flex-col gap-2 border-t border-border/70 pt-4">
              {upcoming.slice(1, 4).map((u) => (
                <li key={u.item.id} className="flex items-baseline justify-between gap-3 text-sm">
                  <span>{u.item.title}</span>
                  <span className="shrink-0 tabular-nums text-muted-foreground">
                    {u.days === 0 ? "today" : `${u.days}d`} · {formatShort(u.next)}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </Card>
      ) : (
        <Card className="rounded-2xl p-6">
          <h2 className="font-display text-xl tracking-tight">A quiet stretch</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            No dates on the horizon. A good time to plant something small.
          </p>
          <Button asChild className="mt-4" variant="outline" size="sm">
            <Link to="/dates">Add a date</Link>
          </Button>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Section
          title="Little things due"
          action={
            <Link to="/us" className="text-xs font-medium text-primary">
              All rituals
            </Link>
          }
        >
          {due.length === 0 ? (
            <Card className="p-5">
              <p className="text-sm text-muted-foreground">
                You're current. Nothing is waiting.
              </p>
            </Card>
          ) : (
            <ul className="flex flex-col gap-2">
              {due.map((r) => {
                const over = ritualOverdueBy(r);
                return (
                  <li key={r.id}>
                    <Card className="flex items-center gap-3 p-3 pl-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{r.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {cadenceLabel(r.cadenceDays)}
                          {over > 0 ? ` · ${over}d overdue` : " · due today"}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          completeRitual(r.id);
                          toast.success("Marked done");
                        }}
                      >
                        <Check className="size-4" />
                        Done
                      </Button>
                    </Card>
                  </li>
                );
              })}
            </ul>
          )}
        </Section>

        <Section title="Quality time this week">
          <Card className="p-5">
            <div className="flex items-end justify-between">
              <p className="font-display text-3xl tabular-nums tracking-tight">
                {weekSessions.length}
                <span className="text-lg text-muted-foreground"> / {weeklyGoal}</span>
              </p>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Decrease weekly goal"
                  onClick={() => setWeeklyGoal(weeklyGoal - 1)}
                >
                  −
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Increase weekly goal"
                  onClick={() => setWeeklyGoal(weeklyGoal + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatMinutes(weekSessions.reduce((n, s) => n + s.minutes, 0))} together · goal {weeklyGoal} / week
            </p>
            <div className="mt-4 grid grid-cols-7 gap-1.5">
              {week.map((d) => {
                const has = weekSessions.some((s) => s.date === isoDate(d));
                const isToday = isoDate(d) === isoDate();
                return (
                  <div key={isoDate(d)} className="flex flex-col items-center gap-1.5">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {d.toLocaleDateString("en", { weekday: "narrow" })}
                    </span>
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full text-xs tabular-nums",
                        has
                          ? "bg-primary text-primary-foreground"
                          : isToday
                            ? "bg-sage-soft text-primary"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {d.getDate()}
                    </span>
                  </div>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 w-full"
              onClick={() => setQOpen(true)}
            >
              Log time together
            </Button>
          </Card>
        </Section>
      </div>

      <Section
        title="This week's intention"
        action={
          <button
            type="button"
            className="text-xs font-medium text-primary"
            onClick={() => {
              setIntentDraft(intention.text);
              setEditingIntention((v) => !v);
            }}
          >
            {editingIntention ? "Close" : "Edit"}
          </button>
        }
      >
        <Card className="p-5">
          {editingIntention ? (
            <div className="flex flex-col gap-3">
              <Textarea
                value={intentDraft}
                onChange={(e) => setIntentDraft(e.target.value)}
                rows={3}
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={() => {
                    setIntention(intentDraft.trim());
                    setEditingIntention(false);
                    toast.success("Intention saved");
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : intention.text ? (
            <p className="font-display text-xl leading-snug tracking-tight">
              {intention.text}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Set one intention for the week. Keep it small enough to keep.
            </p>
          )}
        </Card>
      </Section>

      <Section title="Need an idea?">
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">
            Spark three gestures from {firstName}'s likes, the dates coming up, and what you've already done.
          </p>
          <Button className="mt-4" onClick={() => void spark()} disabled={sparking}>
            <Sparkles className="size-4" />
            {sparking ? "Thinking…" : "Spark ideas"}
          </Button>
          {suggestions ? (
            <ul className="mt-5 flex flex-col gap-3">
              {suggestions.map((s) => (
                <li
                  key={s.title}
                  className="rounded-lg bg-muted/80 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="min-w-0 flex-1 font-medium leading-snug">{s.title}</p>
                    <Badge variant="muted">{s.effort}</Badge>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.why}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        addIdea({
                          kind: "date",
                          title: s.title,
                          notes: s.why,
                          tags: ["spark"],
                          status: "idea",
                          occasion: "",
                        });
                        toast.success("Saved to ideas");
                      }}
                    >
                      Save as idea
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        addGesture({
                          title: s.title,
                          notes: s.why,
                          date: isoDate(),
                          kind: "other",
                        });
                        toast.success("Logged");
                      }}
                    >
                      I did this
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </Card>
      </Section>

      <Section title="Recent gestures">
        {gestures.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing logged yet.</p>
        ) : (
          <ul className="flex flex-col">
            {gestures.slice(0, 5).map((g) => (
              <li
                key={g.id}
                className="flex items-baseline justify-between gap-4 border-b border-border py-3 last:border-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{g.title}</p>
                  {g.notes ? (
                    <p className="truncate text-xs text-muted-foreground">{g.notes}</p>
                  ) : null}
                </div>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {formatShort(parseIso(g.date))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <GestureDialog
        open={gOpen}
        onOpenChange={setGOpen}
        onSave={(item) => {
          addGesture(item);
          toast.success("Gesture logged");
        }}
      />
      <QualityDialog
        open={qOpen}
        onOpenChange={setQOpen}
        onSave={(item) => {
          addQuality(item);
          toast.success("Time logged");
        }}
      />
      <IdeaDialog
        open={ideaOpen}
        onOpenChange={setIdeaOpen}
        defaultOccasion={ideaOccasion}
        onSave={(item) => {
          addIdea(item);
          toast.success("Idea saved");
        }}
      />
    </div>
  );
}

function Onboarding() {
  const setPartner = useAppStore((s) => s.setPartner);
  const resetDemo = useAppStore((s) => s.resetDemo);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  function start() {
    const n = name.trim();
    if (!n) return;
    setPartner({ name: n, nickname: nickname.trim() });
    toast.success(`Showing up for ${nickname.trim() || n.split(" ")[0]}.`);
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8 pt-6 md:pt-12">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Good Partner
        </p>
        <h1 className="mt-2 font-display text-display tracking-tight">
          Never forget the little things.
        </h1>
        <p className="mt-3 text-muted-foreground">
          Dates, gifts, and the small repeats — saved on this phone, not in an account.
        </p>
      </div>
      <Card className="flex flex-col gap-4 p-5">
        <Field label="Who are you showing up for?" htmlFor="ob-name">
          <Input
            id="ob-name"
            autoComplete="off"
            autoCapitalize="words"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Their name"
          />
        </Field>
        <Field label="Nickname, if you use one" htmlFor="ob-nick">
          <Input
            id="ob-nick"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Optional"
          />
        </Field>
        <Button onClick={start} disabled={!name.trim()}>
          Open the journal
        </Button>
      </Card>
      <button
        type="button"
        className="min-h-11 text-left text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        onClick={() => {
          resetDemo();
          toast.success("Loaded a sample journal");
        }}
      >
        Or explore with a sample journal
      </button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        On iPhone, add it to your Home Screen from Safari.{" "}
        <Link to="/privacy" className="font-medium text-primary underline-offset-4 hover:underline">
          Privacy
        </Link>
        {" · "}
        <Link to="/support" className="font-medium text-primary underline-offset-4 hover:underline">
          Support
        </Link>
      </p>
    </div>
  );
}
