import { CONFIG } from "@/config/constants";

/**
 * Text sanitization utility
 */
export const sanitizeText = (text: string): string =>
  text.trim().replace(/\s+/g, " ").slice(0, CONFIG.LIMITS.TEXT_LENGTH);

/**
 * RGB to Hex color conversion
 */
export const rgbToHex = (rgb: string): string => {
  if (rgb.startsWith("#")) return rgb.toUpperCase();

  const rgbMatch = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (!rgbMatch) return rgb;

  const [, r, g, b] = rgbMatch.map(Number);
  if ([r, g, b].some((val) => val > 255 || val < 0)) return rgb;

  const toHex = (n: number): string => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};
