import {
  APP_ANDROID_PACKAGE,
  APP_NAME,
  APP_ORIGIN,
  APP_PLAY_RATING,
  APP_PLAY_SKU,
  APP_PRICE_LABEL,
  APP_SHORT_DESCRIPTION,
  APP_TAGLINE,
  APP_UPLOAD_SHA256,
  APP_VERSION,
} from "./app-meta";

export const PLAY_PRIVACY_URL = `${APP_ORIGIN}/privacy`;
export const PLAY_SUPPORT_URL = `${APP_ORIGIN}/support`;
export const PLAY_MANIFEST_URL = `${APP_ORIGIN}/manifest.webmanifest`;

export const PLAY_FULL_DESCRIPTION = `${APP_TAGLINE}

A quiet journal for the dates that sneak up, the gifts that should feel considered, and the little rituals that keep a partnership kind. Pay once (${APP_PRICE_LABEL} lifetime). There is no account, no ads, and no cloud copy — the journal lives on this phone.

Remember birthdays and anniversaries with lead times you set. Keep gift and date ideas tied to the occasion. Log gestures and undistracted hours. Spark a suggestion when you need a nudge — only when you ask. Reminders check when you open the app; lock-screen banners need your allow.

${APP_NAME} ${APP_VERSION}. Category: Lifestyle. Content rating: ${APP_PLAY_RATING}.`;

export const PLAY_IAP_TITLE = "Lifetime unlock";

export const PLAY_IAP_DESCRIPTION = `Unlock ${APP_NAME} forever on this Google account. One payment, no subscription. The journal still lives only on this phone.`;

export const PLAY_DATA_SAFETY = `Does the app collect or share user data? Optional only — see below.
Location, contacts, photos, microphone, files: not collected.
Personal info (name, email, phone): not collected. There is no account.
Financial: Play Store purchases go through Google Play Billing. Website / Chrome purchases go through Stripe. We never see or store card numbers.
App activity: the journal stays in on-device storage. Spark, if tapped, sends first name, likes, love languages, upcoming dates, and recent gestures to xAI to write suggestions. It is not sent on launch.
Device IDs / advertising ID: not collected. No ads, no analytics SDK.
Data is encrypted in transit (HTTPS). Journal data is not encrypted at rest beyond the phone.
Data is not sold. Users can export or delete the journal on the Us tab.
Not designed for children. Target age 18+ even though the content is ${APP_PLAY_RATING}.
Privacy policy: ${PLAY_PRIVACY_URL}`;

export const PLAY_CONTENT_RATING = `IARC questionnaire
Violence: none
Sexual content: none
Language: none
Controlled substances: none
User interaction / UGC: none (private journal, not shared)
Share location: no
Digital purchases: yes — optional one-time ${APP_PRICE_LABEL} unlock
Age: ${APP_PLAY_RATING} / 18+ target audience (Older Users)
Ads: no`;

export const PLAY_IAP_CONSOLE = `Play Console → Monetize → In-app products → Create product
Product ID: ${APP_PLAY_SKU}
Product type: Managed product (one-time, not a subscription)
Name: ${PLAY_IAP_TITLE}
Description: ${PLAY_IAP_DESCRIPTION}
Default price: ${APP_PRICE_LABEL} USD
Status: Active`;

export const PLAY_PWABUILDER = `Open https://www.pwabuilder.com and package ${APP_ORIGIN}
Use the Google Play tab with these exact values:

Package ID: ${APP_ANDROID_PACKAGE}
App name: ${APP_NAME}
Short name: ${APP_NAME}
Host: ${APP_ORIGIN}
Start URL: /
App version: ${APP_VERSION}
App version code: 1
Theme color: #F3EFE6
Background color: #F3EFE6
Icon URL: ${APP_ORIGIN}/icon-512.png
Maskable icon URL: ${APP_ORIGIN}/icon-512-maskable.png
Manifest URL: ${PLAY_MANIFEST_URL}
Google Play billing: On
Notification delegation: On
Location delegation: Off
Signing key: New (first upload) or Mine (later versions)
Fallback: Custom Tabs
Orientation: Portrait`;

export const PLAY_ASSETLINKS_NOTE = `Digital Asset Links already lists package ${APP_ANDROID_PACKAGE} and the upload-key SHA-256:

${APP_UPLOAD_SHA256}

After the first App Bundle upload, open Play Console → Test and release → App integrity → App signing. Copy the App signing key certificate SHA-256 and send it back here. It becomes the second fingerprint so the Play-distributed app opens full screen.`;
