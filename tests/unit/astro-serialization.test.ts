import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { runInNewContext } from "node:vm";

// Resolve from Astro, not Bun's ambient dependency cache: the installed consumer
// must receive the serializer API its content-import plugin actually calls.
const astroRequire = createRequire(import.meta.resolve("astro/package.json"));
const devalue = await import(pathToFileURL(astroRequire.resolve("devalue")).href);

test("Astro's devalue tagged replacer preserves URL content data", () => {
  const url = new URL("https://example.com/guide?q='quoted'&lang=en#intro");
  const code = devalue.uneval({ url }, (value, js) => {
    if (value instanceof URL) return js`new URL(${value.href})`;
  });
  const restored = runInNewContext(`(${code})`, { URL });
  expect(restored.url).toBeInstanceOf(URL);
  expect(restored.url.href).toBe(url.href);
});

test.each([false, true])(
  "Astro's image-asset replacer preserves metadata (track=%s)",
  async (track) => {
    const { getImageAssetCode } = await import(
      new URL(
        "./dist/assets/utils/image-asset-code.js",
        pathToFileURL(astroRequire.resolve("./package.json")),
      ).href
    );
    const { createImageAsset } = await import("astro/assets/image-asset");
    const metadata = { src: "/_astro/guide.hash.png", width: 24, height: 16, format: "png" };
    const fsPath = "/fixture/guide's image.png";
    const input = { image: { ...metadata, ASTRO_ASSET: fsPath } };
    const code = devalue.uneval(input, (value, js) => {
      if (value && typeof value === "object" && "ASTRO_ASSET" in value) {
        const { ASTRO_ASSET, ...asset } = value;
        return getImageAssetCode(js, asset, ASTRO_ASSET, track);
      }
    });
    const restored = runInNewContext(`(${code})`, { __astro_createImageAsset: createImageAsset });
    expect({ ...restored.image }).toEqual(metadata);
    expect(restored.image.fsPath).toBe(fsPath);
    expect(Object.keys(restored.image)).not.toContain("fsPath");
    expect(restored.image.ASTRO_ASSET).toBeUndefined();
  },
);

test("serializer versions remain consumer-scoped instead of globally overridden", () => {
  const project = JSON.parse(readFileSync("package.json", "utf8"));
  expect(project.overrides).not.toHaveProperty("devalue");
});

test("CI and package engines satisfy Astro's Node minimum", () => {
  const project = JSON.parse(readFileSync("package.json", "utf8"));
  const astro = astroRequire("./package.json");
  const minimum = astro.engines.node.match(/\d+\.\d+\.\d+/)[0];
  expect(project.engines.node).toBe(`>=${minimum}`);
  expect(readFileSync(".github/actions/setup-env/action.yml", "utf8")).toContain(
    `default: '${minimum}'`,
  );
  expect(readFileSync(".github/workflows/quality-ci.yml", "utf8")).toContain(
    `node-version: '${minimum}'`,
  );
});
