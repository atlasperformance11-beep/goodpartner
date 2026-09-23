import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ChipInput({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  function add(raw: string) {
    const v = raw.trim();
    if (!v || values.includes(v)) {
      setDraft("");
      return;
    }
    onChange([...values, v]);
    setDraft("");
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(draft);
    }
    if (e.key === "Backspace" && !draft && values.length) {
      onChange(values.slice(0, -1));
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {values.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs"
            >
              {v}
              <button
                type="button"
                className="relative size-5 after:absolute after:left-1/2 after:top-1/2 after:size-10 after:-translate-x-1/2 after:-translate-y-1/2"
                onClick={() => onChange(values.filter((x) => x !== v))}
                aria-label={`Remove ${v}`}
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      ) : null}
      <Input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKey}
        onBlur={() => add(draft)}
        placeholder={placeholder ?? "Type and press Enter"}
      />
    </div>
  );
}
