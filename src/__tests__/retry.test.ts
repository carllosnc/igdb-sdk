import { describe, expect, test } from "bun:test";
import { calculateBackoff, isRetryable, sleep } from "../retry.js";
import { IgdbApiError, IgdbRateLimitError } from "../errors.js";

describe("calculateBackoff", () => {
  test("increases exponentially with attempt", () => {
    const delay1 = calculateBackoff(0, 200, 10_000);
    const delay2 = calculateBackoff(1, 200, 10_000);
    const delay3 = calculateBackoff(2, 200, 10_000);

    expect(delay1).toBeGreaterThanOrEqual(200);
    expect(delay1).toBeLessThan(300);
    expect(delay2).toBeGreaterThanOrEqual(400);
    expect(delay2).toBeLessThan(600);
    expect(delay3).toBeGreaterThanOrEqual(800);
    expect(delay3).toBeLessThan(1200);
  });

  test("caps at maxDelayMs", () => {
    const delay = calculateBackoff(10, 200, 1_000);
    expect(delay).toBeGreaterThanOrEqual(1_000);
    expect(delay).toBeLessThan(1_100);
  });
});

describe("isRetryable", () => {
  test("IgdbRateLimitError is retryable", () => {
    const err = new IgdbRateLimitError(429, "games", "", "");
    expect(isRetryable(err)).toBe(true);
  });

  test("5xx IgdbApiError is retryable", () => {
    const err = new IgdbApiError(503, "games", "", "");
    expect(isRetryable(err)).toBe(true);
  });

  test("4xx IgdbApiError is not retryable", () => {
    const err = new IgdbApiError(400, "games", "", "");
    expect(isRetryable(err)).toBe(false);
  });

  test("TypeError (network error) is retryable", () => {
    expect(isRetryable(new TypeError("fetch failed"))).toBe(true);
  });

  test("generic Error is not retryable", () => {
    expect(isRetryable(new Error("unknown"))).toBe(false);
  });
});

describe("sleep", () => {
  test("resolves after at least the given ms", async () => {
    const start = Date.now();
    await sleep(50);
    expect(Date.now() - start).toBeGreaterThanOrEqual(45);
  });
});
