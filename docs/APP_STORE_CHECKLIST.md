# App Store readiness — Good Partner (Capacitor iOS)

This checklist prepares the **existing** Good Partner web app
(`https://goodpartner.grok.me`) for App Store submission via a Capacitor iOS
shell. Android already ships as a Trusted Web Activity (`me.grok.goodpartner`).

**App ID (bundle ID):** `me.grok.goodpartner` (matches Android TWA packageId)  
**Display name:** Good Partner  
**Privacy policy (in-app):** `/privacy` → `https://goodpartner.grok.me/privacy`  
**Support:** `/support` → `https://goodpartner.grok.me/support`

---

## Architecture decision (read this first)

| Choice | Value | Why |
|--------|--------|-----|
| `appId` | `me.grok.goodpartner` | Match Android TWA / Digital Asset Links package |
| `webDir` | `www/` | Minimal tracked fallback so `npx cap sync` works |
| `server.url` | `https://goodpartner.grok.me` | Vite + TanStack Start + Nitro (Vercel) is **SSR/serverful**. A production build is not a self-contained static SPA Capacitor can wrap offline. Same pattern as the Android TWA host. |

Do **not** point `webDir` at `.vercel/output/static` — that tree has no root
`index.html` and depends on Nitro serverless functions.

---

## Mac-only steps (cannot finish on Linux CI/sandbox)

This Linux environment can install Capacitor config and, when possible, generate
an `ios/` tree with `npx cap add ios`. CocoaPods, Xcode signing, Simulator, and
Archive all require a Mac.

1. **Install toolchain**
   - macOS with Xcode (current stable) + Command Line Tools
   - Xcode → Settings → Accounts → add your Apple ID
   - CocoaPods: `sudo gem install cocoapods` (or Homebrew `pod`)
   - Node.js **≥ 22** (Capacitor CLI 8 requires it)

2. **Clone & install**
   ```bash
   git clone https://github.com/atlasperformance11-beep/goodpartner.git
   cd goodpartner
   npm ci
   ```

3. **Generate / refresh the iOS project**
   ```bash
   # If ios/ is missing on your branch:
   npx cap add ios
   # Always after config or www changes:
   npm run cap:sync
   # or: npm run build:ios
   ```

4. **Open in Xcode**
   ```bash
   npm run cap:ios
   # opens ios/App/App.xcworkspace (prefer workspace over .xcodeproj after pods)
   ```

5. **Signing & bundle**
   - Select the **App** target → Signing & Capabilities
   - Team: your Apple Developer team
   - Bundle Identifier: `me.grok.goodpartner` (must match App Store Connect)
   - Automatically manage signing (or install Distribution cert + App Store profile)

6. **Capabilities to review**
   - No Push Notifications entitlement is required today (privacy: local banners only)
   - If you add true remote push later, enable Push + APNs
   - In-App Purchase capability **required** before shipping paid unlock on iOS (see policy gaps)

7. **Run on Simulator / device**, then **Product → Archive** → Distribute App → App Store Connect

8. **TestFlight** internal/external testing before App Review

---

## Apple Developer / App Store Connect

