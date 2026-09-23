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
import { isoDate } from "@/lib/dates";
import type { GestureKind } from "@/lib/types";

export function GestureDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (item: {
    title: string;
    notes: string;
    date: string;
    kind: GestureKind;
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(isoDate());
  const [kind, setKind] = useState<GestureKind>("note");

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setNotes("");
    setDate(isoDate());
    setKind("note");
  }, [open]);

  function submit() {
    if (!title.trim()) return;
    onSave({ title: title.trim(), notes: notes.trim(), date, kind });
    setTitle("");
    setNotes("");
    setDate(isoDate());
    setKind("note");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log a gesture</DialogTitle>
          <DialogDescription>
            The small thing you actually did. It counts.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="What did you do?" htmlFor="g-title">
            <Input
              id="g-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Left a note in her laptop sleeve"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kind">
              <NativeSelect
                value={kind}
                onChange={(e) => setKind(e.target.value as GestureKind)}
              >
                <option value="note">Note</option>
                <option value="gift">Gift</option>
                <option value="help">Help</option>
                <option value="surprise">Surprise</option>
                <option value="time">Time</option>
                <option value="other">Other</option>
              </NativeSelect>
            </Field>
            <Field label="When" htmlFor="g-date">
              <Input
                id="g-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field>
          </div>
          <Field label="Notes" htmlFor="g-notes">
            <Textarea
              id="g-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={!title.trim()}>
            Log it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function QualityDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (item: {
    title: string;
    notes: string;
    date: string;
    minutes: number;
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(isoDate());
  const [minutes, setMinutes] = useState(60);

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setNotes("");
    setDate(isoDate());
    setMinutes(60);
  }, [open]);

  function submit() {
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      notes: notes.trim(),
      date,
      minutes: Math.max(5, minutes),
    });
    setTitle("");
    setNotes("");
    setDate(isoDate());
    setMinutes(60);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log quality time</DialogTitle>
          <DialogDescription>
            Undistracted time together — even a short walk.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="What did you do?" htmlFor="q-title">
            <Input
              id="q-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Evening walk, no phones"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Minutes" htmlFor="q-min">
              <Input
                id="q-min"
                type="number"
                min={5}
                step={5}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              />
            </Field>
            <Field label="When" htmlFor="q-date">
              <Input
                id="q-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field>
          </div>
          <Field label="Notes" htmlFor="q-notes">
            <Textarea
              id="q-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={!title.trim()}>
            Log time
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function RitualDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (item: { title: string; cadenceDays: number; notes: string; lastDone: string | null }) => void;
}) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [cadence, setCadence] = useState(7);

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setNotes("");
    setCadence(7);
  }, [open]);

  function submit() {
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      notes: notes.trim(),
      cadenceDays: cadence,
      lastDone: null,
    });
    setTitle("");
    setNotes("");
    setCadence(7);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New little thing</DialogTitle>
          <DialogDescription>
            A small ritual you want to keep. Daily, weekly, or your own cadence.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="Ritual" htmlFor="r-title">
            <Input
              id="r-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Leave a small note"
            />
          </Field>
          <Field label="How often">
            <NativeSelect
              value={cadence}
              onChange={(e) => setCadence(Number(e.target.value))}
            >
              <option value={1}>Every day</option>
              <option value={3}>Every 3 days</option>
              <option value={5}>Every 5 days</option>
              <option value={7}>Every week</option>
              <option value={14}>Every 2 weeks</option>
            </NativeSelect>
          </Field>
          <Field label="Notes" htmlFor="r-notes">
            <Textarea
              id="r-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={!title.trim()}>
            Add ritual
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
