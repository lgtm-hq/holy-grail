import { expect, test } from "@playwright/test";

test.describe("apps page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("apps/");
  });

  test("renders the recommended apps hero and catalog", async ({ page }) => {
    await expect(page).toHaveTitle(/Recommended Apps/);
    await expect(page.getByRole("heading", { name: /Recommended Apps/, level: 1 })).toBeVisible();
  });

  test("includes at least one catalog section heading", async ({ page }) => {
    const sectionHeadings = page.getByRole("heading", { level: 2 });
    await expect(sectionHeadings.first()).toBeVisible();
    const count = await sectionHeadings.count();
    expect(count).toBeGreaterThan(0);
  });
});
