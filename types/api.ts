/**
 * API request/response types
 */
export interface AnalysisOptions {
  readonly includeHidden?: boolean;
  readonly maxElements?: number;
  readonly timeout?: number;
}

export interface RequestBody {
  readonly url: string;
  readonly options?: AnalysisOptions;
}

export interface ApiError {
  readonly error: string;
  readonly code?: string;
  readonly details?: string;
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly error?: string;
  readonly data?: RequestBody;
}

export interface ErrorMapping {
  readonly message: string;
  readonly code: string;
  readonly status: number;
}

export interface HealthCheckResponse {
  readonly status: string;
  readonly timestamp: string;
  readonly version: string;
}
