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
- [ ] Fix the Android “old home UI returns” issue by removing conflicting DOM polling/injection rather than adding more competing timers.
- [ ] Fix the “Weiter” white screen and confirm level index, animation state, and React state reset consistently.
- [ ] Test canvas responsiveness after orientation changes and the mobile frame-rate cap with touch input.
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
