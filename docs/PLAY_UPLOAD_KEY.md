# Play upload key (Good Partner)

## Why this changed

The previous upload keystore (`android-twa/upload-keystore.jks` / `android/upload-keystore.jks`) and `android/keystore.properties` were committed to the public GitHub repo. Treat that key as **compromised**.

**Do not register the old key as the Play Console upload key.** Do not upload any AAB/APK signed with it.

## Replacement key (box only)

A new upload key was generated locally and is **not** in git:

| Item | Location |
|------|----------|
| Keystore | `/workspace/secrets/goodpartner-upload.jks` (mode 600) |
| Passwords | `/workspace/secrets/goodpartner-upload-passwords.txt` (mode 600) |
| Alias | `upload` |

Public SHA-256 fingerprint (safe to publish in Digital Asset Links):

```
CC:00:3F:06:DE:7B:EE:22:5D:07:2F:91:CB:3F:06:BC:09:AB:0A:F0:96:7F:F5:69:1D:47:84:18:A1:E1:E2:02
```

`twa-manifest.json` and `android-twa/twa-manifest.json` point `signingKey.path` at `/workspace/secrets/goodpartner-upload.jks` for builds on this box. On a Mac or CI, set that path (or copy the keystore) to wherever you keep the secret — never commit the `.jks` or passwords.

## Rebuild a signed AAB

From the repo root (with Bubblewrap + JDK installed):

```bash
cd android-twa
# Ensure twa-manifest.json signingKey.path points at your local copy of the keystore
npx bubblewrap build
# Output: android-twa/app-release-bundle.aab
```

A signed bundle already exists on the box at:

`/workspace/goodpartner-play/android-twa/app-release-bundle.aab`

(package `me.grok.goodpartner`, versionName `1.0.0`, versionCode `1`).

## Live site still needs a redeploy

Repo copies of Digital Asset Links are updated:

- `public/.well-known/assetlinks.json`
- `android/upload-sha256.txt`
- `src/lib/app-meta.ts` (`APP_UPLOAD_SHA256`)

Until `https://goodpartner.grok.me/.well-known/assetlinks.json` is redeployed with the **new** fingerprint, Chrome will not verify this package as the official TWA for the site. The live file still has the old fingerprint until that deploy.

## Play Console

Upload the new AAB to an **internal testing** track first. There is no Play Console access from this agent — upload must be done from an account that owns the app.
