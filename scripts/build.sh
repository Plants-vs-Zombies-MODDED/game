#!/bin/bash
set -e

npm install -g oxlint oxfmt esbuild html-minifier-terser

# stamp
echo "$CF_PAGES_COMMIT_SHA" > game/images/Zombies/CX/v.html

# lint & format
oxlint . || true
oxfmt --write . "**/*.{js,md,html,css,yml}"

# bundle entry point
esbuild game/js/CPlants.js \
  --bundle --minify --sourcemap \
  --outfile=game/js/CPlants.js --allow-overwrite

# minify remaining js & css
find . -type f \( -name "*.js" -o -name "*.css" \) \
  -not -path "./node_modules/*" \
  -not -name "CPlants.js" | \
  xargs -P4 -I{} esbuild {} \
    --minify --sourcemap \
    --outdir=. --allow-overwrite &

# minify html
find . -type f -name "*.html" \
  -not -path "./node_modules/*" | \
  xargs -P4 -I{} html-minifier-terser \
    --collapse-whitespace --remove-comments --remove-tag-whitespace \
    --minify-css true --minify-js true -o {} {} &

wait
