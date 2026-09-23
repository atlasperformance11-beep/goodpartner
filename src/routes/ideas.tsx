import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/section";
import { IdeaDialog } from "@/components/idea-dialog";
import { useAppStore } from "@/lib/store";
import { IDEA_STATUS_LABEL, type Idea, type IdeaKind, type IdeaStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ideas")({ component: IdeasPage });

type Filter = "all" | IdeaKind | IdeaStatus;

function IdeasPage() {
  const ideas = useAppStore((s) => s.ideas);
  const addIdea = useAppStore((s) => s.addIdea);
  const updateIdea = useAppStore((s) => s.updateIdea);
  const removeIdea = useAppStore((s) => s.removeIdea);
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Idea | null>(null);

  const filtered = useMemo(() => {
    return ideas.filter((i) => {
      if (filter === "all") return true;
      if (filter === "gift" || filter === "date") return i.kind === filter;
      return i.status === filter;
    });
  }, [ideas, filter]);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "gift", label: "Gifts" },
    { id: "date", label: "Dates" },
    { id: "planned", label: "Planned" },
    { id: "done", label: "Done" },
  ];

  return (
    <div>
      <PageHeader
        kicker="The list"
        title="Gifts & date ideas"
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="size-4" />
            Add idea
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "h-9 rounded-full px-3.5 text-sm font-medium transition-colors duration-150",
              filter === f.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Nothing here yet"
          body="Catch the idea when it shows up — a gift, a place, a night that would feel like them."
          action={
            <Button
              size="sm"
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
            >
              Add idea
            </Button>
          }
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {filtered.map((idea) => (
            <li key={idea.id}>
              <Card className="flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant={idea.kind === "gift" ? "default" : "muted"}>
                    {idea.kind === "gift" ? "Gift" : "Date"}
                  </Badge>
                  <Badge variant={idea.status === "planned" ? "warn" : "outline"}>
                    {IDEA_STATUS_LABEL[idea.status]}
                  </Badge>
                </div>
                <h3 className="mt-3 font-display text-lg tracking-tight">{idea.title}</h3>
                {idea.occasion ? (
                  <p className="mt-1 text-xs text-muted-foreground">For {idea.occasion}</p>
                ) : null}
                {idea.notes ? (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/80">
                    {idea.notes}
                  </p>
                ) : (
                  <div className="flex-1" />
                )}
                {idea.tags.length > 0 ? (
                  <p className="mt-3 text-xs text-muted-foreground">{idea.tags.join(" · ")}</p>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-1">
                  {idea.status !== "planned" && idea.status !== "done" ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => updateIdea(idea.id, { status: "planned" })}
                    >
                      Plan it
                    </Button>
                  ) : null}
                  {idea.status !== "done" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        updateIdea(idea.id, { status: "done" });
                        toast.success("Marked done");
                      }}
                    >
                      Mark done
                    </Button>
                  ) : null}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditing(idea);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      removeIdea(idea.id);
                      toast.success("Removed");
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <IdeaDialog
        open={open}
        onOpenChange={setOpen}
        initial={editing}
        onSave={(item) => {
          if (editing) {
            updateIdea(editing.id, item);
            toast.success("Idea updated");
          } else {
            addIdea(item);
            toast.success("Idea saved");
          }
        }}
      />
    </div>
  );
}
