import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("renders the site title and hero copy", async ({ page }) => {
    await expect(page).toHaveTitle(/Holy Grail/);
    await expect(
      page.getByRole("link", { name: /Holy Grail/, exact: false }).first(),
    ).toBeVisible();
  });

  test("primary navigation links to Guides, Categories and Apps", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(nav.getByRole("link", { name: /Guides/ })).toHaveAttribute(
      "href",
      "/holy-grail/guides/",
    );
    await expect(nav.getByRole("link", { name: /Categories/ })).toHaveAttribute(
      "href",
      "/holy-grail/categories/",
    );
    await expect(nav.getByRole("link", { name: /Apps/ })).toHaveAttribute(
      "href",
      "/holy-grail/apps/",
    );
  });

  test("navigating to Guides shows the guides listing", async ({ page }) => {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: /Guides/ })
      .click();
    await expect(page).toHaveURL(/\/holy-grail\/guides\/?$/);
    await expect(page.getByRole("heading", { name: /All Guides/ })).toBeVisible();
  });
});
