+++
title = "Konfiguration"
description = "Parameter, die das Theme liest, und was sie jeweils bewirken."
weight = 30
tags = ["referenz"]
+++

## Parameter

| Parameter | Wirkung |
|---|---|
| `params.version` | Bezeichnung in der Versionsauswahl und im Footer |
| `params.versions` | Liste aus `{label, url, note}` für die Auswahl |
| `params.editURL` | Präfix für „Diese Seite bearbeiten“; der Seitenpfad wird angehängt |
| `params.announcement` | Ausblendbarer Hinweisbalken über der Kopfzeile |
| `params.search` | `false` entfernt Index, Suchfeld und `/search` |
| `params.sidebarFilter` | `false` verbirgt das Filterfeld in der Seitenleiste |
| `params.feedback` | `false` verbirgt das Feedback-Element |
| `params.accessibilityMenu` | `false` verbirgt die Barrierefreiheits-Auswahl |
| `params.build.tailwind` | `false` überspringt den Tailwind-Schritt |

## Frontmatter

| Schlüssel | Wirkung |
|---|---|
| `weight` | Reihenfolge in Seitenleiste und Vor/Zurück |
| `description` | Einleitungsabsatz, Meta-Beschreibung, Suchindex |
| `cover` | Titelbild für Blogliste und Beitrag |
| `toc` | `false` verbirgt das Inhaltsverzeichnis |
| `math` | `true` lädt KaTeX für diese Seite |
| `private` | `true` hält die Seite aus dem Suchindex |
