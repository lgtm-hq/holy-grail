import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(path, "utf8");

test("the Node contract covers patched Undici and the locked build tooling", () => {
  const manifest = JSON.parse(read("package.json"));
  const floor = manifest.engines.node.match(/^>=(\d+)\.(\d+)\.(\d+)$/);
  expect(floor).not.toBeNull();
  expect(Number(floor[1])).toBeGreaterThanOrEqual(22);
  if (Number(floor[1]) === 22) expect(Number(floor[2])).toBeGreaterThanOrEqual(22);

  const version = floor.slice(1).join(".");
  const setup = read(".github/actions/setup-env/action.yml");
  const quality = read(".github/workflows/quality-ci.yml");
  expect(setup).toMatch(new RegExp(`default: '${version.replaceAll(".", "\\.")}'`));
  expect(quality).toMatch(new RegExp(`node-version: '${version.replaceAll(".", "\\.")}'`));
});

test("all locked Undici copies remain on the patched 8.x security baseline", () => {
  const lock = read("bun.lock");
  const versions = [...lock.matchAll(/"undici@(\d+)\.(\d+)\.(\d+)"/g)];
  expect(versions.length).toBeGreaterThan(0);
  for (const [, major, minor, patch] of versions) {
    expect(Number(major)).toBe(8);
    expect(Number(minor)).toBeGreaterThanOrEqual(12);
    if (Number(minor) === 12) expect(Number(patch)).toBeGreaterThanOrEqual(2);
  }
});
