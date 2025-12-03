# Quickstart: Contributing to Module 2

**Date**: 2025-12-03
**Feature**: `003-module2-digital-twin`

## Overview

This guide provides a quick overview for developers and content creators who want to contribute to or modify the "Module 2: The Digital Twin (Gazebo & Unity)" documentation.

## How to Add a New Page

The Docusaurus sidebar for this project is auto-generated from the file system. Follow these steps to add a new page to this module:

1.  **Create a new Markdown file**: Inside the `docs/module2/` directory, create a new file (e.g., `2.5-advanced-topics.md`). The filename will be used as part of the URL.

2.  **Add content**: Write your content in the new file using standard Docusaurus Markdown syntax.

3.  **Automatic Sidebar Entry**: Docusaurus will automatically pick up the new file and add it to the "Module 2" category in the sidebar. The order is determined by the file and directory names.

## Modifying the Category

The "Module 2" category itself is defined by the `docs/module2/_category_.json` file.

To change the sidebar label or the position of the entire module, edit this file:

```json
{
  "label": "Module 2 - The Digital Twin",
  "position": 4 // Change this number to re-order the module
}
```

## Running the Development Server

To preview your changes, run the Docusaurus development server from the root of the project:

```bash
npm run start
```
