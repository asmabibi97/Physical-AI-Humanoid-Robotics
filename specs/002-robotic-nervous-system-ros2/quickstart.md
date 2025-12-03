# Quickstart: Contributing to Module 1

**Date**: 2025-12-03
**Feature**: `002-robotic-nervous-system-ros2`

## Overview

This guide provides a quick overview for developers and content creators who want to contribute to or modify the "Module 1: The Robotic Nervous System (ROS 2)" documentation.

## How to Add a New Page

The Docusaurus sidebar for this project is auto-generated from the file system. Follow these steps to add a new page to this module:

1.  **Create a new Markdown file**: Inside the `docs/module1/` directory, create a new file (e.g., `1.5-new-concept.md`). The filename will be used as part of the URL.

2.  **Add content**: Write your content in the new file using standard Docusaurus Markdown syntax.

3.  **Automatic Sidebar Entry**: Docusaurus will automatically pick up the new file and add it to the "Module 1" category in the sidebar. The order is determined by the file and directory names.

## Modifying the Category

The "Module 1" category itself is defined by the `docs/module1/_category_.json` file.

To change the sidebar label or the position of the entire module, edit this file:

```json
{
  "label": "Module 1 - The Robotic Nervous System",
  "position": 3 // Change this number to re-order the module
}
```

## Running the Development Server

To preview your changes, run the Docusaurus development server from the root of the project:

```bash
npm run start
```
