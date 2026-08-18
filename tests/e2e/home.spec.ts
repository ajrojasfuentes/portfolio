import { test, expect } from "@playwright/test";

test.describe("Portfolio Home Page", () => {
  test("loads successfully and displays key sections", async ({ page }) => {
    await page.goto("/");

    // 1. Title verification
    await expect(page).toHaveTitle(/Anthony Rojas Fuentes/i);

    // 2. Navigation bar presence
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();

    // 3. 3D ID Badge verification
    const badgeContainer = page.locator("#badge-container");
    await expect(badgeContainer).toBeVisible();
    await expect(badgeContainer).toHaveAttribute("role", "button");

    // 4. Sections exist in DOM
    const sections = [
      "#home",
      "#about",
      "#skills",
      "#experience",
      "#projects",
      "#publications",
      "#certifications",
      "#accomplishments",
    ];

    for (const sectionId of sections) {
      const section = page.locator(sectionId);
      await expect(section).toBeAttached();
    }
  });

  test("flips ID card on click", async ({ page }) => {
    await page.goto("/");

    const badgeContainer = page.locator("#badge-container");
    const badgeCard = page.locator("#badge-card");

    // Initial state: not flipped
    await expect(badgeCard).not.toHaveClass(/is-flipped/);

    // Click to flip
    await badgeContainer.click();
    await expect(badgeCard).toHaveClass(/is-flipped/);

    // Click to revert
    await badgeContainer.click();
    await expect(badgeCard).not.toHaveClass(/is-flipped/);
  });
});
