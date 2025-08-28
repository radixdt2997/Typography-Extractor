import { TEXT_SELECTORS } from "@/config/constants";
import { TypographyElement, TypographySummary } from "@/types/typography";
import { Page } from "puppeteer";

/**
 * Extract typography data from page elements
 */
export const extractTypographyData = async (
  page: Page,
  includeHidden: boolean,
  maxElements: number
): Promise<TypographyElement[]> => {
  return page.evaluate(
    (selectors, includeHidden, maxElements) => {
      const elements: TypographyElement[] = [];
      const allElements = document.querySelectorAll(selectors.join(", "));

      const rgbToHex = (rgb: string): string => {
        if (rgb.startsWith("#")) return rgb.toUpperCase();

        const rgbMatch = rgb.match(
          /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
        );
        if (!rgbMatch) return rgb;

        const [, r, g, b] = rgbMatch.map(Number);
        if ([r, g, b].some((val) => val > 255 || val < 0)) return rgb;

        const toHex = (n: number): string => n.toString(16).padStart(2, "0");
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
      };

      let elementIndex = 0;

      for (const element of allElements) {
        if (elements.length >= maxElements) break;

        const htmlElement = element as HTMLElement;
        const text = htmlElement.innerText?.trim();

        if (!text || text.length < 1) continue;

        const computedStyle = window.getComputedStyle(htmlElement);

        if (
          !includeHidden &&
          (computedStyle.display === "none" ||
            computedStyle.visibility === "hidden" ||
            parseFloat(computedStyle.opacity) === 0)
        )
          continue;

        const rect = htmlElement.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        elements.push({
          id: `element-${elementIndex++}`,
          tagName: htmlElement.tagName.toLowerCase(),
          text: text.slice(0, 300),
          styles: {
            fontFamily: computedStyle.fontFamily || "",
            fontSize: computedStyle.fontSize || "",
            fontWeight: computedStyle.fontWeight || "",
            lineHeight: computedStyle.lineHeight || "",
            color: rgbToHex(computedStyle.color || ""),
            letterSpacing: computedStyle.letterSpacing || "",
            textAlign: computedStyle.textAlign || "",
            textTransform: computedStyle.textTransform || "",
            fontStyle: computedStyle.fontStyle || "",
            textDecoration: computedStyle.textDecoration || "",
            fontVariant: computedStyle.fontVariant || "",
          },
          position: {
            x: Math.round(rect.left + window.scrollX),
            y: Math.round(rect.top + window.scrollY),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          },
          computedStyles: {
            marginTop: computedStyle.marginTop || "",
            marginBottom: computedStyle.marginBottom || "",
            paddingTop: computedStyle.paddingTop || "",
            paddingBottom: computedStyle.paddingBottom || "",
          },
        });
      }

      return elements;
    },
    TEXT_SELECTORS,
    includeHidden,
    maxElements
  );
};

/**
 * Generate typography summary statistics
 */
export const generateSummary = (
  elements: readonly TypographyElement[]
): TypographySummary => {
  const extractUnique = <T>(
    mapper: (el: TypographyElement) => T,
    limit: number
  ): readonly string[] => {
    const mapped = elements.map(mapper).filter(Boolean) as string[];
    return [...new Set(mapped)].slice(0, limit);
  };

  return {
    totalElements: elements.length,
    uniqueFonts: extractUnique((el) => el.styles.fontFamily, 50),
    fontSizes: extractUnique((el) => el.styles.fontSize, 30),
    colors: extractUnique((el) => el.styles.color, 30),
    fontWeights: extractUnique((el) => el.styles.fontWeight, 20),
    textAlignments: extractUnique((el) => el.styles.textAlign, 10),
  } as const;
};

/**
 * Capture full page screenshot
 */
export const captureScreenshot = async (page: Page): Promise<string> => {
  try {
    const screenshot = await page.screenshot({
      encoding: "base64",
      fullPage: true,
      type: "png",
    });
    return `data:image/png;base64,${screenshot}`;
  } catch (error) {
    console.warn("Screenshot capture failed:", error);
    return "";
  }
};
