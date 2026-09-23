import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { APP_NAME } from "@/lib/app-meta";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-prose">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {APP_NAME}
      </p>
      <h1 className="mt-2 font-display text-display tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Updated {updated}</p>
      <div className="legal-copy mt-8 flex flex-col gap-5 text-sm leading-relaxed text-foreground/90">
        {children}
      </div>
      <p className="mt-10">
        <Link to="/" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          Back to Today
        </Link>
      </p>
    </article>
  );
}
