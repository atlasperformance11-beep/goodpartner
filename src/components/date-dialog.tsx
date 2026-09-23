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
import { defaultRemindDays, remindDaysFromWindow, remindWindow } from "@/lib/dates";
import type { DateKind, ImportantDate } from "@/lib/types";

const emptyForm = {
  title: "",
  kind: "custom" as DateKind,
  month: 1,
  day: 1,
  year: "",
  recursYearly: true,
  notes: "",
  window: 14,
};

export function DateDialog({
  open,
  onOpenChange,
  initial,
  prefill,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: ImportantDate | null;
  prefill?: { month: number; day: number } | null;
  onSave: (item: Omit<ImportantDate, "id">) => void;
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setForm({
        title: initial.title,
        kind: initial.kind,
        month: initial.month,
        day: initial.day,
        year: initial.year ? String(initial.year) : "",
        recursYearly: initial.recursYearly,
        notes: initial.notes,
        window: remindWindow(initial),
      });
    } else {
      const now = new Date();
      setForm({
        ...emptyForm,
        month: prefill?.month ?? now.getMonth() + 1,
        day: prefill?.day ?? now.getDate(),
      });
    }
  }, [open, initial, prefill]);

  function setKind(kind: DateKind) {
    setForm((f) => ({
      ...f,
      kind,
      window: initial ? f.window : Math.max(...defaultRemindDays(kind)),
    }));
  }

  function submit() {
    const title = form.title.trim();
    if (!title) return;
    const year = form.year ? Number(form.year) : undefined;
    onSave({
      title,
      kind: form.kind,
      month: form.month,
      day: form.day,
      year: Number.isFinite(year) ? year : undefined,
      recursYearly: form.recursYearly,
      notes: form.notes.trim(),
      remindDays: remindDaysFromWindow(form.window),
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit date" : "Add a date"}</DialogTitle>
          <DialogDescription>
            Birthdays, anniversaries, firsts, and the days that matter.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="Title" htmlFor="date-title">
            <Input
              id="date-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Maya's birthday"
            />
          </Field>
          <Field label="Kind">
            <NativeSelect
              value={form.kind}
              onChange={(e) => setKind(e.target.value as DateKind)}
            >
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="first">Firsts</option>
              <option value="custom">Occasion</option>
            </NativeSelect>
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Month">
              <NativeSelect
                value={form.month}
                onChange={(e) => setForm({ ...form, month: Number(e.target.value) })}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(2000, i, 1).toLocaleString("en", { month: "short" })}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Day">
              <Input
                type="number"
                min={1}
                max={31}
                value={form.day}
                onChange={(e) => setForm({ ...form, day: Number(e.target.value) })}
              />
            </Field>
            <Field label="Year">
              <Input
                type="number"
                min={1900}
                max={2100}
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="Optional"
              />
            </Field>
          </div>
          <label className="flex min-h-11 items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={form.recursYearly}
              onChange={(e) => setForm({ ...form, recursYearly: e.target.checked })}
              className="size-4 accent-primary"
            />
            Repeats every year
          </label>
          <Field label="Start reminding">
            <NativeSelect
              value={form.window}
              onChange={(e) => setForm({ ...form, window: Number(e.target.value) })}
            >
              <option value={7}>1 week before</option>
              <option value={14}>2 weeks before</option>
              <option value={21}>3 weeks before</option>
              <option value={30}>A month before</option>
            </NativeSelect>
          </Field>
          <Field label="Notes" htmlFor="date-notes">
            <Textarea
              id="date-notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="What would make this day feel considered?"
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={!form.title.trim()}>
            Save date
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
