# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a minimal static site with no build tooling, package manager, or test framework — just plain HTML/CSS served as-is. There are no commands to build, lint, or test.

## Structure

- `index.html` — single-page app shell: fixed top bar, left sidebar nav, and a main content area with `.page` sections (`page-home`, `page-poem-1`, `page-poem-2`, `page-why`, `page-works-cited`) toggled by JS. Poem pages show the original Chinese text with pinyin and a hover dropdown to switch between translation methods.
- `styles.css` — all styling (white background, Times New Roman, black/white/beige button theme, Chinese text set in the Fontquan-XinYiJiXiangSong webfont loaded from jsDelivr).
- `script.js` — hash-based routing (`#poem-1`, `#poem-2`, etc.) that shows/hides `.page` sections; no page reloads, so the top bar never moves. Also holds the `translations` data (per poem, per method: Bynner/Musician/Etymologist/Trilingualist) transcribed from `HUM16100_ Final Project Organizer.docx`, and renders the selected translation plus its "Translation Model Methodology" box.
- `HUM16100_ Final Project Organizer.docx` — source document with the original poems, Bynner reference translations, the three LLM translation methods with their methodology notes, and dictionary citations (not yet used on the Works Cited page).

## Working locally

To preview changes, open `index.html` directly in a browser, or serve the directory with any static file server (e.g. `python -m http.server`).
