import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  kicker,
  title,
  action,
}: {
  kicker?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        {kicker ? (
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {kicker}
          </p>
        ) : null}
        <h1 className="font-display text-title tracking-tight">
          {title}
        </h1>
      </div>
      {action}
    </header>
  );
}

export function Section({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
