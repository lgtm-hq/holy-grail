#!/usr/bin/env bash
# Create a git tag and GitHub release for the new version.
# Expects: NEW_VERSION environment variable

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=utils.sh
source "$SCRIPT_DIR/utils.sh"

VERSION="${NEW_VERSION:?NEW_VERSION environment variable is required}"
TAG_NAME="v${VERSION}"

log_info "Creating release tag: $TAG_NAME"

# Check if tag already exists
if git rev-parse "$TAG_NAME" >/dev/null 2>&1; then
	log_warning "Tag $TAG_NAME already exists, skipping"
	echo "tag_created=false" >>"$GITHUB_OUTPUT"
	echo "tag_name=$TAG_NAME" >>"$GITHUB_OUTPUT"
	exit 0
fi

# Extract changelog section for this version
release_notes=""
if [[ -f "CHANGELOG.md" ]]; then
	# Extract the section between the current version header and the next version header,
	# then trim leading and trailing blank lines from the extracted content.
	release_notes="$(awk "/^## \\[?${VERSION}\\]?/{found=1; next} /^## \\[?[0-9]+\\./{if(found) exit} found{print}" CHANGELOG.md |
		sed '/./,$!d' | sed -e :a -e '/^[[:space:]]*$/{ $d; N; ba; }')"
fi

if [[ -z "$release_notes" ]]; then
	release_notes="Release ${TAG_NAME}"
fi

log_info "Configuring git identity for tag creation..."
git config user.name "${RELEASE_GIT_USER:-${GITHUB_ACTOR}}"
git config user.email "${RELEASE_GIT_EMAIL:-${GITHUB_ACTOR}@users.noreply.github.com}"

log_info "Creating git tag..."
git tag -a "$TAG_NAME" -m "Release ${TAG_NAME}"
git push origin "$TAG_NAME"

log_info "Creating GitHub release..."
if ! gh release create "$TAG_NAME" \
	--title "Release ${TAG_NAME}" \
	--notes "$release_notes" \
	--verify-tag; then
	log_error "Failed to create GitHub release, cleaning up tag..."
	git push --delete origin "$TAG_NAME"
	git tag -d "$TAG_NAME"
	exit 1
fi

log_success "Created release: $TAG_NAME"
echo "tag_created=true" >>"$GITHUB_OUTPUT"
echo "tag_name=$TAG_NAME" >>"$GITHUB_OUTPUT"
