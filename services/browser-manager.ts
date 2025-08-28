import { BROWSER_ARGS, CONFIG } from "@/config/constants";
import puppeteer, { Browser, Page } from "puppeteer";

/**
 * Singleton browser manager for efficient resource usage
 */
export class BrowserManager {
  private static instance: BrowserManager;
  private browser: Browser | null = null;

  static getInstance(): BrowserManager {
    if (!BrowserManager.instance) {
      BrowserManager.instance = new BrowserManager();
    }
    return BrowserManager.instance;
  }

  async getBrowser(): Promise<Browser> {
    if (!this.browser || !this.browser.isConnected()) {
      this.browser = await this.createBrowser();
    }
    return this.browser;
  }

  private async createBrowser(): Promise<Browser> {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: [...BROWSER_ARGS],
        timeout: CONFIG.TIMEOUT.DEFAULT,
      });

      console.log("Browser launched successfully");
      return browser;
    } catch (error) {
      throw new Error(
        `Browser launch failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async closeBrowser(): Promise<void> {
    if (this.browser) {
      try {
        await this.browser.close();
        this.browser = null;
        console.log("Browser closed successfully");
      } catch (error) {
        console.error("Error closing browser:", error);
      }
    }
  }
}

/**
 * Page setup with optimized configuration
 */
export const setupPage = async (page: Page): Promise<void> => {
  await Promise.all([
    page.setViewport(CONFIG.VIEWPORT),
    page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Cache-Control": "no-cache",
    }),
  ]);

  await page.setRequestInterception(true);

  page.on("request", (request) => {
    const resourceType = request.resourceType();
    const shouldBlock =
      ["media", "font", "image"].includes(resourceType) ||
      request.url().includes("analytics") ||
      request.url().includes("tracking");

    if (shouldBlock) {
      request.abort();
    } else {
      request.continue();
    }
  });

  page.on("pageerror", (error) => {
    if (!error.message.includes("Script error")) {
      console.warn("Page error:", error.message);
    }
  });
};
