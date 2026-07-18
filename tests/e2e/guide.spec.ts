import { expect, test } from "@playwright/test";

test.describe("homebrew guide page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("guides/homebrew/");
  });

  test("renders guide title, breadcrumb and category badge", async ({ page }) => {
    await expect(page).toHaveTitle(/Homebrew/);
    await expect(page.getByRole("heading", { name: "Homebrew", level: 1 })).toBeVisible();

    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumb.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/holy-grail/",
    );
    await expect(breadcrumb.getByRole("link", { name: "Guides" })).toHaveAttribute(
      "href",
      "/holy-grail/guides/",
    );
  });

  test("renders a Table of Contents linking to in-page headings", async ({ page }) => {
    // The desktop sidebar ToC is visible at >= 1200px, which matches the default
    // Desktop Chrome viewport (1280x720).
    const toc = page.getByRole("navigation", { name: "Table of contents" }).first();
    await expect(toc).toBeVisible();

    const installationLink = toc.getByRole("link", { name: "Installation" }).first();
    await expect(installationLink).toBeVisible();
    await expect(installationLink).toHaveAttribute("href", /#installation/);
  });
});
