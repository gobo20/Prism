# Prism stability roadmap

This roadmap separates urgent reliability fixes from feature work. Do not merge a release until the checklist for that release has been tested on desktop and an installed Android PWA.

## v1.7.1 — Stability and PWA fixes

- [x] Make service-worker installation resilient when an optional asset is missing.
- [x] Version the cache and remove only caches owned by Prism/GoboGames.
- [x] Prefer fresh HTML after deployment; use the cached app shell only when offline.
- [x] Register the service worker and request an update when the page loads.
- [x] Set the document language to German.
- [x] Point manifest icons/shortcuts at the existing root-level PNG files and remove screenshot references to missing files.
- [ ] Verify the deployed manifest and icon URLs return HTTP 200 with the expected file type.
- [ ] Fix the Android “old home UI returns” issue by removing conflicting DOM polling/injection rather than adding more competing timers. **Latest user test: home UI still overlaps.**
- [x] User test: the “Weiter” white screen did not recur in the tested build; keep regression testing across more levels.
- [x] User reports gameplay reaches about 60 FPS on the test phone (device measurement cap); completion overlay improved from about 2 FPS to about 10 FPS after the first optimization.
- [ ] Re-test the second mobile completion optimization: reduce confetti from 90 to 18 particles, update at 25 FPS, and shorten it to 1.4 seconds. User-device result still pending.
- [ ] Test canvas responsiveness after orientation changes and touch input.
- [ ] Replace fake ad success and forced-premium localStorage overrides with an explicit web fallback. An unavailable ad must not silently pretend a real ad was watched or a purchase was made.
- [ ] Validate PWABuilder against the deployed Netlify URL and capture any remaining error message.

### v1.7.1 test checklist

- [ ] Open the deployed site in Chrome desktop and Android Chrome.
- [ ] Install the PWA, launch it, close it, and relaunch it.
- [ ] Deploy an updated build and confirm the installed PWA shows the new UI without manually clearing browser data.
- [ ] Play levels 1–3, press “Weiter” after each win, return to the level list, and reopen a completed level.
- [ ] Rotate the phone during the menu and during a level; verify canvas sizing and touch controls.
- [ ] Go offline after the first successful load; verify the cached app shell opens.
- [ ] Run PWABuilder on the deployed URL and verify manifest, icons, and screenshots.

## Next test pass — UI and performance

- [ ] Remove the competing injected home navigation and integrate the home navigation into one source of truth; the old event entry points are hidden pending a clean rebuild.
- [ ] Re-test level-complete FPS after the lightweight-overlay patch; preserve the 60 FPS normal gameplay result.
- [x] Remove the old autumn-event code, 12 event levels, separate event currency and event menu from the test branch.
- [x] Make all 12 skins (including the three autumn-themed looks) purchasable with in-game Coins; Classic remains free.
- [ ] Rebuild the autumn event from scratch using [AUTUMN_EVENT_REDESIGN.md](./AUTUMN_EVENT_REDESIGN.md) only as a design brief; do not reuse the removed event implementation.

## v1.8.0 — Save data and game progression

- Add a versioned save-data schema and safe migration for coins, gems, skins, completed levels, stars, and quest progress.
- Handle malformed or blocked localStorage without leaving the app on a blank screen.
- Make reward/unlock flows idempotent so repeated taps cannot grant duplicate rewards.
- Add regression tests for level completion, next-level navigation, and the 80-level progression.

## v1.9.0 — Quality and maintainability

- Separate the large inline app bundle and DOM-injection scripts into maintainable modules/build output.
- Add a repeatable release checklist and automated checks for JavaScript syntax, manifest JSON, and required public assets.
- Review accessibility, reduced-motion support, audio lifecycle cleanup, and performance on low-end Android devices.
- Only integrate real purchases/ads once their platform adapter and validation flow are explicit and tested.

## Release rule

Keep main deployable. Work in a fix branch, test a preview deployment, open a pull request, and merge only after the checklist passes. A green PWABuilder report alone is not proof that gameplay is regression-free.
