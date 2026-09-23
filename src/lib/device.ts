export function isIosDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return true;
  return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}

export function isAndroidDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}

export function isStandaloneDisplay(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    window.matchMedia("(display-mode: minimal-ui)").matches ||
    Boolean(nav.standalone)
  );
}

export function isIosSafari(): boolean {
  if (!isIosDevice()) return false;
  const ua = navigator.userAgent;
  if (/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua)) return false;
  return /Safari/.test(ua) || isStandaloneDisplay();
}

export function shouldPromptHomeScreen(): boolean {
  return isIosDevice() && isIosSafari() && !isStandaloneDisplay();
}

export function shouldPromptAndroidInstall(): boolean {
  return isAndroidDevice() && !isStandaloneDisplay();
}

/** Cross-origin iframes throw when reading window.top. */
export function isEmbeddedFrame(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export const INSTALL_DISMISS_KEY = "good-partner-install-dismissed";
