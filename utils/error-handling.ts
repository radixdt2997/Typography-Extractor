import { ApiError, ErrorMapping } from "@/types/api";
import { NextResponse } from "next/server";

/**
 * Error response creator
 */
export const createErrorResponse = (
  error: string,
  status: number,
  code?: string,
  details?: string
): NextResponse<ApiError> => {
  console.error(`API Error [${code || "UNKNOWN"}]:`, error, details || "");
  return NextResponse.json({ error, code, details }, { status });
};

/**
 * Error mapping configuration
 */
const ERROR_MAPPINGS: ReadonlyMap<string, ErrorMapping> = new Map([
  [
    "net::err_name_not_resolved",
    { message: "Website not found", code: "WEBSITE_NOT_FOUND", status: 404 },
  ],
  [
    "timeouterror",
    { message: "Connection timeout", code: "CONNECTION_TIMEOUT", status: 408 },
  ],
  [
    "net::err_connection_refused",
    { message: "Connection refused", code: "CONNECTION_REFUSED", status: 503 },
  ],
  ["ssl", { message: "SSL/TLS error", code: "SSL_ERROR", status: 400 }],
  [
    "browser launch failed",
    {
      message: "Browser initialization failed",
      code: "BROWSER_LAUNCH_FAILED",
      status: 500,
    },
  ],
]);

/**
 * Map error to appropriate response
 */
export const mapErrorToResponse = (error: Error): ErrorMapping => {
  const errorMessage = error.message.toLowerCase();

  for (const [key, mapping] of ERROR_MAPPINGS) {
    if (errorMessage.includes(key)) return mapping;
  }

  return {
    message: "Failed to process webpage",
    code: "PAGE_PROCESSING_FAILED",
    status: 500,
  };
};

export const handleApiError = (error: unknown): string => {
  return error instanceof Error
    ? error.message
    : "An unexpected error occurred";
};
