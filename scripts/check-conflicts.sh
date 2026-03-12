#!/usr/bin/env bash
set -euo pipefail

has_error=0

# 1) Unresolved merge/rebase/cherry-pick state in git metadata
for state_file in MERGE_HEAD REBASE_HEAD CHERRY_PICK_HEAD REVERT_HEAD; do
  if [[ -f ".git/${state_file}" ]]; then
    echo "❌ Repository is in an unfinished git state: ${state_file} exists."
    has_error=1
  fi
done

# 2) Unmerged index entries (true conflict state)
unmerged_files="$(git diff --name-only --diff-filter=U)"
if [[ -n "${unmerged_files}" ]]; then
  echo "❌ Unmerged files detected in index:"
  echo "${unmerged_files}"
  has_error=1
fi

# 3) Conflict markers accidentally committed into files
if rg -n --hidden --glob '!.git' --glob '!node_modules' --glob '!*.lock' '^[[:space:]]*(<<<<<<<|=======|>>>>>>>)' .; then
  echo "❌ Merge conflict markers found in tracked content."
  has_error=1
fi

if [[ "${has_error}" -eq 1 ]]; then
  echo
  echo "Resolve the issues above, then run: npm run check-conflicts"
  exit 1
fi

echo "✅ No unresolved git conflicts or conflict markers found."
