import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyBlock({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard can be blocked in embedded preview */
    }
  }

  return (
    <div className={cn("rounded-xl bg-card p-4 shadow-[var(--shadow-card)]", className)}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        <button
          type="button"
          onClick={() => void copy()}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-foreground/90">
        {value}
      </pre>
    </div>
  );
}
