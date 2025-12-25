# Quickstart: Contributing to Docusaurus UI/UX

**Date**: 2025-12-03
**Feature**: `005-docusaurus-ui-design`

## Overview

This guide provides instructions for developers and content creators on how to maintain and extend the Docusaurus UI/UX, particularly focusing on the blue & white theme, navigation, and footer as defined in the UI Design specification.

## Customizing Colors

The primary color scheme (blue and white) is defined using Infima CSS variables in `src/css/custom.css`.

*   **To change primary colors**: Modify `--ifm-color-primary` and its variations.
*   **To adjust text/backgrounds**: Modify `--ifm-font-color-base`, `--ifm-background-color`, `--ifm-navbar-background-color`, `--ifm-footer-background-color`, etc.
*   **Dark Mode**: Ensure any color changes are also reflected in the `html[data-theme='dark']` block for dark mode consistency.

## Managing Navbar Navigation

The top navigation bar is configured in `docusaurus.config.ts` under `themeConfig.navbar.items`.

*   **Adding/Editing Static Links**: Modify the `items` array directly.
*   **Updating the "Modules" Dropdown**: This dropdown is intended to be dynamic. The implementation involves a custom React component (e.g., `src/theme/NavbarItem/CustomDynamicDropdownNavbarItem.js`). To add a new module to this dropdown, ensure:
    1.  The module has an `_category_.json` file in its `docs/moduleX` directory.
    2.  The custom component logic correctly identifies and lists new modules.

## Updating Footer Navigation

The footer links are configured in `docusaurus.config.ts` under `themeConfig.footer.links`.

*   **Adding New Module Links**: Add a new `{ label: 'Module X - Title', to: '/docs/moduleX/' }` object to the `items` array under the `title: 'Book'` category.
*   **Adding General Chapter Links**: Similarly, add `{ label: 'Chapter Name', to: '/docs/chapter-path' }` objects to the relevant footer link groups.

## Ensuring Mobile Responsiveness

The site is designed to be mobile responsive out-of-the-box with Docusaurus. For specific overrides:

*   Add custom media queries to `src/css/custom.css` using a mobile-first approach (`@media (min-width: ...)`).
*   Use relative units (`rem`, `em`, `%`, `vw`) for sizing and spacing.

## Previewing Changes

To see your changes live during development:

```bash
npm run start
```

## Building for Deployment

To generate the static production build:

```bash
npm run build
```
