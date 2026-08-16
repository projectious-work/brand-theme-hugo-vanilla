# Accessibility

> Keyboard behavior, reader preferences and author responsibilities.


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

**High contrast** strengthens foreground roles and interactive boundaries. It
does not underline links. **Underlined links** is an independent preference so
readers can enable either treatment or combine both.

To see **Strong focus ring**, enable it, then press `Tab` rather than clicking.
Keyboard focus around the search field, menu buttons, links and form controls
changes to a three-pixel orange outline with a three-pixel gap. Browsers normally
hide `:focus-visible` for pointer clicks, so clicking a control is not a reliable
demonstration. The preference persists in local storage for this site origin.

## Author responsibilities

Supply meaningful image alternatives, use headings in order, label icon-only
shortcodes, avoid autoplay, and do not communicate status through colour alone.
Run the keyboard and axe checks documented in `TESTING.md` after changing layouts.

Set `params.accessibilityMenu = false` only if the host product supplies equivalent
controls elsewhere.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/docs/features/accessibility/index.md
