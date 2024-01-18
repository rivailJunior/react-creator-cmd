import { test, expect } from "@playwright/test";
import { PlayConfigPage } from "./shared";

test.describe("App", () => {
  let ConfigPage: PlayConfigPage;
  test.beforeEach(async ({ page }) => {
    ConfigPage = new PlayConfigPage(page);
    await ConfigPage.goto();
  });

  test("should open App properly ", async ({ page }) => {
    await expect(
      page.getByText(/Hey, let’s build something together?/i)
    ).toBeVisible();

    await expect(
      page.getByText(/We are here to help you with your Next.js project/i)
    ).toBeVisible();
  });
});
