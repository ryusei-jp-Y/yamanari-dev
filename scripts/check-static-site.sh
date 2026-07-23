#!/usr/bin/env bash
set -euo pipefail

pages=(
  "htdocs/index.html"
  "htdocs/web-quality-crawler/index.html"
  "htdocs/boarda/index.html"
  "htdocs/idle-clock/index.html"
  "htdocs/kaosan-live/index.html"
)

for page in "${pages[@]}"; do
  test -f "$page"
  grep -qi '<!doctype html>' "$page"
  grep -qi '<meta name="viewport"' "$page"
  grep -qi '<link rel="stylesheet" href="/common/css/common.css">' "$page"
  grep -Eq 'class="[^"]*\bl-page\b' "$page"
  grep -Eq 'class="[^"]*\bl-section\b' "$page"
  grep -Eq 'class="[^"]*\bl-inner\b' "$page"
done

grep -q '<link rel="stylesheet" href="/css/this.css">' htdocs/index.html
grep -q 'href="/web-quality-crawler/"' htdocs/index.html
grep -q 'href="/boarda/"' htdocs/index.html
grep -q 'href="/idle-clock/"' htdocs/index.html
grep -q 'href="/kaosan-live/"' htdocs/index.html
grep -q 'src="/js/orbit-nav.js"' htdocs/index.html
grep -q 'src="/images/kaosan-live/face.jpeg"' htdocs/index.html
grep -q 'src="/js/instagram-feed.js"' htdocs/index.html
grep -q 'data-instagram-feed' htdocs/index.html

for page in web-quality-crawler boarda idle-clock kaosan-live; do
  grep -q '<link rel="stylesheet" href="./css/this.css">' "htdocs/$page/index.html"
  test -f "htdocs/$page/scss/this.scss"
  test -f "htdocs/$page/css/this.css"
done

test -f htdocs/common/scss/common.scss
test -f htdocs/common/scss/forward/_index.scss
test -f htdocs/common/css/common.css
test -f htdocs/scss/this.scss
test -f htdocs/css/this.css
test -f htdocs/_components/index.html
test -f htdocs/_components/scss/this.scss
test -f htdocs/_components/css/this.css
test -f htdocs/_headers
test -f htdocs/images/kaosan-live/face.jpeg
test -f htdocs/js/orbit-nav.js
test -f htdocs/js/instagram-feed.js
test -f worker/index.mjs

node --check htdocs/js/orbit-nav.js
node --check htdocs/js/instagram-feed.js
node --check worker/index.mjs

grep -q '@forward "../setting/variables"' htdocs/common/scss/forward/_index.scss
grep -q '@forward "../setting/mixin"' htdocs/common/scss/forward/_index.scss
grep -q '◆使用箇所' htdocs/_components/index.html
