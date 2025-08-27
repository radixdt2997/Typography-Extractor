import { NextResponse } from "next/server";
import { Page } from "puppeteer";

// Type imports
import type { ApiError, HealthCheckResponse } from "@/types/api";
import type { TypographyData } from "@/types/typography";

// Service imports
import { BrowserManager, setupPage } from "@/services/browser-manager";
import {
  navigateToPage,
  optimizedPageScroll,
} from "@/services/page-navigation";
import {
  captureScreenshot,
  extractTypographyData,
  generateSummary,
} from "@/services/typography-extractor";

// Utility imports
import { CONFIG } from "@/config/constants";
import {
  createErrorResponse,
  mapErrorToResponse,
} from "@/utils/error-handling";
import { validateRequest } from "@/utils/validation";

/**
 * POST handler for typography analysis
 */
export async function POST(
  request: Request
): Promise<NextResponse<TypographyData | ApiError>> {
  const startTime = Date.now();
  const browserManager = BrowserManager.getInstance();
  let page: Page | null = null;

  try {
    console.log("=== Typography Analysis Started ===");

    const requestBody = await request.json().catch(() => null);
    const validation = validateRequest(requestBody);

    if (!validation.isValid) {
      return createErrorResponse(validation.error!, 400, "VALIDATION_ERROR");
    }

    const { url, options } = validation.data!;
    const { includeHidden, maxElements, timeout } = options!;

    console.log(`Analyzing: ${url}`);

    const browser = await browserManager.getBrowser();
    page = await browser.newPage();

    await setupPage(page);
    await navigateToPage(page, url, timeout!);
    await optimizedPageScroll(page);

    const [elements, screenshot, pageTitle] = await Promise.all([
      extractTypographyData(page, includeHidden!, maxElements!),
      captureScreenshot(page),
      page.title().catch(() => "Untitled Page"),
    ]);

    const summary = generateSummary(elements);
    const analysisTime = Date.now() - startTime;

    const typographyData: TypographyData = {
      url,
      timestamp: new Date().toISOString(),
      screenshot,
      elements,
      summary,
      metadata: {
        pageTitle,
        viewport: CONFIG.VIEWPORT,
        analysisTime,
      },
    };

    console.log(
      `Analysis completed: ${elements.length} elements in ${analysisTime}ms`
    );
    return NextResponse.json(typographyData);
  } catch (error) {
    console.error("Typography analysis error:", error);
    const errorInfo = mapErrorToResponse(
      error instanceof Error ? error : new Error("Unknown error")
    );
    return createErrorResponse(
      errorInfo.message,
      errorInfo.status,
      errorInfo.code
    );
  } finally {
    if (page) {
      await page.close().catch(console.error);
    }
  }
}

/**
 * GET handler for health check
 */
export async function GET(): Promise<NextResponse<HealthCheckResponse>> {
  return NextResponse.json({
    status: "Typography Analyzer API is running",
    timestamp: new Date().toISOString(),
    version: CONFIG.API.VERSION,
  });
}
