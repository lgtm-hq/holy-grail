import { afterEach, beforeEach, describe, expect, it } from "bun:test";

// The `paths` module reads `import.meta.env.BASE_URL`, which in Bun is backed
// by `process.env`. Each test sets the base explicitly so the suite is
// independent of the ambient environment.
const ORIGINAL_BASE = process.env.BASE_URL;

async function loadPaths() {
  return await import("../../src/lib/paths");
}

describe("paths", () => {
  beforeEach(() => {
    process.env.BASE_URL = "/holy-grail/";
  });

  afterEach(() => {
    if (ORIGINAL_BASE === undefined) {
      delete process.env.BASE_URL;
    } else {
      process.env.BASE_URL = ORIGINAL_BASE;
    }
  });

  describe("withBase", () => {
    it("prefixes an absolute path with the base URL", async () => {
      const { withBase } = await loadPaths();
      expect(withBase("/guides/")).toBe("/holy-grail/guides/");
    });

    it("prefixes a relative path with the base URL", async () => {
      const { withBase } = await loadPaths();
      expect(withBase("guides/")).toBe("/holy-grail/guides/");
    });

    it("normalizes a base URL that is missing a trailing slash", async () => {
      process.env.BASE_URL = "/holy-grail";
      const { withBase } = await loadPaths();
      expect(withBase("/guides/")).toBe("/holy-grail/guides/");
    });

    it("returns the base itself when given an empty path", async () => {
      const { withBase } = await loadPaths();
      expect(withBase("")).toBe("/holy-grail/");
    });

    it("supports a root base of '/'", async () => {
      process.env.BASE_URL = "/";
      const { withBase } = await loadPaths();
      expect(withBase("/guides/")).toBe("/guides/");
    });
  });

  describe("getBase", () => {
    it("returns the base URL without the trailing slash", async () => {
      const { getBase } = await loadPaths();
      expect(getBase()).toBe("/holy-grail");
    });

    it("returns the base unchanged when it has no trailing slash", async () => {
      process.env.BASE_URL = "/holy-grail";
      const { getBase } = await loadPaths();
      expect(getBase()).toBe("/holy-grail");
    });
  });

  describe("isInternalPath", () => {
    it("returns true for paths starting with the base", async () => {
      const { isInternalPath } = await loadPaths();
      expect(isInternalPath("/holy-grail/guides/")).toBe(true);
    });

    it("returns true for site-absolute paths", async () => {
      const { isInternalPath } = await loadPaths();
      expect(isInternalPath("/guides/")).toBe(true);
    });

    it("returns false for external URLs", async () => {
      const { isInternalPath } = await loadPaths();
      expect(isInternalPath("https://example.com/")).toBe(false);
    });
  });

  describe("extractGuideSlug", () => {
    it.each([
      { input: "/guides/java/", expected: "java" },
      { input: "/guides/java", expected: "java" },
      { input: "/holy-grail/guides/appium/", expected: "appium" },
    ])("returns '$expected' for '$input'", async ({ input, expected }) => {
      const { extractGuideSlug } = await loadPaths();
      expect(extractGuideSlug(input)).toBe(expected);
    });

    it("returns null for hrefs that are not guide URLs", async () => {
      const { extractGuideSlug } = await loadPaths();
      expect(extractGuideSlug("/categories/foundation/")).toBeNull();
    });
  });

  describe("isGuideHref", () => {
    it.each([
      { input: "/guides/java/", expected: true },
      { input: "/holy-grail/guides/appium/", expected: true },
    ])("returns $expected for internal guide href '$input'", async ({ input, expected }) => {
      const { isGuideHref } = await loadPaths();
      expect(isGuideHref(input)).toBe(expected);
    });

    it("returns false for external guide URLs", async () => {
      const { isGuideHref } = await loadPaths();
      expect(isGuideHref("https://example.com/guides/java/")).toBe(false);
    });

    it("returns false for non-guide hrefs", async () => {
      const { isGuideHref } = await loadPaths();
      expect(isGuideHref("/apps/")).toBe(false);
    });
  });
});
