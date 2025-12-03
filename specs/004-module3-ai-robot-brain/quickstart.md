# Quickstart: Contributing to Module 3

**Date**: 2025-12-03
**Feature**: `004-module3-ai-robot-brain`

## Overview

This guide provides a quick overview for developers and content creators who want to contribute to or modify the "Module 3: The AI-Robot Brain (NVIDIA Isaac™)" documentation.

## How to Add a New Page

The Docusaurus sidebar for this project is auto-generated from the file system. Follow these steps to add a new page to this module:

1.  **Create a new Markdown file**: Inside the `docs/module3/` directory, create a new file (e.g., `3.4-new-topic.md`). The filename will be used as part of the URL.

2.  **Add content**: Write your content in the new file using standard Docusaurus Markdown syntax.

3.  **Automatic Sidebar Entry**: Docusaurus will automatically pick up the new file and add it to the "Module 3" category in the sidebar. The order is determined by the file and directory names.

## Modifying the Category

The "Module 3" category itself is defined by the `docs/module3/_category_.json` file.

To change the sidebar label or the position of the entire module, edit this file:

```json
{
  "label": "Module 3 - The AI-Robot Brain",
  "position": 5 // Change this number to re-order the module
}
```

## Adding/Updating Footer Link

The footer link for "Module 3" is managed in `docusaurus.config.ts`. If you need to modify its label or destination, locate the `themeConfig.footer.links` section and edit the corresponding entry for "Module 3 - AI-Robot Brain".

## Running the Development Server

To preview your changes, run the Docusaurus development server from the root of the project:

```bash
npm run start
```
