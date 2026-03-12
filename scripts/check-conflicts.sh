#!/usr/bin/env bash
set -euo pipefail

if rg -n --hidden --glob '!.git' --glob '!node_modules' --glob '!*.lock' '^(<<<<<<<|=======|>>>>>>>)' .; then
  echo "\n❌ Merge conflict markers found. Please resolve the files above."
  exit 1
fi

echo "✅ No merge conflict markers found."
