# Maintenance et mises à niveau

> Maintenir thème, dépendances, traductions et versions publiées.


Avant une mise à niveau, lisez les notes de version, mettez à jour le module avec
`hugo mod get ...@vX.Y.Z`, comparez les surcharges locales et exécutez
`./scripts/verify.sh` avec la `baseURL` de production.

Vérifiez régulièrement les avis npm, liens externes, traductions, versions CDN,
accessibilité et URL de versions. La publication de ce dépôt utilise localement
`./scripts/release.sh vX.Y.Z`.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/fr/docs/maintenance/index.md
