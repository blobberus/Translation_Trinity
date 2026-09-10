# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a minimal static site with no build tooling, package manager, or test framework — just plain HTML/CSS served as-is. There are no commands to build, lint, or test.

## Structure

- `index.html` — the single page. It links `styles.css`, which does not exist yet in the repo.

## Working locally

To preview changes, open `index.html` directly in a browser, or serve the directory with any static file server (e.g. `python -m http.server`).
