+++
title = "Tailwind und Design-Tokens"
description = "Tailwind-Integration und projectious.work Design-Tokens verwenden."
weight = 70
icon = "file-code"
+++

Markdown-Autoren benötigen Tailwind nicht. Template-Entwickler können die in
`assets/css/theme-layer.css` definierten Klassen verwenden: `font-display`,
`font-sans`, `font-mono`, `bg-page`, `bg-surface`, `bg-subtle`, `bg-terminal`,
`text-hi`, `text-lo`, `text-accent`, `border-default` und `border-accent`.
`build.buildStats.enable = true` muss aktiviert sein. Alle CSS-Variablen stehen in
`assets/css/brand-tokens.css`; Grundlage ist das
[projectious.work Brand-Design-System](https://github.com/projectious-work/brand).
