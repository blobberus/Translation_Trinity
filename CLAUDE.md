# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a minimal static site with no build tooling, package manager, or test framework — just plain HTML/CSS served as-is. There are no commands to build, lint, or test.

## Structure

- `index.html` — single-page app shell: fixed top bar, left sidebar nav, and a main content area with `.page` sections (`page-home`, `page-poem-1`, `page-poem-2`) toggled by JS. Poem translation content is currently blank placeholders.
- `styles.css` — all styling (white background, Times New Roman, black/white/beige button theme).
- `script.js` — hash-based routing (`#poem-1`, `#poem-2`) that shows/hides `.page` sections; no page reloads, so the top bar never moves.

## Working locally

To preview changes, open `index.html` directly in a browser, or serve the directory with any static file server (e.g. `python -m http.server`).
