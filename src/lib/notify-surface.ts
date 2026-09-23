export type PermissionState = "granted" | "denied" | "default" | "unsupported";

/** Where phone alerts can actually go. */
export type NotifySurface = "os" | "ios-install" | "iframe" | "blocked" | "unsupported";

export type NotifyCapability = {
  permission: PermissionState;
  surface: NotifySurface;
  canPrompt: boolean;
};

export function classifyNotifySurface(input: {
  supported: boolean;
  permission: Exclude<PermissionState, "unsupported">;
  embedded: boolean;
  ios: boolean;
  standalone: boolean;
}): Pick<NotifyCapability, "surface" | "canPrompt"> {
  if (!input.supported) return { surface: "unsupported", canPrompt: false };
  // Already granted on this origin — show() can work even inside a frame.
  if (input.permission === "granted") return { surface: "os", canPrompt: false };
  // Cross-origin iframes cannot show a permission dialog.
  if (input.embedded) return { surface: "iframe", canPrompt: false };
  // iOS Safari tabs report "denied" without ever showing a prompt.
  if (input.ios && !input.standalone) return { surface: "ios-install", canPrompt: false };
  if (input.permission === "denied") return { surface: "blocked", canPrompt: false };
  return { surface: "os", canPrompt: true };
}
