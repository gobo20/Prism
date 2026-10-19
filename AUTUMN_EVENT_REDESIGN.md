# Herbst-Event-Redesign — GoboGames Prism

## Ziel
Das Herbst-Event soll sich wie ein eigenes, hochwertiges Mini-Event anfühlen — nicht nur wie das normale Puzzle mit orangefarbenen Farben. Bestehende Level, Coins, Gems, Skins und Spielstände müssen erhalten bleiben.

## Geplante Oberfläche
- Eigenständiger Event-Einstieg auf der Startseite mit klarer Laufzeit-/Eventstatus-Anzeige.
- Event-Hub im Prism-Look: dunkler Nachthimmel, warme Amber-/Kupferfarben, Ahornblätter als sparsame Dekoration und ein klarer Haupt-CTA.
- Übersicht mit drei getrennten Bereichen: Event-Level, Event-Aufgaben und Event-Belohnungen.
- Mobile-first Layout: keine überlappenden Karten, kein horizontales Scrollen bei üblichen Handybreiten, Touch-Ziele mindestens 44 px.
- Belohnungen mit klaren Zuständen: gesperrt, verfügbar, eingesammelt. Keine Belohnung darf bei erneutem Tippen doppelt vergeben werden.

## Spielablauf (Vorschlag)
1. Event-Hub öffnen.
2. Event-Level spielen und Event-Fortschritt sammeln.
3. Tägliche/gesamte Event-Aufgaben abschließen.
4. Verdiente Event-Belohnungen beanspruchen und Fortschritt im Hub sehen.

## Visuelle Richtung
- Hintergrund: tiefes Indigo statt flächigem Schwarz.
- Akzente: Kupferorange, Bernstein und gedämpftes Gold; Violett bleibt Prism-Markenfarbe.
- Leichte Blatt-/Glühpartikel, aber keine teuren Daueranimationen auf schwachen Geräten.
- Event-Karten mit eindeutiger Hierarchie: Fortschritt oben, Aufgabe in der Mitte, Belohnung und Aktion unten.
- Reduzierte Schatten/Blur-Effekte auf Mobilgeräten, damit das Event die FPS nicht weiter verschlechtert.

## Technische Leitplanken
- Keine zweite parallel laufende Navigation per DOM-Polling; Event-Hub muss in die bestehende Navigation integriert werden.
- Vorhandene autumn-maple, autumn-golden und autumn-night Skins weiterverwenden.
- Fortschritt und Belohnungen versioniert und idempotent speichern; keine bestehenden Saves überschreiben.
- Animationen pausieren, wenn der Tab/die App im Hintergrund ist, und prefers-reduced-motion berücksichtigen.
- Event darf den normalen Level-Flow und den Button Weiter nicht verändern.

## Abnahmekriterien
- Kein Überlappen der Startseiten-UI auf Android und Desktop.
- Event-Hub passt auf schmale Handybildschirme und größere Displays.
- Event-Level öffnen, abschließen und verlassen, ohne White-Screen oder verlorenen Fortschritt.
- Wiederholtes Tippen auf Abholen vergibt keine doppelten Belohnungen.
- Auf dem Testgerät nicht langsamer als das normale Menü; FPS separat messen statt pauschal ein Limit zu behaupten.
- Bestehende Spielstände, Skins und 80 Hauptlevel bleiben erhalten.

## Umsetzung in Reihenfolge
1. Überlappende Home-UI-Ursache beheben und Navigation vereinheitlichen.
2. FPS-Profiling und unnötige DOM-/Canvas-/CSS-Arbeit reduzieren.
3. Event-Hub als klar getrennte, responsive Oberfläche umbauen.
4. Event-Fortschritt und Belohnungen testen.
5. Android-PWA, Desktop und Offline-Start erneut prüfen.

Hinweis: Dieses Dokument ist ein Umsetzungskonzept, kein Beleg dafür, dass die Event-UI bereits geändert wurde.