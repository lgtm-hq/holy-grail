#!/usr/bin/env bash
# Sync build artifacts to public/ for dev-mode serving.
# Called by: npm scripts (postinstall, build)
set -euo pipefail

sync_pagefind() {
  local src="dist/pagefind"
  if [[ ! -d "$src" ]]; then
    echo "[sync-assets] dist/pagefind not found — skipping (run build first)"
    return 0
  fi
  rm -rf public/pagefind
  cp -r "$src" public/pagefind
  echo "[sync-assets] Synced pagefind index to public/"
}

sync_theme_css() {
  local src="node_modules/@lgtm-hq/turbo-themes/packages/css/dist/themes"
  if [[ ! -d "$src" ]]; then
    echo "[sync-assets] turbo-themes CSS not found at $src — skipping" >&2
    return 1
  fi
  rm -rf public/packages/css/dist/themes
  mkdir -p public/packages/css/dist
  cp -r "$src" public/packages/css/dist/themes
  echo "[sync-assets] Synced $(ls public/packages/css/dist/themes | wc -l | tr -d ' ') theme CSS files to public/"
}

case "${1:-all}" in
  pagefind)  sync_pagefind ;;
  themes)    sync_theme_css ;;
  all)       sync_theme_css; sync_pagefind ;;
  *)         echo "Usage: $0 {pagefind|themes|all}" >&2; exit 1 ;;
esac
