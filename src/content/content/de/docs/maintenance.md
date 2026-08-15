+++
title = "Wartung und Upgrades"
description = "Theme, Abhängigkeiten, Übersetzungen und veröffentlichte Versionen pflegen."
weight = 70
icon = "versions"
+++

Lesen Sie vor einem Upgrade die Versionshinweise, aktualisieren Sie die fixierte
Modulversion mit `hugo mod get ...@vX.Y.Z`, vergleichen Sie lokale Template-
Overrides und führen Sie `./scripts/verify.sh` mit der produktiven `baseURL` aus.

Prüfen Sie regelmäßig npm-Advisories, externe Links, Übersetzungsparität,
CDN-Versionen, Barrierefreiheit und veröffentlichte Versionsziele. Releases dieses
Repositories laufen lokal über `./scripts/release.sh vX.Y.Z`; Tags und Release-
Archive sind unveränderliche Wiederherstellungspunkte.
