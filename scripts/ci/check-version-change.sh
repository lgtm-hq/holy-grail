#!/usr/bin/env bash
# Detect if package.json version changed between the merge commit and its parent.
# Sets outputs: version_changed=true/false, new_version=<version>, old_version=<version>

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=utils.sh
source "$SCRIPT_DIR/utils.sh"

# Get the current version from package.json
new_version="$(jq -r '.version // empty' package.json)"

if [[ -z "$new_version" ]]; then
	log_error "No version field found in package.json"
	echo "version_changed=false" >>"$GITHUB_OUTPUT"
	exit 0
fi

# Get the previous version from the parent commit
old_version="$(git show HEAD~1:package.json 2>/dev/null | jq -r '.version // empty' || echo "")"

log_info "Old version: ${old_version:-<none>}"
log_info "New version: $new_version"

if [[ "$old_version" != "$new_version" ]]; then
	log_success "Version changed: $old_version -> $new_version"
	{
		echo "version_changed=true"
		echo "new_version=$new_version"
		echo "old_version=$old_version"
	} >>"$GITHUB_OUTPUT"
else
	log_info "Version unchanged: $new_version"
	{
		echo "version_changed=false"
		echo "new_version=$new_version"
		echo "old_version=$old_version"
	} >>"$GITHUB_OUTPUT"
fi
