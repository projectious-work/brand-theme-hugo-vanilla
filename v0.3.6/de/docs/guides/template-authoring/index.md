# Leitfaden zur Template-Erstellung

> Upgrade-sichere Hugo-Layouts und Shortcodes mit Theme-Tokens und Tailwind erstellen.


Erweiterungen gehören in die konsumierende Website, weil lokale Hugo-Layouts vor
dem Theme-Modul aufgelöst werden. Wählen Sie den kleinsten Erweiterungspunkt:
Shortcode für Inhaltskomponenten, Partial für wiederverwendbares Template-Markup
oder ein Bereichslayout für eine abweichende Seitenstruktur.

1. Aktivieren Sie `[build.buildStats] enable = true` in `hugo.toml`.
2. Installieren Sie `@tailwindcss/cli` und versionieren Sie den Lockfile.
3. Legen Sie beispielsweise `layouts/shortcodes/status-panel.html` an.
4. Verwenden Sie vollständige Klassen wie `bg-surface`, `text-hi`,
   `border-default`, `rounded-lg` und `p-6`; dynamisch zusammengesetzte Klassen
   werden von Tailwind nicht zuverlässig erkannt.
5. Bevorzugen Sie semantische Variablen wie `--color-surface`, `--space-5` und
   `--radius-lg`.
6. Ergänzen Sie Tabler-SVGs unter `assets/icons/` und vergeben Sie für
   bedeutungstragende Symbole einen zugänglichen Namen.
7. Prüfen Sie Produktion, Farbmodi, 200 Prozent Textgröße, Tastatur, Mobilansicht,
   Druck und alle Sprachen.
8. Vergleichen Sie lokale Overrides bei jedem Theme-Upgrade mit dem neuen
   Upstream-Template.

Die vollständigen Klassen und Tokens beschreibt
[Tailwind und Design-Tokens](../features/tailwind.md).


---
Quelle: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.6/de/docs/guides/template-authoring/index.md