- [ ] Enroll in the [Apple Developer Program](https://developer.apple.com/programs/) ($99 USD / year)
- [ ] App Store Connect → **My Apps** → **+** → New App
  - Platforms: iOS
  - Name: Good Partner
  - Bundle ID: `me.grok.goodpartner` (create the ID in Certificates, Identifiers & Profiles if needed)
  - SKU: e.g. `goodpartner-ios-001`
  - Primary language: English (U.S.)
- [ ] Age rating questionnaire → align with **4+** (see `APP_AGE_RATING` in `src/lib/app-meta.ts`)
- [ ] Category: Lifestyle (or Productivity) — relationship **journal**, not therapy
- [ ] Privacy Policy URL: `https://goodpartner.grok.me/privacy`
- [ ] Support URL: `https://goodpartner.grok.me/support`
- [ ] App Privacy (nutrition labels) in App Store Connect — see section below
- [ ] Screenshots (required sizes) — see section below
- [ ] App Review notes — see template below

---

## App Privacy (nutrition labels)

From `src/routes/privacy.tsx` and current product behavior:

| Data type | Collect? | Notes |
|-----------|----------|--------|
| Contact Info / Account | **No** | No sign-in; journal is local-only |
| Location / Contacts / Photos / Mic | **No** | |
| Identifiers / Advertising | **No** | No ads / tracking claimed |
| Purchases | **Declare if StoreKit IAP ships** | Product receipt metadata handled by Apple |
| Other data linked to user | Spark (optional) | Optional “Spark ideas” may send journal snippets you already typed to xAI — disclose as optional product interaction / diagnostics only if Apple’s form requires; do not claim “never leaves device” for Spark |

Fill App Store Connect to match the live privacy page. If Spark disclosure is incomplete for iOS, update `/privacy` before submit.

---

## Account deletion (Guideline 5.1.1(v))

**Current product stance:** no cloud account. Us tab offers **Delete journal** (wipes local storage). Privacy page states there is no server-side account.

- [x] Local wipe exists (`src/routes/us.tsx` — Delete journal)
- [ ] If you later enable Better Auth / cloud sync for real users, you **must** add in-app account deletion and a web deletion path within the required window
- **Code note:** `better-auth` scaffolding exists under `src/lib/auth/` (Grok App Builder), but product routes/privacy currently present a **no-account** journal. Do not enable cloud accounts without closing the deletion requirement.

---

## Payments / IAP (Guideline 3.1.1) — policy gap

| Surface | Unlock today |
|---------|----------------|
| Web / Chrome | Stripe Payment Link (`APP_PAYMENT_LINK` — still **test** mode in `app-meta`) |
| Google Play TWA | Play Billing SKU `lifetime_unlock` |
| **iOS Capacitor shell** | Would still hit the **web Stripe** unlock unless you add StoreKit |

**You must not ship App Store binary that unlocks digital features via Stripe (or external checkout) inside the iOS app.** Required work before submit:

- [ ] Add StoreKit 2 / Capacitor Purchases (or RevenueCat, etc.) for `lifetime_unlock` (or App Store product id)
- [ ] Detect Capacitor iOS and route Unlock UI to IAP only
- [ ] Keep Stripe for web; keep Play Billing for Android
- [ ] Replace test Stripe link with live credentials for web only
- [ ] App Review notes: explain multi-platform billing split

Play Billing is already called out on `/play` and `/privacy`. Extend privacy Payments section to mention **App Store In-App Purchase** once StoreKit lands.

---

## ATS / networking

- Production URL is HTTPS (`goodpartner.grok.me`) — App Transport Security OK with default settings
- `capacitor.config.ts` sets `cleartext: false`
- Allow-navigation limited to `goodpartner.grok.me`
- Stripe / xAI Spark hosts: if WKWebView navigates off-origin for checkout or OAuth, you may need additional `allowNavigation` entries **or** prefer in-app StoreKit so Stripe never opens inside the shell

---

## Screenshots & assets

Repo already has `screenshots/` and `public/store/`. App Store Connect typically needs:

| Device class | Common sizes (px) |
|--------------|-------------------|
| iPhone 6.7" | 1290 × 2796 (or current ASC listed size) |
| iPhone 6.5" | 1284 × 2778 |
| iPad (if you ship iPad) | 2048 × 2732 |

- [ ] Capture from Simulator with the Capacitor shell (not only browser)
- [ ] App icon 1024×1024 (no alpha) for App Store Connect
- [ ] Use existing PWA icons (`public/icon-512.png`) as a starting point; export proper iOS AppIcon set in Xcode Assets

---

## App Review notes (template)

Paste into App Store Connect → App Review Information:

```
Good Partner is a private, on-device relationship JOURNAL for dates, gift ideas,
and quality time. It is NOT therapy, counseling, medical advice, or a crisis
service. There is no social feed and no public UGC.

Demo account: not required — no sign-in. Launch the app and use Preview / sample
data, or enter any local notes. Unlock is a one-time lifetime purchase
(StoreKit product: <SET_WHEN_CREATED>).

Privacy policy: https://goodpartner.grok.me/privacy
Support: https://goodpartner.grok.me/support
```

---

## npm scripts added

| Script | Purpose |
|--------|---------|
| `npm run cap:sync` | `npx cap sync` (copy www + update native projects) |
| `npm run cap:ios` | Open Xcode (`npx cap open ios`) |
| `npm run cap:add:ios` | `npx cap add ios` (first-time / regenerate) |
| `npm run build:ios` | Sync iOS native project (web is remote via `server.url`) |

---

## Remaining user checklist (short)

1. Apple Developer Program enrollment  
2. Create bundle id + App Store Connect app record  
3. On a Mac: `npm ci` → `npx cap add ios` (if needed) → `npm run cap:sync` → Xcode signing  
4. Implement **StoreKit IAP** before submission (do not use Stripe inside iOS)  
5. Privacy nutrition labels + update `/privacy` for App Store IAP  
6. Screenshots + 1024 icon  
7. TestFlight → App Review with “not therapy” notes  
8. Confirm live Stripe link for **web only**; Play SKU already documented  
