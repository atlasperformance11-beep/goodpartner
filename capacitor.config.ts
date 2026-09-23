import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Good Partner — Capacitor iOS shell
 *
 * The web app is TanStack Start + Nitro (Vercel preset). Production builds are
 * SSR/serverful under `.vercel/output/` and are NOT a self-contained static SPA
 * that Capacitor can ship offline. The native shell therefore loads the live
 * production host via `server.url`, matching the Android TWA approach
 * (https://goodpartner.grok.me).
 *
 * `webDir` points at a minimal `www/` fallback so `npx cap sync` works on
 * Linux/Mac without requiring a local Vite client export. Do not point webDir
 * at `.vercel/output/static` — that tree has no root index.html and depends on
 * Nitro serverless functions.
 *
 * App ID matches Android TWA packageId: me.grok.goodpartner
 */
const config: CapacitorConfig = {
  appId: "me.grok.goodpartner",
  appName: "Good Partner",
  webDir: "www",
  server: {
    // Load the deployed TanStack Start app (required for SSR / API routes).
    url: "https://goodpartner.grok.me",
    // Allow navigation within the production origin only.
    allowNavigation: ["goodpartner.grok.me"],
    cleartext: false,
  },
  ios: {
    contentInset: "automatic",
    preferredContentMode: "mobile",
    scheme: "Good Partner",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: "#F3EFE6",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#F3EFE6",
    },
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true,
    },
  },
};

export default config;
