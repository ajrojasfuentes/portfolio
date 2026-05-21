import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with correct title and content", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Andres Rojas Fuentes — Portfolio/);

    const heading = page.locator("h1");
    await expect(heading).toContainText("AJ ROJAS FUENTES");

    const paragraph = page.locator("p").first();
    await expect(paragraph).toContainText("Data Automation & AI Engineer");
  });
});
