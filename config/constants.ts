/**
 * Application configuration constants
 */
export const CONFIG = {
  TIMEOUT: {
    DEFAULT: 30000,
    MAX: 60000,
    NAVIGATION: 25000,
    SELECTOR_WAIT: 3000,
  },
  LIMITS: {
    MAX_ELEMENTS: 500,
    MAX_ELEMENTS_ABSOLUTE: 1000,
    TEXT_LENGTH: 300,
  },
  VIEWPORT: {
    width: 1920,
    height: 1080,
  },
  SCROLL: {
    STEP: 800,
    DELAY: 100,
    FINAL_WAIT: 2000,
  },
  API: {
    VERSION: "3.0.0",
  },
} as const;

export const TEXT_SELECTORS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
  "div",
  "a",
  "li",
  "td",
  "th",
  "button",
  "label",
  "blockquote",
  "cite",
  "code",
  "pre",
  "strong",
  "b",
  "em",
  "i",
  "small",
  "mark",
  "time",
  "address",
  'input[type="text"]',
  'input[type="email"]',
  'input[type="search"]',
  'input[type="url"]',
  "textarea",
  "legend",
  "caption",
  "figcaption",
] as const;

export const BROWSER_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--disable-web-security",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-renderer-backgrounding",
  "--no-first-run",
  "--enable-automation",
  "--disable-extensions",
  "--disable-plugins",
  "--disable-images",
  `--window-size=${CONFIG.VIEWPORT.width},${CONFIG.VIEWPORT.height}`,
] as const;
