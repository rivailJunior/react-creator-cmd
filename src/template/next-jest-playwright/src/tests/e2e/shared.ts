import { type Page } from "@playwright/test";

export class PlayConfigPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async closePage() {
    await this.page.close();
  }

  async goto(route: string = "/") {
    await this.page.goto("http://localhost:3000" + route);
  }
}
