+++
title = "Guide de création de templates"
description = "Créer des layouts et shortcodes Hugo maintenables avec les jetons du thème et Tailwind."
weight = 20
icon = "file-code"
+++

Conservez les adaptations dans le site consommateur: Hugo donne priorité aux
layouts locaux sur ceux du module. Choisissez le plus petit point d'extension:
shortcode pour un composant de contenu, partial pour du markup réutilisable ou
layout de section pour une structure différente.

1. Activez `[build.buildStats] enable = true` dans `hugo.toml`.
2. Installez `@tailwindcss/cli` et versionnez le fichier de verrouillage.
3. Créez par exemple `layouts/shortcodes/status-panel.html`.
4. Employez des classes littérales comme `bg-surface`, `text-hi`,
   `border-default`, `rounded-lg` et `p-6`; Tailwind ne découvre pas fiablement
   les classes construites dynamiquement.
5. Préférez les variables sémantiques telles que `--color-surface`, `--space-5`
   et `--radius-lg`.
6. Ajoutez les SVG Tabler dans `assets/icons/` avec un nom accessible lorsque
   l'icône transmet une information.
7. Testez production, modes de couleur, texte à 200 %, clavier, mobile,
   impression et toutes les langues.
8. Comparez chaque override local au nouveau template upstream lors des mises à
   jour.

Consultez [Tailwind et jetons de design](../features/tailwind.md) pour les classes
et jetons disponibles.
