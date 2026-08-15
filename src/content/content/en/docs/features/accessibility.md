+++
title = "Accessibility"
description = "Keyboard behavior, reader preferences and author responsibilities."
weight = 40
icon = "accessible"
+++

The theme provides semantic landmarks, a skip link, visible keyboard focus,
44-pixel primary targets, accessible menus and dialogs, reduced-motion support,
scalable type and non-text contrast for interactive controls.

## Reader controls

The accessibility menu stores preferences locally:

- text sizes from 112% to 200%;
- high contrast;
- a deliberately prominent three-pixel **Strong focus ring**;
- underlined prose links;
- reduced motion; and
- expanded text spacing.

These controls supplement operating-system preferences. They do not replace the
browser's own zoom or accessibility tools.

## Author responsibilities

Supply meaningful image alternatives, use headings in order, label icon-only
shortcodes, avoid autoplay, and do not communicate status through colour alone.
Run the keyboard and axe checks documented in `TESTING.md` after changing layouts.

Set `params.accessibilityMenu = false` only if the host product supplies equivalent
controls elsewhere.
