# CI/CD Workflows

This directory contains GitHub Actions workflows for the holy-grail project.

## Workflow Overview

```text
PR Created
├── pr-auto-assign.yml      → Auto-assigns CODEOWNER to PR
├── pr-labeler.yml          → Auto-labels based on changed files
├── semantic-pr-title.yml   → Validates Conventional Commits format
├── security-dependency-review.yml → Scans for vulnerable deps
├── validate-action-pinning.yml → Ensures actions are SHA-pinned
├── quality-ci.yml          → Type check, unit tests, build
└── quality-e2e.yml         → E2E tests → Posts PR comment

Push to main
├── quality-ci.yml ──success──→ deploy-pages.yml
├── release.yml             → Automated versioning & GitHub Releases
└── security-codeql.yml     → CodeQL security scanning

Weekly (Sunday 00:00 UTC)
└── security-codeql.yml     → Scheduled security scan
```

## Workflows

### Quality

| Workflow          | Trigger           | Purpose                  |
| ----------------- | ----------------- | ------------------------ |
| `quality-ci.yml`  | Push to main, PRs | Type check, tests, build |
| `quality-e2e.yml` | Push to main, PRs | Playwright E2E tests     |

### Deployment

| Workflow           | Trigger          | Purpose            |
| ------------------ | ---------------- | ------------------ |
| `deploy-pages.yml` | After CI, manual | Deploy to GH Pages |

### Release

| Workflow      | Trigger      | Purpose                              |
| ------------- | ------------ | ------------------------------------ |
| `release.yml` | Push to main | Semantic versioning & GitHub Release |

### PR Management

| Workflow                | Trigger           | Purpose             |
| ----------------------- | ----------------- | ------------------- |
| `pr-auto-assign.yml`    | PR opened         | Assign CODEOWNER    |
| `pr-labeler.yml`        | PR opened/updated | Auto-label by files |
| `semantic-pr-title.yml` | PR opened/edited  | Validate title      |

### Security

| Workflow                         | Trigger           | Purpose           |
| -------------------------------- | ----------------- | ----------------- |
| `security-codeql.yml`            | Push, PRs, weekly | CodeQL analysis   |
| `security-dependency-review.yml` | PRs               | Scan deps         |
| `validate-action-pinning.yml`    | PRs on workflows  | Check SHA pinning |

## Reusable Workflows (from lgtm-ci)

The following workflows delegate to [lgtm-ci](https://github.com/lgtm-hq/lgtm-ci)
reusable workflows:

| Workflow                      | Reusable Workflow                                                     |
| ----------------------------- | --------------------------------------------------------------------- |
| `quality-ci.yml`              | `reusable-quality-lint.yml` + `reusable-publish-quality-summary.yml` + `reusable-build-artifact.yml` |
| `release-version-pr.yml`      | `reusable-release-version-pr.yml`                                     |
| `pr-auto-assign.yml`          | `reusable-pr-auto-assign.yml`                                         |
| `codeql.yml`                  | `reusable-codeql.yml`                                                 |
| `validate-action-pinning.yml` | `reusable-validate-action-pinning.yml`                                |
| `semantic-pr-title.yml`       | `reusable-semantic-pr-title.yml`                                      |

## Local Actions

### `actions/setup-env`

Sets up Bun and Node.js with dependency caching.

```yaml
- uses: ./.github/actions/setup-env
  with:
    node-version: '22' # optional, default: 22
    bun-version: 'latest' # optional, default: latest
    frozen-lockfile: 'true' # optional, default: true
```

### `actions/post-pr-comment`

Posts or updates a PR comment with marker-based deduplication.

```yaml
- uses: ./.github/actions/post-pr-comment
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    marker: unique-comment-marker
    body: |
      ## My Comment
      Content here...
```

## Configuration Files

| File                       | Purpose                   |
| -------------------------- | ------------------------- |
| `labeler.yml`              | Rules for auto-labeling   |
| `CODEOWNERS`               | Code ownership for review |
| `pull_request_template.md` | PR description template   |
| `renovate.json`            | Renovate dependency bot   |

## Scripts

| Script                                      | Purpose        |
| ------------------------------------------- | -------------- |
| `scripts/ci/generate-playwright-comment.sh` | PR comment gen |

## Required Secrets

None. All workflows use `GITHUB_TOKEN` which is auto-provided.

## Branch Protection Recommendations

For the `main` branch, configure:

1. **Require status checks to pass:**
   - `build / 🏗️ Build & Test` (from quality-ci.yml)
   - `🎭 E2E Tests` (from quality-e2e.yml)
   - `semantic-title / 📝 Validate PR Title` (from semantic-pr-title.yml)
   - `quality / 🛠️ Lintro Code Quality` (from quality-ci.yml)
   - `validate / 📌 Validate Action Pinning` (from validate-action-pinning.yml)
   - `codeql / 🔬 CodeQL Analysis` (from codeql.yml)
   - `🔐 Security Audit` (from security-dependency-review.yml)
   - `Socket Security: Pull Request Alerts`

2. **Require pull request reviews** (optional)

3. **Require signed commits** (optional)

4. **Do not allow bypassing the above settings**
