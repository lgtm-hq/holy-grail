#!/usr/bin/env bash

# PR Auto-Assign Script
# Assigns a random CODEOWNER to a pull request, excluding the PR author.
# For bot-authored PRs, also requests a review from the selected CODEOWNER.

set -euo pipefail

# Extract usernames from active CODEOWNERS lines, filter out team entries (@org/team)
owners=""
pipeline_output=$(grep -v '^\s*#' .github/CODEOWNERS |
	grep -oE '@[a-zA-Z0-9_/-]+' |
	sort -u | tr -d '@' | grep -E '^[A-Za-z0-9_-]+$') &&
	exit_code=0 || exit_code=$?

if [[ $exit_code -eq 0 ]]; then
	owners="$pipeline_output"
elif [[ $exit_code -eq 1 ]]; then
	echo "No matches found, treating as empty result"
	owners=""
else
	echo "Error: Pipeline failed with exit code $exit_code"
	exit "$exit_code"
fi

if [[ -z "$owners" ]]; then
	echo "No valid individual CODEOWNERS found, skipping assignment"
	exit 0
fi

mapfile -t owner_array <<<"$owners"

# Filter out the PR author from candidates
filtered_array=()
for owner in "${owner_array[@]}"; do
	if [[ "$owner" != "$PR_AUTHOR" ]]; then
		filtered_array+=("$owner")
	fi
done
owner_array=("${filtered_array[@]}")
count=${#owner_array[@]}

if [[ $count -eq 0 ]]; then
	echo "No eligible assignees after filtering out PR author ($PR_AUTHOR), skipping"
	exit 0
fi

random_index=$((RANDOM % count))
selected="${owner_array[$random_index]}"

echo "Selected assignee: $selected (from $count eligible CODEOWNERS)"
gh pr edit "$PR_NUMBER" --add-assignee "$selected"

# Request a review from the selected CODEOWNER for bot-authored PRs
# (e.g. version bumps, Renovate dependency updates)
if [[ "${PR_AUTHOR_TYPE:-}" == "Bot" ]]; then
	echo "Bot-authored PR detected, requesting review from $selected"
	gh pr edit "$PR_NUMBER" --add-reviewer "$selected"
fi
