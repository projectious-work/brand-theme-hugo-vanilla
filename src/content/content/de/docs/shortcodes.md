+++
title = "Shortcodes"
description = "Alle Komponenten des Themes, mit dem Markdown, das sie erzeugt."
weight = 50
tags = ["referenz"]
+++

## Hinweisboxen

{{< callout type="info" >}}Information, die der Leser braucht, aber nicht erfragt hat.{{< /callout >}}
{{< callout type="warning" title="Achtung" >}}Prüfen Sie externe Links vor jeder Veröffentlichung.{{< /callout >}}
{{< callout type="error" title="Fehlgeschlagen" >}}Der Build enthält einen nicht auflösbaren Seitenverweis.{{< /callout >}}

## Karten

{{< cards >}}
  {{< card title="Konfiguration" subtitle="Parameter für Website und Seiten." link="configuration.md" icon="versions" >}}
  {{< card title="Features" subtitle="Alle Funktionen des Themes." link="features/_index.md" icon="star" >}}
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

{{< terminal title="Vorschau" >}}
$ hugo server --disableFastRender
Watching for changes in content and layouts
Built in 284 ms
Web Server is available at http://localhost:1313/
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
  B --> C[HTML]
  C -->|erfüllt| D[Staging]
  C -->|verletzt| E[Abbruch und Meldung]
{{< /mermaid >}}
