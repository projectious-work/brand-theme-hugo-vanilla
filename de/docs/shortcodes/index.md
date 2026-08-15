# Shortcodes

> Alle Komponenten des Themes, mit dem Markdown, das sie erzeugt.


## Hinweisboxen

{{< callout type="info" >}}Information, die der Leser braucht, aber nicht erfragt hat.{{< /callout >}}
{{< callout type="warning" title="Achtung" >}}Eine neue Policy-Version wirkt nicht auf laufende Durchläufe.{{< /callout >}}
{{< callout type="error" title="Fehlgeschlagen" >}}`POLICY_NOT_FOUND` — die Version wurde gelöscht oder nie veröffentlicht.{{< /callout >}}

## Karten

{{< cards >}}
  {{< card title="Pipelines" subtitle="Stufen in YAML deklarieren und unter Audit ausführen." link="/de/docs/" icon="versions" >}}
  {{< card title="Policies" subtitle="Versionierte Regeln, pro Pipeline zugeordnet." link="/de/docs/" icon="circle-check" >}}
{{< /cards >}}

## Tabs

{{< tabs items="npm, pnpm, go" >}}
  {{< tab >}}```sh
npm install
```{{< /tab >}}
  {{< tab >}}```sh
pnpm install
```{{< /tab >}}
  {{< tab >}}```sh
go mod download
```{{< /tab >}}
{{< /tabs >}}

## Aufklappbare Abschnitte

{{< details title="Was steht im Suchindex?" >}}
Titel, Beschreibung, Brotkrumen, Schlagworte, alle H2- und H3-Überschriften sowie
die ersten 2000 Zeichen Klartext pro Seite.
{{< /details >}}

## Terminal

{{< terminal title="deploy" >}}
$ projectious run --pipeline onboarding-audit
✓ Konfiguration gegen Schema v3.2 geprüft
✓ Policy-Prüfung: 12 Regeln erfüllt
● Deployment auf Staging...
{{< /terminal >}}

## Dateibaum

{{< filetree >}}
  {{< folder name="content" >}}
    {{< file name="_index.md" note="Startseite" >}}
    {{< folder name="docs" >}}
      {{< file name="erste-schritte.md" >}}
    {{< /folder >}}
  {{< /folder >}}
{{< /filetree >}}

## Diagramme

{{< mermaid >}}
flowchart LR
  A[Auslöser] --> B[Prüfung]
  B --> C{Policy}
  C -->|erfüllt| D[Staging]
  C -->|verletzt| E[Abbruch und Meldung]
{{< /mermaid >}}


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/de/docs/shortcodes/index.md
