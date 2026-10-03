import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const workflow = readFileSync(".github/workflows/quality-links.yml", "utf8");
const buildScript = readFileSync("scripts/ci/build-site-for-links.sh", "utf8");

test("Quality Links builds the site at ASTRO_BASE=/ before lychee", () => {
  const buildStepIndex = workflow.indexOf("run: bash scripts/ci/build-site-for-links.sh");
  const lycheeStepIndex = workflow.indexOf("lycheeverse/lychee-action@");
  expect(buildStepIndex).toBeGreaterThan(-1);
  expect(lycheeStepIndex).toBeGreaterThan(buildStepIndex);
  expect(buildScript).toContain("ASTRO_BASE=/");
  expect(buildScript).toContain("bun run astro build");
});

test("Quality Links resolves root-relative links against dist", () => {
  expect(workflow).toContain("--root-dir ${{ github.workspace }}/dist");
  expect(workflow).toContain("'src/content/**/*.mdx'");
  expect(workflow).toContain("--fallback-extensions html");
  expect(workflow.includes("--scheme https")).toBe(false);
  expect(workflow).not.toMatch(/^\s+--include-fragments\b/m);
});

test("Quality Links runs on its own workflow and script changes", () => {
  expect(workflow).toContain(".github/workflows/quality-links.yml");
  expect(workflow).toContain("scripts/ci/build-site-for-links.sh");
});
