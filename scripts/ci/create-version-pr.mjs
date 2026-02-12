#!/usr/bin/env node

/**
 * Analyze conventional commits since the last release tag and determine
 * the appropriate version bump. Updates package.json and generates CHANGELOG.md.
 *
 * Environment variables:
 *   GITHUB_OUTPUT - path to the GitHub Actions output file
 *   GITHUB_REPOSITORY - owner/repo
 *   GITHUB_SERVER_URL - GitHub server URL
 *
 * Outputs (via GITHUB_OUTPUT):
 *   bump_type - "major", "minor", "patch", or "none"
 *   new_version - the new version string
 *   changelog_entry - the changelog entry for this release
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, appendFileSync, existsSync } from "node:fs";

// --- Configuration ---

/** @type {Record<string, string>} */
const COMMIT_TYPE_TO_BUMP = {
	feat: "minor",
	fix: "patch",
	perf: "patch",
	docs: "patch",
	style: "patch",
	refactor: "patch",
	test: "patch",
	build: "patch",
	ci: "patch",
	chore: "patch",
	revert: "patch",
};

/** @type {Record<string, string>} */
const CHANGELOG_SECTIONS = {
	feat: "Features",
	fix: "Bug Fixes",
	perf: "Performance",
	docs: "Documentation",
	refactor: "Refactoring",
	build: "Build System",
	ci: "CI/CD",
	chore: "Chores",
	test: "Tests",
	style: "Styles",
	revert: "Reverts",
};

const MAX_BUMP = "minor"; // Never auto-bump major

// --- Helpers ---

function run(cmd) {
	return execSync(cmd, { encoding: "utf-8" }).trim();
}

function setOutput(key, value) {
	const outputFile = process.env.GITHUB_OUTPUT;
	if (outputFile) {
		const delimiter = `EOF_${Date.now()}`;
		appendFileSync(outputFile, `${key}<<${delimiter}\n${value}\n${delimiter}\n`);
	}
}

/**
 * Parse a conventional commit message.
 * @param {string} message
 * @returns {{ type: string, scope: string, breaking: boolean, description: string } | null}
 */
function parseConventionalCommit(message) {
	// Match: type(scope)?: description  or  type!: description
	const match = message.match(
		/^(?<type>[a-z]+)(?:\((?<scope>[^)]+)\))?(?<breaking>!)?:\s*(?<description>.+)$/,
	);
	if (!match?.groups) return null;

	return {
		type: match.groups.type,
		scope: match.groups.scope || "",
		breaking: match.groups.breaking === "!" || message.includes("BREAKING CHANGE"),
		description: match.groups.description,
	};
}

/**
 * Determine the bump level from a parsed commit.
 * @param {{ type: string, breaking: boolean }} commit
 * @returns {"major" | "minor" | "patch" | null}
 */
function getBumpLevel(commit) {
	if (commit.breaking) return "major";
	return COMMIT_TYPE_TO_BUMP[commit.type] || null;
}

/**
 * Compare bump levels. Returns the higher bump.
 * @param {string} a
 * @param {string} b
 * @returns {string}
 */
function higherBump(a, b) {
	const order = { major: 3, minor: 2, patch: 1, none: 0 };
	return (order[a] || 0) >= (order[b] || 0) ? a : b;
}

/**
 * Cap the bump level to the configured maximum.
 * @param {string} bump
 * @returns {string}
 */
function capBump(bump) {
	const order = { patch: 1, minor: 2, major: 3 };
	const maxLevel = order[MAX_BUMP] || 2;
	const bumpLevel = order[bump] || 0;
	if (bumpLevel > maxLevel) {
		console.log(`Capping bump from ${bump} to ${MAX_BUMP} (max-bump configured)`);
		return MAX_BUMP;
	}
	return bump;
}

/**
 * Increment a semver version string.
 * @param {string} version
 * @param {string} bump
 * @returns {string}
 */
function incrementVersion(version, bump) {
	const parts = version.split(".").map(Number);
	switch (bump) {
		case "major":
			return `${parts[0] + 1}.0.0`;
		case "minor":
			return `${parts[0]}.${parts[1] + 1}.0`;
		case "patch":
			return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
		default:
			return version;
	}
}

// --- Main ---

