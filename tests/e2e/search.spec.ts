import { expect, test } from "@playwright/test";

test.describe("search modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("opens via keyboard shortcut and closes with Escape", async ({ page }) => {
    const dialog = page.getByRole("dialog", { name: "Search guides" });
    await expect(dialog).toBeHidden();

    await page.keyboard.press("ControlOrMeta+k");
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("opens when clicking the header search trigger", async ({ page }) => {
    await page.getByRole("button", { name: /Search guides/ }).click();
    await expect(page.getByRole("dialog", { name: "Search guides" })).toBeVisible();
  });
});
