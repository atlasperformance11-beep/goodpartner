import type { ReactNode } from "react";

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl bg-card px-5 py-8 shadow-[var(--shadow-card)]">
      <h3 className="font-display text-lg tracking-tight">{title}</h3>
      <p className="max-w-prose text-sm text-muted-foreground">{body}</p>
      {action}
    </div>
  );
}
