import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { canUnlockFromPaidFlag, confirmCheckout } from "@/lib/checkout";
import { useAppStore } from "@/lib/store";

type UnlockSearch = {
  session_id: string;
  paid: boolean;
};

export const Route = createFileRoute("/unlock")({
  validateSearch: (raw: Record<string, unknown>): UnlockSearch => ({
    session_id: typeof raw.session_id === "string" ? raw.session_id : "",
    paid: raw.paid === "1" || raw.paid === true || raw.paid === "true",
  }),
  component: UnlockPage,
});

function UnlockPage() {
  const { session_id, paid } = Route.useSearch();
  const unlock = useAppStore((s) => s.unlock);
  const navigate = useNavigate();
  const [status, setStatus] = useState<"working" | "ok" | "fail">("working");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (session_id) {
        const result = await confirmCheckout({ data: { sessionId: session_id } });
        if (cancelled) return;
        if (result.paid) {
          unlock();
          setStatus("ok");
          toast.success("You're in. Lifetime unlock on this device.");
          void navigate({ to: "/" });
          return;
        }
        setStatus("fail");
        toast.error("Stripe did not confirm that payment.");
        return;
      }
      if (paid) {
        const allowed = await canUnlockFromPaidFlag();
        if (cancelled) return;
        if (allowed) {
          unlock();
          setStatus("ok");
          toast.success("You're in. Lifetime unlock on this device.");
          void navigate({ to: "/" });
          return;
        }
      }
      setStatus("fail");
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [session_id, paid, unlock, navigate]);

  return (
    <div className="mx-auto max-w-lg pt-10">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Good Partner
      </p>
      <h1 className="mt-2 font-display text-display tracking-tight">
        {status === "fail" ? "Payment not confirmed" : "Unlocking…"}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {status === "fail"
          ? "If you were charged, wait a moment and open this page from your Stripe receipt. Your journal is still on this device."
          : "Checking Stripe, then we’ll open the journal."}
      </p>
    </div>
  );
}
