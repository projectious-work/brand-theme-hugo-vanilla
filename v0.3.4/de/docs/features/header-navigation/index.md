# Kopfleiste und Navigation

> Primäre Links, Suche, Sprach- und Versionsmenü konfigurieren.


`menus.main` definiert primäre Links; verwenden Sie `pageRef` für interne Seiten
und `url` für externe Ziele. `params.github` ergänzt das GitHub-Symbol.

Weitere Symbole werden als SVG unter `assets/icons/` abgelegt und über
`partials/icon.html` eingebunden. Links mit Symbol benötigen ein `aria-label` und
eine ausreichend große Zielfläche.

## Gruppen in der Seitenleiste

Beim ersten Besuch sind alle Gruppen geschlossen. Unter `[params]` steuert
`sidebarOpenDepth`, wie viele Ebenen anfänglich geöffnet sind; `0` ist der
Standard, `1` öffnet die oberste Ebene. **Alle öffnen** beziehungsweise **Alle
schließen** ändert den gesamten Baum. Einzelne Änderungen werden je Website und
Sprache im lokalen Browserspeicher gesichert und bleiben beim Seitenwechsel
erhalten. Die Suche öffnet Treffer nur vorübergehend.


---
Quelle: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.4/de/docs/features/header-navigation/index.md
