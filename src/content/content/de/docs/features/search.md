+++
title = "Suche"
description = "Generierter Suchindex, Kopfleisten-Suche und Befehlspalette."
weight = 60
icon = "search"
+++

Hugo erzeugt `/index.json` mit Titel, Beschreibung, Tags, Inhalt sowie H2/H3-
Überschriften. FlexSearch läuft lokal im Browser; ein externer Suchdienst ist nicht
nötig. `/` fokussiert die Suche, `Strg`/`Cmd`+`K` öffnet die Befehlspalette.

Aktivieren Sie `SearchIndex` in `outputs.home` und legen Sie eine Seite mit
`layout = "search"` an. `params.search = false` deaktiviert die Funktion.
