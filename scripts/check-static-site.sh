#!/usr/bin/env bash
set -euo pipefail

pages=(
  "index.html"
  "web-quality-crawler/index.html"
  "boarda/index.html"
  "idle-clock/index.html"
)

for page in "${pages[@]}"; do
  test -f "$page"
  grep -qi '<!doctype html>' "$page"
  grep -qi '<meta name="viewport"' "$page"
  grep -qi '<link rel="stylesheet" href="/assets/styles.css">' "$page"
done

grep -q 'href="/web-quality-crawler/"' index.html
grep -q 'href="/boarda/"' index.html
grep -q 'href="/idle-clock/"' index.html
test -f assets/styles.css
