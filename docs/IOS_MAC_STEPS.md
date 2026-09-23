# Mac: finish the Capacitor iOS project

Linux generated most of the Capacitor `ios/` tree, but **Xcode signing, Simulator,
Archive, and AppIcon/Splash PNG assets** need a Mac. Prefer regenerating a clean
`ios/` project rather than repairing a partial tree.

## Recommended (clean regenerate)

```bash
cd goodpartner
git checkout feat/capacitor-ios-app-store
# Node.js >= 22 (Capacitor CLI 8)
npm ci   # or: npm install  (refreshes lockfile with Capacitor deps)

rm -rf ios
npx cap add ios
npm run cap:sync
npm run cap:ios   # opens Xcode
```

Then in Xcode:

1. Select the **App** target → Signing & Capabilities → your Team
2. Confirm Bundle ID `me.grok.goodpartner`
3. Set App Icon from `public/icon-512.png` (Assets → AppIcon)
4. Run on Simulator (shell loads `https://goodpartner.grok.me` via `server.url`)
5. Product → Archive → Distribute → App Store Connect / TestFlight

## Why `server.url`?

TanStack Start + Nitro (Vercel) is SSR. Capacitor cannot wrap a self-contained
static export the way a pure Vite SPA can. The native shell loads the live host
(same idea as the Android TWA). See `capacitor.config.ts` and
`docs/APP_STORE_CHECKLIST.md`.

## Before App Store submit

Implement **StoreKit IAP** for the lifetime unlock inside the iOS app. Do not ship
Stripe checkout inside the App Store binary (Guideline 3.1.1). Details in
`docs/APP_STORE_CHECKLIST.md`.
