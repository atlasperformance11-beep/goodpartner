import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { addMonths, format, isSameDay, isSameMonth } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/section";
import { DateDialog } from "@/components/date-dialog";
import { IdeaDialog } from "@/components/idea-dialog";
import { useAppStore } from "@/lib/store";
import {
  daysUntilDate,
  formatShort,
  ideasForOccasion,
  inPlanningWindow,
  monthMatrix,
  nextOccurrence,
  occasionCaption,
  yearsTogether,
} from "@/lib/dates";
import { DATE_KIND_LABEL, type ImportantDate } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dates")({ component: DatesPage });

function DatesPage() {
  const dates = useAppStore((s) => s.dates);
  const ideas = useAppStore((s) => s.ideas);
  const addDate = useAppStore((s) => s.addDate);
  const updateDate = useAppStore((s) => s.updateDate);
  const removeDate = useAppStore((s) => s.removeDate);
  const addIdea = useAppStore((s) => s.addIdea);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ImportantDate | null>(null);
  const [prefill, setPrefill] = useState<{ month: number; day: number } | null>(null);
  const [ideaOpen, setIdeaOpen] = useState(false);
  const [ideaOccasion, setIdeaOccasion] = useState("");
  const [month, setMonth] = useState(() => new Date());

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

  const weeks = monthMatrix(month);

  function openNew() {
    setEditing(null);
    setPrefill(null);
    setOpen(true);
  }

  function openEdit(item: ImportantDate) {
    setPrefill(null);
    setEditing(item);
    setOpen(true);
  }

  return (
    <div>
      <PageHeader
        kicker="The calendar"
        title="Dates that matter"
        action={
          <Button onClick={openNew}>
            <Plus className="size-4" />
            Add date
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card className="rounded-2xl p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl tracking-tight">
              {format(month, "MMMM yyyy")}
            </h2>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Previous month"
                onClick={() => setMonth((m) => addMonths(m, -1))}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Next month"
                onClick={() => setMonth((m) => addMonths(m, 1))}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wide text-muted-foreground">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {weeks.flat().map((day) => {
              const inMonth = isSameMonth(day, month);
              const marked = dates.filter(
                (d) =>
                  d.month === day.getMonth() + 1 &&
                  d.day === day.getDate() &&
                  (d.recursYearly || d.year === day.getFullYear()),
              );
              const today = isSameDay(day, new Date());
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => {
                    if (marked[0]) openEdit(marked[0]);
                    else if (inMonth) {
                      setEditing(null);
                      setPrefill({ month: day.getMonth() + 1, day: day.getDate() });
                      setOpen(true);
                    }
                  }}
                  className={cn(
                    "flex min-h-11 flex-col items-center justify-start rounded-lg py-1.5 text-sm tabular-nums transition-colors duration-150",
                    inMonth ? "text-foreground" : "text-muted-foreground/40",
                    today && "bg-sage-soft text-primary",
                    marked.length > 0 && inMonth && !today && "bg-muted",
                  )}
                >
                  {day.getDate()}
                  {marked.length > 0 && inMonth ? (
                    <span className="mt-0.5 size-1 rounded-full bg-primary" />
                  ) : (
                    <span className="mt-0.5 size-1" />
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        <div className="flex flex-col gap-3">
          {upcoming.length === 0 ? (
            <EmptyState
              title="No dates yet"
              body="Add birthdays, anniversaries, and the days you want to meet with intention."
              action={
                <Button onClick={openNew} size="sm">
                  Add a date
                </Button>
              }
            />
          ) : (
            upcoming.map((u) => {
              const related = ideasForOccasion(ideas, u.item.title).filter(
                (i) => i.status !== "done",
              );
              const planning = inPlanningWindow(u.item);
              const caption = occasionCaption(u.item, u.years);
              return (
                <Card key={u.item.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg tracking-tight">
                          {u.item.title}
                        </h3>
                        <Badge variant="muted">{DATE_KIND_LABEL[u.item.kind]}</Badge>
                        {planning ? <Badge variant="warn">Plan</Badge> : null}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatShort(u.next)}
                        {caption ? ` · ${caption}` : ""}
                        {u.item.recursYearly ? " · yearly" : ""}
                      </p>
                      {u.item.notes ? (
                        <p className="mt-2 text-sm leading-relaxed">{u.item.notes}</p>
                      ) : null}
                      {related.length > 0 ? (
                        <p className="mt-2 text-xs text-muted-foreground">
                          {related.map((i) => i.title).join(" · ")}
                        </p>
                      ) : null}
                    </div>
                    <p className="shrink-0 text-right">
                      <span className="block font-display text-2xl tabular-nums leading-none tracking-tight text-primary">
                        {u.days}
                      </span>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        {u.days === 1 ? "day" : "days"}
                      </span>
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setIdeaOccasion(u.item.title);
                        setIdeaOpen(true);
                      }}
                    >
                      Plan a gift or date
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => openEdit(u.item)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        removeDate(u.item.id);
                        toast.success("Date removed");
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>

      <DateDialog
        open={open}
        onOpenChange={setOpen}
        initial={editing}
        prefill={prefill}
        onSave={(item) => {
          if (editing) {
            updateDate(editing.id, item);
            toast.success("Date updated");
          } else {
            addDate(item);
            toast.success("Date added");
          }
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
