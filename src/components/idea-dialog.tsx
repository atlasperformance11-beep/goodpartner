import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, NativeSelect } from "@/components/field";
import type { Idea, IdeaKind, IdeaStatus } from "@/lib/types";

const emptyForm = {
  title: "",
  kind: "gift" as IdeaKind,
  status: "idea" as IdeaStatus,
  occasion: "",
  tags: "",
  notes: "",
};

export function IdeaDialog({
  open,
  onOpenChange,
  initial,
  defaultKind,
  defaultOccasion,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Idea | null;
  defaultKind?: IdeaKind;
  defaultOccasion?: string;
  onSave: (item: Omit<Idea, "id" | "createdAt">) => void;
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setForm({
        title: initial.title,
        kind: initial.kind,
        status: initial.status,
        occasion: initial.occasion,
        tags: initial.tags.join(", "),
        notes: initial.notes,
      });
    } else {
      setForm({
        ...emptyForm,
        kind: defaultKind ?? "gift",
        occasion: defaultOccasion ?? "",
      });
    }
  }, [open, initial, defaultKind, defaultOccasion]);

  function submit() {
    const title = form.title.trim();
    if (!title) return;
    onSave({
      title,
      kind: form.kind,
      status: form.status,
      occasion: form.occasion.trim(),
      notes: form.notes.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit idea" : "Save an idea"}</DialogTitle>
          <DialogDescription>
            Gifts and dates, waiting for the right moment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="Title" htmlFor="idea-title">
            <Input
              id="idea-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Sunset picnic at Red Rocks"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kind">
              <NativeSelect
                value={form.kind}
                onChange={(e) => setForm({ ...form, kind: e.target.value as IdeaKind })}
              >
                <option value="gift">Gift</option>
                <option value="date">Date</option>
              </NativeSelect>
            </Field>
            <Field label="Status">
              <NativeSelect
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as IdeaStatus })
                }
              >
                <option value="idea">Idea</option>
                <option value="planned">Planned</option>
                <option value="done">Done</option>
              </NativeSelect>
            </Field>
          </div>
          <Field label="Occasion" htmlFor="idea-occ">
            <Input
              id="idea-occ"
              value={form.occasion}
              onChange={(e) => setForm({ ...form, occasion: e.target.value })}
              placeholder="Birthday, just because…"
            />
          </Field>
          <Field label="Tags" htmlFor="idea-tags">
            <Input
              id="idea-tags"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="outdoors, coffee, home"
            />
          </Field>
          <Field label="Notes" htmlFor="idea-notes">
            <Textarea
              id="idea-notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="The details that make it theirs."
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={!form.title.trim()}>
            Save idea
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
