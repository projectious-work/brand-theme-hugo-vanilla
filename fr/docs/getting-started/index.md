# Bien démarrer

> Installer le thème, ajouter la configuration Hugo requise et lancer le site localement.


## Prérequis

Hugo 0.128.0 ou plus récent, Go pour les modules Hugo, Node.js avec npm pour
Tailwind, Git.

## Installation

```toml {filename="hugo.toml"}
[module]
  [[module.imports]]
    path = "github.com/projectious-work/brand-theme-hugo-vanilla"
[build.buildStats]
  enable = true
```

```sh
hugo mod init example.com/docs
npm install
hugo mod get github.com/projectious-work/brand-theme-hugo-vanilla@v0.3.1
```

Copiez les blocs `[outputFormats]`, `[outputs]` et `[markup]` depuis la
configuration d'exemple. Créez `content/docs/_index.md` et une première page, puis
lancez `hugo server --disableFastRender`.

Poursuivez avec [Configuration](configuration/_index.md),
[Fonctionnalités](features/_index.md) et le [guide de rédaction](guides/_index.md).


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/fr/docs/getting-started/index.md
