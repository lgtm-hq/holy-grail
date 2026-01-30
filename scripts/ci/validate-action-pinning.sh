#!/usr/bin/env bash
# Validate that all GitHub Actions are pinned to SHA commits

set -euo pipefail

ERRORS=0
WORKFLOWS_DIR=".github"

echo "Validating GitHub Actions are SHA-pinned..."
echo

# Find all YAML files in .github directory
while IFS= read -r -d '' file; do
	echo "Checking: $file"

	# Extract 'uses:' lines and check for SHA pinning
	# Valid: uses: actions/checkout@abc123def456... (40-char hex)
	# Invalid: uses: actions/checkout@v4
	# Invalid: uses: actions/checkout@main

	while IFS= read -r line; do
		# Skip empty lines and local actions (./path)
		[[ -z "$line" ]] && continue
		[[ "$line" =~ ^\.\/ ]] && continue

		# Extract the ref part (after @)
		if [[ "$line" =~ @([^[:space:]#]+) ]]; then
			ref="${BASH_REMATCH[1]}"

			# Check if ref is a 40-character hex string (SHA)
			if [[ ! "$ref" =~ ^[a-f0-9]{40}$ ]]; then
				echo "  ERROR: Not SHA-pinned: $line"
				echo "    Found ref: $ref"
				((ERRORS++))
			fi
		fi
	done < <(grep -oP '(?<=uses:\s)[^\s]+' "$file" 2>/dev/null || true)

done < <(find "$WORKFLOWS_DIR" -type f \( -name "*.yml" -o -name "*.yaml" \) -print0)

echo
if [[ $ERRORS -gt 0 ]]; then
	echo "FAILED: Found $ERRORS action(s) not pinned to SHA commits"
	echo
	echo "To fix, replace version tags with full SHA commits:"
	echo "  Bad:  uses: actions/checkout@v4"
	echo "  Good: uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4"
	echo
	echo "You can find the SHA for a version at:"
	echo "  https://github.com/{owner}/{repo}/releases"
	exit 1
else
	echo "PASSED: All actions are SHA-pinned"
fi
