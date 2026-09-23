type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

let deferred: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

export function captureInstallPrompt(event: Event) {
  event.preventDefault();
  deferred = event as BeforeInstallPromptEvent;
  emit();
}

export function clearInstallPrompt() {
  deferred = null;
  emit();
}

export function hasInstallPrompt(): boolean {
  return deferred !== null;
}

export function subscribeInstallPrompt(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export async function promptInstall(): Promise<"accepted" | "dismissed" | "unavailable"> {
  if (!deferred) return "unavailable";
  const event = deferred;
  deferred = null;
  emit();
  await event.prompt();
  const { outcome } = await event.userChoice;
  return outcome;
}
