import { CONFIG } from "@/config/constants";
import { Page } from "puppeteer";

/**
 * Navigate to page with fallback strategies
 */
export const navigateToPage = async (
  page: Page,
  url: string,
  timeout: number
): Promise<void> => {
  const strategies = [
    { waitUntil: "networkidle2" as const, timeout },
    { waitUntil: "domcontentloaded" as const, timeout: timeout + 5000 },
  ] as const;

  for (const [index, strategy] of strategies.entries()) {
    try {
      await page.goto(url, strategy);
      break;
    } catch (error) {
      if (index === strategies.length - 1) throw error;
      console.warn(
        `Navigation attempt ${index + 1} failed, trying next strategy`
      );
    }
  }

  try {
    await page.waitForSelector("body", {
      timeout: CONFIG.TIMEOUT.SELECTOR_WAIT,
    });
  } catch {
    console.warn("Body selector wait failed, continuing...");
  }
};

/**
 * Optimized page scrolling for dynamic content loading
 */
export const optimizedPageScroll = async (page: Page): Promise<void> => {
  try {
    const { scrollHeight, clientHeight } = await page.evaluate(() => ({
      scrollHeight: document.body.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
    }));

    if (scrollHeight <= clientHeight) return;

    let currentPosition = 0;
    const maxScrolls = Math.ceil(scrollHeight / CONFIG.SCROLL.STEP);

    for (let i = 0; i < maxScrolls && currentPosition < scrollHeight; i++) {
      await page.evaluate(
        (position) => window.scrollTo(0, position),
        currentPosition
      );
      await new Promise((resolve) => setTimeout(resolve, CONFIG.SCROLL.DELAY));
      currentPosition += CONFIG.SCROLL.STEP;
    }

    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((resolve) =>
      setTimeout(resolve, CONFIG.SCROLL.FINAL_WAIT)
    );
  } catch (error) {
    console.warn("Page scrolling failed:", error);
  }
};
