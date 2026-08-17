+++
title = "v0.3.0 — versionierte Laufzeiten, gefilterte Suche, Befehlspalette"
description = "Laufzeit-Assets sind exakt versioniert, die Suche indexiert Überschriften, und alle Seitenaktionen stehen in einer Zeile."
date = 2026-08-15
author = "projectious.work"
tags = ["release"]
aliases = ["/blog/release-v0-3-0/"]
+++

## Reproduzierbare Laufzeit-Assets

KaTeX 0.18.4, Mermaid 11.16.1 und asciinema-player 3.17.0 werden über exakt
versionierte jsDelivr-URLs geladen. Schriften und Theme-Icons bleiben gebündelt.

## Suche

Der Index enthält je einen Datensatz pro Seite **und** pro H2/H3. Ein Treffer landet
damit am richtigen Anker statt am Seitenanfang. Die Seite `/search` filtert nach
Abschnitt.

## Seitenaktionen

Als Markdown kopieren, Markdown ansehen und Abschnitt drucken sind gleichwertig und
stehen daher in einer gemeinsamen Zeile.
