# Christmas-Event — GoboGames Prism

## Ziel
Ein eigenständiges, winterliches Mini-Event, dessen Rätsel auf derselben Grundidee wie die Hauptlevel beruhen: Spiegel drehen, Laser umlenken und ein Ziel treffen. Die normalen 80 Hauptlevel und deren Speicherstände bleiben unangetastet.

## Aktueller Testumfang
- Weihnachts-Hub mit 12 Event-Leveln.
- Winterliches Farbschema: Nachtblau, Eiscyan, Tannengrün, Schneeflocken und goldene Sterne.
- Eigenes responsives Spielfeld; Spiegel werden per Tippen gedreht.
- Event-Fortschritt liegt separat unter `prism-christmas-completed-v1`.
- Erstmaliger Levelabschluss schreibt die Event-Coins in `prism-coins`; erneutes Abschließen vergibt keine zweite Belohnung.
- Event öffnet über den bisherigen Event-Platz auf der Startseite, jetzt mit Weihnachtsbeschriftung.

## Echtgeld-Shop
- Eigener Bereich mit Preisen in Euro und einem separaten Tab für Coin-Pakete.
- Der aktuelle Stand ist nur die Storefront/UI. Checkout-Buttons bleiben deaktiviert, bis ein echter Zahlungsanbieter bzw. Google Play Billing und eine sichere serverseitige Kaufprüfung eingerichtet sind.
- Keine Fake-Käufe, keine Abbuchungen und keine Freischaltung gegen Echtgeld, solange die Zahlungsintegration nicht konfiguriert ist.

## Vor Release testen
- Alle 12 Event-Level auf Lösbarkeit prüfen.
- Mehrfaches Abschließen eines Levels darf keine doppelten Coins vergeben.
- Fortschritt bleibt nach Reload erhalten.
- Event-Canvas passt sich an Mobilgeräte und Rotation an.
- Echtgeld-Shop zeigt korrekt den noch nicht verbundenen Checkout-Status.
- Normale Hauptlevel, Coins, Skins und „Weiter“-Flow regressionsfrei testen.

## Offene Punkte
- Das Event verwendet eine eigene Canvas-Implementierung der Spiegel-/Laser-Idee; es ist noch keine gemeinsame, wiederverwendbare Engine mit dem Hauptspiel extrahiert.
- Der Echtgeld-Checkout ist nicht integriert.
- Vor Veröffentlichung müssen die Event-Level durchgespielt und die Coin-Speicherung auf dem Testgerät geprüft werden.
