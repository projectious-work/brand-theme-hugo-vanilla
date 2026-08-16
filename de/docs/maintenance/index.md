# Wartung und Upgrades

> Theme, Abhängigkeiten, Übersetzungen und veröffentlichte Versionen pflegen.


Lesen Sie vor einem Upgrade die Versionshinweise, aktualisieren Sie die fixierte
Modulversion mit `hugo mod get ...@vX.Y.Z`, vergleichen Sie lokale Template-
Overrides und führen Sie `./scripts/verify.sh` mit der produktiven `baseURL` aus.

Prüfen Sie regelmäßig npm-Advisories, externe Links, Übersetzungsparität,
CDN-Versionen, Barrierefreiheit und veröffentlichte Versionsziele. Releases dieses
Repositories laufen lokal über `./scripts/release.sh vX.Y.Z`; Tags und Release-
Archive sind unveränderliche Wiederherstellungspunkte.


---
Quelle: https://projectious-work.github.io/brand-theme-hugo-vanilla/de/docs/maintenance/index.md
