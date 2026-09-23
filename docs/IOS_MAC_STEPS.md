# Mac: finish / regenerate the `ios/` project

Linux CI can run `npx cap add ios` and produce most of the tree, but binary
AppIcon/Splash PNGs and a full `project.pbxproj` are easiest to finalize on a Mac
(and CocoaPods/Xcode signing only work on macOS).

If `ios/App/App.xcodeproj/project.pbxproj` is missing after pulling this branch,
or Xcode assets look empty:

```bash
cd goodpartner
npm ci          # Node >= 22; refreshes package-lock with Capacitor deps
rm -rf ios
npx cap add ios
npm run cap:sync
npm run cap:ios
```

Then set the App Icon from `public/icon-512.png` (or `public/icon-512-maskable.png`)
in Xcode → Assets → AppIcon, sign with your team, Archive → TestFlight.

See [APP_STORE_CHECKLIST.md](./APP_STORE_CHECKLIST.md) for App Store Connect steps
and the StoreKit / Stripe policy gap.
