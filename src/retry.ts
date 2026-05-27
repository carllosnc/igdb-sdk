import { IgdbApiError, IgdbRateLimitError } from "./errors.js";

export interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
}

export const defaultRetry: Required<RetryOptions> = {
  maxRetries: 3,
  baseDelayMs: 200,
  maxDelayMs: 10_000,
};

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calculateBackoff(attempt: number, baseDelayMs: number, maxDelayMs: number): number {
  const delay = Math.min(baseDelayMs * 2 ** attempt, maxDelayMs);
  const jitter = delay * 0.1 * Math.random();
  return Math.round(delay + jitter);
}

export function isRetryable(error: unknown): boolean {
  if (error instanceof IgdbRateLimitError) return true;
  if (error instanceof IgdbApiError && error.statusCode >= 500) return true;
  if (error instanceof TypeError) return true;
  return false;
}
