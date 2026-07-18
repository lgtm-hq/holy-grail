import { expect, test } from "@playwright/test";

test.describe("foundation category page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("categories/foundation/");
  });

  test("renders the category heading and includes the Homebrew guide", async ({ page }) => {
    await expect(page).toHaveTitle(/Foundation/);
    await expect(page.getByRole("heading", { name: /Foundation/, level: 1 })).toBeVisible();

    const homebrewCard = page.getByRole("link", { name: /Homebrew/ }).first();
    await expect(homebrewCard).toBeVisible();
    await expect(homebrewCard).toHaveAttribute("href", "/holy-grail/guides/homebrew/");
  });

  test("clicking a guide card navigates to the guide", async ({ page }) => {
    await page
      .getByRole("link", { name: /Homebrew/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/holy-grail\/guides\/homebrew\/?$/);
    await expect(page.getByRole("heading", { name: "Homebrew", level: 1 })).toBeVisible();
  });
});

test.describe("categories index", () => {
  test("lists Foundation, Languages and IDEs categories", async ({ page }) => {
    await page.goto("categories/");
    for (const name of ["Foundation", "Languages", "IDEs"]) {
      await expect(page.getByRole("link", { name: new RegExp(name) }).first()).toBeVisible();
    }
  });
});
