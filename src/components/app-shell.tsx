import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Calendar, Gift, House, UserRound } from "lucide-react";
import { Mark } from "@/components/mark";
import { InstallBanner } from "@/components/install-guide";
import { NotifyWatcher } from "@/components/notify-watcher";
import { PwaRegister } from "@/components/pwa-register";
import { PlayRestore } from "@/components/play-restore";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Today", icon: House },
  { to: "/dates", label: "Dates", icon: Calendar },
  { to: "/ideas", label: "Ideas", icon: Gift },
  { to: "/us", label: "Us", icon: UserRound },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const partnerName = useAppStore((s) => s.partner.name);
  const unlocked = useAppStore((s) => s.unlocked);
  const previewingSample = useAppStore((s) => s.previewingSample);
  const showChrome = Boolean(partnerName.trim());
  const showPreviewBar = previewingSample && !unlocked;
  const legal =
    pathname === "/privacy" ||
    pathname === "/support" ||
    pathname === "/unlock" ||
    pathname === "/play" ||
    pathname === "/bot";

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <PwaRegister />
      <PlayRestore />
      <NotifyWatcher />
      {showChrome ? (
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-border bg-card/70 px-4 py-6 pt-[max(1.5rem,env(safe-area-inset-top))] md:flex">
          <Link to="/" className="mb-8 flex items-center gap-2.5 px-2">
            <Mark className="size-8 text-primary" />
            <span className="font-display text-lg tracking-tight">Good Partner</span>
          </Link>
          <nav className="flex flex-1 flex-col gap-1">
            {NAV.map((item) => {
              const active =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150",
                    active
                      ? "bg-sage-soft text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <p className="px-3 text-xs leading-relaxed text-muted-foreground">
            Never forget the little things.
          </p>
        </aside>
      ) : null}

      <div className={showChrome ? "md:pl-56" : ""}>
        {showPreviewBar ? (
          <div className="border-b border-border bg-sage-soft px-4 py-2.5 text-center text-sm text-primary">
            Sample journal — preview only.{" "}
            <button
              type="button"
              className="font-medium underline-offset-4 hover:underline"
              onClick={() => {
                useAppStore.getState().resetEmpty();
              }}
            >
              Unlock yours for $19
            </button>
          </div>
        ) : null}
        <div
          className={cn(
            "mx-auto w-full max-w-5xl px-4 pt-[max(1.5rem,env(safe-area-inset-top))]",
            showChrome ? "pb-28 md:px-8 md:pb-12 md:pt-10" : "pb-16 md:px-8",
            legal && "md:pt-10",
          )}
        >
          {children}
        </div>
      </div>

      {showChrome ? (
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] md:hidden">
          <ul className="grid grid-cols-4">
            {NAV.map((item) => {
              const active =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={active ? 2.1 : 1.75} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}

      <InstallBanner offsetNav={showChrome} />
    </div>
  );
}
