import { CONFIG } from "@/config/constants";
import { ValidationResult } from "@/types/api";

/**
 * URL validation utility
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ["http:", "https:"].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

/**
 * Request validation with comprehensive type checking
 */
export const validateRequest = (body: unknown): ValidationResult => {
  if (!body || typeof body !== "object") {
    return {
      isValid: false,
      error: "Request body must be a valid JSON object",
    };
  }

  const { url, options = {} } = body as Record<string, unknown>;

  if (!url || typeof url !== "string") {
    return {
      isValid: false,
      error: "URL is required and must be a string",
    };
  }

  if (!isValidUrl(url)) {
    return {
      isValid: false,
      error: "Invalid URL format. Please include http:// or https://",
    };
  }

  const {
    includeHidden = false,
    maxElements = CONFIG.LIMITS.MAX_ELEMENTS,
    timeout = CONFIG.TIMEOUT.DEFAULT,
  } = options as Record<string, unknown>;

  if (typeof includeHidden !== "boolean") {
    return {
      isValid: false,
      error: "includeHidden must be a boolean",
    };
  }

  if (
    typeof maxElements !== "number" ||
    maxElements < 1 ||
    maxElements > CONFIG.LIMITS.MAX_ELEMENTS_ABSOLUTE
  ) {
    return {
      isValid: false,
      error: `maxElements must be between 1 and ${CONFIG.LIMITS.MAX_ELEMENTS_ABSOLUTE}`,
    };
  }

  if (
    typeof timeout !== "number" ||
    timeout < 5000 ||
    timeout > CONFIG.TIMEOUT.MAX
  ) {
    return {
      isValid: false,
      error: `timeout must be between 5000 and ${CONFIG.TIMEOUT.MAX}`,
    };
  }

  return {
    isValid: true,
    data: {
      url: url.trim(),
      options: { includeHidden, maxElements, timeout },
    },
  };
};
