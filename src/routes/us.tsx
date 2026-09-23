import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MoreHorizontal, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChipInput } from "@/components/chip-input";
import { Field } from "@/components/field";
import { PageHeader, Section } from "@/components/section";
import { GestureDialog, QualityDialog, RitualDialog } from "@/components/log-dialogs";
import { useAppStore } from "@/lib/store";
import {
  cadenceLabel,
  formatMinutes,
  formatShort,
  parseIso,
  ritualDue,
} from "@/lib/dates";
import { LOVE_LANGUAGES, type LoveLanguage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { APP_AGE_RATING, APP_PLAY_RATING, APP_PRICE_LABEL, APP_VERSION } from "@/lib/app-meta";
import { downloadJournal, parseJournal } from "@/lib/journal-io";
import { InstallDialog, InstallNowButton, InstallSteps } from "@/components/install-guide";
import { ShareWithBotButton } from "@/components/share-bot-button";
import { NotifySettings } from "@/components/notify-settings";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/us")({ component: UsPage });

function UsPage() {
  const partner = useAppStore((s) => s.partner);
  const setPartner = useAppStore((s) => s.setPartner);
  const rituals = useAppStore((s) => s.rituals);
  const gestures = useAppStore((s) => s.gestures);
  const quality = useAppStore((s) => s.quality);
  const completeRitual = useAppStore((s) => s.completeRitual);
  const removeRitual = useAppStore((s) => s.removeRitual);
  const addRitual = useAppStore((s) => s.addRitual);
  const addGesture = useAppStore((s) => s.addGesture);
  const addQuality = useAppStore((s) => s.addQuality);
  const removeGesture = useAppStore((s) => s.removeGesture);
  const removeQuality = useAppStore((s) => s.removeQuality);
  const resetDemo = useAppStore((s) => s.resetDemo);
  const resetEmpty = useAppStore((s) => s.resetEmpty);
  const loadJournal = useAppStore((s) => s.loadJournal);
  const unlocked = useAppStore((s) => s.unlocked);
  const fileRef = useRef<HTMLInputElement>(null);

  const [gOpen, setGOpen] = useState(false);
  const [qOpen, setQOpen] = useState(false);
  const [rOpen, setROpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const first = partner.nickname || partner.name.split(" ")[0] || "them";

  function toggleLang(lang: LoveLanguage) {
    const has = partner.loveLanguages.includes(lang);
    setPartner({
      loveLanguages: has
        ? partner.loveLanguages.filter((l) => l !== lang)
        : [...partner.loveLanguages, lang],
    });
  }

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        kicker="The two of you"
        title={partner.name || "Your partner"}
        action={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="More">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  resetDemo();
                  toast.success("Sample journal restored");
                }}
              >
                Restore sample journal
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  resetEmpty();
                  toast.message("Journal cleared");
                }}
              >
                Start fresh
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />

      <Card className="rounded-2xl p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name" htmlFor="p-name">
            <Input
              id="p-name"
              value={partner.name}
              onChange={(e) => setPartner({ name: e.target.value })}
            />
          </Field>
          <Field label="Nickname" htmlFor="p-nick">
            <Input
              id="p-nick"
              value={partner.nickname}
              onChange={(e) => setPartner({ nickname: e.target.value })}
            />
          </Field>
          <Field label="Pronouns" htmlFor="p-pro">
            <Input
              id="p-pro"
              value={partner.pronouns}
              onChange={(e) => setPartner({ pronouns: e.target.value })}
            />
          </Field>
          <Field label="How you met" htmlFor="p-met">
            <Input
              id="p-met"
              value={partner.howWeMet}
              onChange={(e) => setPartner({ howWeMet: e.target.value })}
            />
          </Field>
        </div>
        <Field label={`Notes on ${first}`} htmlFor="p-notes" className="mt-4">
          <Textarea
            id="p-notes"
            value={partner.notes}
            onChange={(e) => setPartner({ notes: e.target.value })}
            rows={3}
          />
        </Field>
      </Card>

      <Section title="Love languages">
        <div className="flex flex-wrap gap-2">
          {LOVE_LANGUAGES.map((lang) => {
            const on = partner.loveLanguages.includes(lang);
            return (
              <button
                key={lang}
                type="button"
                onClick={() => toggleLang(lang)}
                className={cn(
                  "h-11 rounded-full px-4 text-sm font-medium transition-colors duration-150",
                  on
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </Section>

      <div className="grid gap-6 md:grid-cols-2">
        <Section title="Likes">
          <ChipInput
            values={partner.likes}
            onChange={(likes) => setPartner({ likes })}
            placeholder="Add a like"
          />
        </Section>
        <Section title="Dislikes">
          <ChipInput
            values={partner.dislikes}
            onChange={(dislikes) => setPartner({ dislikes })}
            placeholder="Add a dislike"
          />
        </Section>
      </div>

      <Section title="Favorites & sizes">
        <Card className="grid gap-4 p-5 sm:grid-cols-2">
          {(
            [
              ["favoriteColor", "Color", partner.favoriteColor],
              ["favoriteFlower", "Flower", partner.favoriteFlower],
              ["favoriteFood", "Food", partner.favoriteFood],
              ["favoriteDrink", "Drink", partner.favoriteDrink],
              ["favoriteMovie", "Movie", partner.favoriteMovie],
              ["favoriteSong", "Song", partner.favoriteSong],
              ["shirtSize", "Shirt", partner.shirtSize],
              ["shoeSize", "Shoes", partner.shoeSize],
              ["ringSize", "Ring", partner.ringSize],
            ] as const
          ).map(([key, label, value]) => (
            <Field key={key} label={label} htmlFor={`p-${key}`}>
              <Input
                id={`p-${key}`}
                value={value}
                onChange={(e) => setPartner({ [key]: e.target.value })}
              />
            </Field>
          ))}
        </Card>
      </Section>

      <Section
        title="Little-thing rituals"
        action={
          <Button size="sm" variant="outline" onClick={() => setROpen(true)}>
            <Plus className="size-4" />
            Add
          </Button>
        }
      >
        {rituals.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Add the small repeats — a note, a Friday plan, a phone-free dinner.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {rituals.map((r) => (
              <li key={r.id}>
                <Card className="flex items-center gap-3 p-3 pl-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {cadenceLabel(r.cadenceDays)}
                      {r.lastDone ? ` · last ${formatShort(parseIso(r.lastDone))}` : " · never done"}
                    </p>
                  </div>
                  {ritualDue(r) ? <Badge variant="warn">Due</Badge> : <Badge variant="muted">Current</Badge>}
                  <Button size="sm" variant="secondary" onClick={() => completeRitual(r.id)}>
                    Done
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => removeRitual(r.id)}>
                    Remove
                  </Button>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section
        title="Gesture log"
        action={
          <Button size="sm" variant="outline" onClick={() => setGOpen(true)}>
            <Plus className="size-4" />
            Log
          </Button>
        }
      >
        {gestures.length === 0 ? (
          <p className="text-sm text-muted-foreground">The things you actually did, in one place.</p>
        ) : (
          <ul className="flex flex-col">
            {gestures.map((g) => (
              <li
                key={g.id}
                className="flex items-start justify-between gap-3 border-b border-border py-3 last:border-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{g.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatShort(parseIso(g.date))} · {g.kind}
                    {g.notes ? ` · ${g.notes}` : ""}
                  </p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => removeGesture(g.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section
        title="Quality time"
        action={
          <Button size="sm" variant="outline" onClick={() => setQOpen(true)}>
            <Plus className="size-4" />
            Log
          </Button>
        }
      >
        {quality.length === 0 ? (
          <p className="text-sm text-muted-foreground">Undistracted hours, counted honestly.</p>
        ) : (
          <ul className="flex flex-col">
            {quality.map((q) => (
              <li
                key={q.id}
                className="flex items-start justify-between gap-3 border-b border-border py-3 last:border-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{q.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatShort(parseIso(q.date))} · {formatMinutes(q.minutes)}
                    {q.notes ? ` · ${q.notes}` : ""}
                  </p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => removeQuality(q.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <NotifySettings />

      <Section title="This device">
        <Card className="overflow-hidden p-0">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <img
                src="/icon-192.png"
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-lg"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Keep it on this phone</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Android: Chrome menu → Install app. iPhone: Share → Add to Home Screen.
                  A Google Play listing still needs a signed Android App Bundle from Play Console.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Android
              </p>
              <InstallSteps compact platform="android" />
            </div>
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                iPhone
              </p>
              <InstallSteps compact platform="ios" />
            </div>
            <InstallNowButton className="mt-3" />
            <ShareWithBotButton className="mt-3 w-full" />
            <Button className="mt-3 w-full" variant="outline" onClick={() => setInstallOpen(true)}>
              Show install steps
            </Button>
          </div>
          <div className="flex flex-col border-t border-border">
            <button
              type="button"
              className="flex min-h-12 items-center px-5 text-left text-sm hover:bg-muted"
              onClick={() => {
                const s = useAppStore.getState();
                downloadJournal({
                  partner: s.partner,
                  dates: s.dates,
                  ideas: s.ideas,
                  gestures: s.gestures,
                  quality: s.quality,
                  rituals: s.rituals,
                  intention: s.intention,
                  weeklyGoal: s.weeklyGoal,
                });
                toast.success("Journal exported");
              }}
            >
              Export journal
            </button>
            <button
              type="button"
              className="flex min-h-12 items-center border-t border-border px-5 text-left text-sm hover:bg-muted"
              onClick={() => fileRef.current?.click()}
            >
              Import journal
            </button>
            <Link
              to="/bot"
              className="flex min-h-12 items-center border-t border-border px-5 text-sm hover:bg-muted"
            >
              Grok Bot
            </Link>
            <Link
              to="/play"
              className="flex min-h-12 items-center border-t border-border px-5 text-sm hover:bg-muted"
            >
              Play listing
            </Link>
            <Link
              to="/privacy"
              className="flex min-h-12 items-center border-t border-border px-5 text-sm hover:bg-muted"
            >
              Privacy
            </Link>
            <Link
              to="/support"
              className="flex min-h-12 items-center border-t border-border px-5 text-sm hover:bg-muted"
            >
              Support
            </Link>
            <button
              type="button"
              className="flex min-h-12 items-center border-t border-border px-5 text-left text-sm text-destructive hover:bg-muted"
              onClick={() => setDeleteOpen(true)}
            >
              Delete journal
            </button>
          </div>
        </Card>
        <p className="text-xs text-muted-foreground">
          Version {APP_VERSION} · Age {APP_AGE_RATING} · Play {APP_PLAY_RATING} ·{" "}
          {unlocked ? `Unlocked ${APP_PRICE_LABEL} lifetime` : "Preview"}{" "}
          · Stored only on this device
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          aria-label="Import journal file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            void (async () => {
              try {
                const text = await file.text();
                const parsed = parseJournal(JSON.parse(text) as unknown);
                if (!parsed) {
                  toast.error("That file is not a Good Partner journal");
                  return;
                }
                loadJournal(parsed);
                toast.success("Journal imported");
              } catch {
                toast.error("Could not read that file");
              }
            })();
          }}
        />
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
      <RitualDialog
        open={rOpen}
        onOpenChange={setROpen}
        onSave={(item) => {
          addRitual(item);
          toast.success("Ritual added");
        }}
      />
      <InstallDialog open={installOpen} onOpenChange={setInstallOpen} />
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this journal?</AlertDialogTitle>
            <AlertDialogDescription>
              Everything on this device — dates, ideas, rituals, and notes — will be removed. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                resetEmpty();
                toast.message("Journal cleared");
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
