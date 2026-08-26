# Internationalization

> Configure translated content, language navigation, metadata and RTL layout.


Use Hugo's multilingual configuration and place translated content below language
directories. The example site contains complete English, German and French trees.

```toml
defaultContentLanguage = "en"

[languages.en]
  label = "English"
  weight = 1
[languages.de]
  label = "Deutsch"
  weight = 2
[languages.fr]
  label = "Français"
  weight = 3
```

The language menu links to the current page's translation when available and falls
back to that language's home page. Search indexes, edit links, RSS, canonical URLs,
sitemaps, `hreflang` and `llms.txt` remain language-aware.

Translate interface strings in `i18n/<lang>.toml`. For right-to-left languages set
`languagedirection = "rtl"`; structural rails, chevrons and menus mirror.

Keep filenames and translation keys stable across languages. Hugo then associates
translations without custom template logic.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.6/docs/features/internationalization/index.md