function main() {
	console.log("Analyzing conventional commits for version bump...\n");

	// Read current version
	const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
	const currentVersion = pkg.version;
	if (!currentVersion) {
		console.error("No version field in package.json");
		process.exit(1);
	}
	console.log(`Current version: ${currentVersion}`);

	// Find the latest release tag
	let lastTag = "";
	try {
		lastTag = run("git describe --tags --abbrev=0 --match 'v*' 2>/dev/null || echo ''");
	} catch {
		lastTag = "";
	}

	// Get commits since last tag (or all commits if no tag)
	let commitRange;
	if (lastTag) {
		commitRange = `${lastTag}..HEAD`;
		console.log(`Analyzing commits since tag: ${lastTag}`);
	} else {
		commitRange = "HEAD";
		console.log("No previous release tag found, analyzing all commits");
	}

	// Get commit messages (one per line, subject only)
	let rawCommits;
	try {
		rawCommits = run(`git log ${commitRange} --pretty=format:"%s" --no-merges`);
	} catch {
		rawCommits = "";
	}

	if (!rawCommits) {
		console.log("No commits found to analyze");
		setOutput("bump_type", "none");
		setOutput("new_version", currentVersion);
		setOutput("changelog_entry", "");
		return;
	}

	const commitMessages = rawCommits.split("\n").filter(Boolean);
	console.log(`Found ${commitMessages.length} commit(s) to analyze\n`);

	// Parse and categorize commits
	/** @type {Record<string, Array<{scope: string, description: string, breaking: boolean}>>} */
	const categorized = {};
	let overallBump = "none";
	let hasBreaking = false;

	for (const msg of commitMessages) {
		const parsed = parseConventionalCommit(msg);
		if (!parsed) {
			console.log(`  Skipping non-conventional: ${msg}`);
			continue;
		}

		console.log(`  ${parsed.type}${parsed.scope ? `(${parsed.scope})` : ""}: ${parsed.description}${parsed.breaking ? " [BREAKING]" : ""}`);

		const bump = getBumpLevel(parsed);
		if (bump) {
			overallBump = higherBump(overallBump, bump);
		}

		if (parsed.breaking) hasBreaking = true;

		if (!categorized[parsed.type]) {
			categorized[parsed.type] = [];
		}
		categorized[parsed.type].push({
			scope: parsed.scope,
			description: parsed.description,
			breaking: parsed.breaking,
		});
	}

	if (overallBump === "none") {
		console.log("\nNo version bump needed");
		setOutput("bump_type", "none");
		setOutput("new_version", currentVersion);
		setOutput("changelog_entry", "");
		return;
	}

	// Cap the bump
	overallBump = capBump(overallBump);

	const newVersion = incrementVersion(currentVersion, overallBump);
	console.log(`\nVersion bump: ${overallBump} (${currentVersion} -> ${newVersion})`);

	// Generate changelog entry
	const date = new Date().toISOString().split("T")[0];
	let changelogEntry = `## ${newVersion} (${date})\n\n`;

	if (hasBreaking) {
		changelogEntry += "### BREAKING CHANGES\n\n";
		for (const [, commits] of Object.entries(categorized)) {
			for (const c of commits) {
				if (c.breaking) {
					const scopeStr = c.scope ? `**${c.scope}:** ` : "";
					changelogEntry += `- ${scopeStr}${c.description}\n`;
				}
			}
		}
		changelogEntry += "\n";
	}

	// Add sections in defined order
	for (const [type, heading] of Object.entries(CHANGELOG_SECTIONS)) {
		const commits = categorized[type];
		if (!commits || commits.length === 0) continue;

		changelogEntry += `### ${heading}\n\n`;
		for (const c of commits) {
			const scopeStr = c.scope ? `**${c.scope}:** ` : "";
			changelogEntry += `- ${scopeStr}${c.description}\n`;
		}
		changelogEntry += "\n";
	}

	// Update package.json
	pkg.version = newVersion;
	writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");
	console.log("Updated package.json version");

	// Update CHANGELOG.md
	const changelogPath = "CHANGELOG.md";
	if (existsSync(changelogPath)) {
		const existing = readFileSync(changelogPath, "utf-8");
		// Insert after the main heading
		const headerMatch = existing.match(/^(# .+\n\n?)/);
		if (headerMatch) {
			const header = headerMatch[1];
			const rest = existing.slice(header.length);
			writeFileSync(changelogPath, `${header}${changelogEntry}${rest}`);
		} else {
			writeFileSync(changelogPath, `${changelogEntry}${existing}`);
		}
	} else {
		writeFileSync(changelogPath, `# Changelog\n\n${changelogEntry}`);
	}
	console.log("Updated CHANGELOG.md");

	// Set outputs
	setOutput("bump_type", overallBump);
	setOutput("new_version", newVersion);
	setOutput("changelog_entry", changelogEntry.trim());

	console.log("\nDone!");
}

main();
