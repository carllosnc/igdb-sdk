import { describe, expect, test } from "bun:test";
import { IgdbError, IgdbApiError, IgdbAuthError, IgdbRateLimitError } from "../errors.js";

describe("IgdbError", () => {
  test("is base error class", () => {
    const err = new IgdbError("something went wrong");
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("IgdbError");
    expect(err.message).toBe("something went wrong");
  });
});

describe("IgdbApiError", () => {
  test("extends IgdbError with statusCode, endpoint, body", () => {
    const err = new IgdbApiError(400, "games", "fields name;", "Bad Request");

    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(IgdbError);
    expect(err.name).toBe("IgdbApiError");
    expect(err.message).toBe("IGDB API error (games): 400 Bad Request");
    expect(err.statusCode).toBe(400);
    expect(err.endpoint).toBe("games");
    expect(err.body).toBe("fields name;");
  });
});

describe("IgdbAuthError", () => {
  test("extends IgdbError with statusCode", () => {
    const err = new IgdbAuthError(401, "Unauthorized");

    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(IgdbError);
    expect(err.name).toBe("IgdbAuthError");
    expect(err.message).toBe("Auth failed: 401 Unauthorized");
    expect(err.statusCode).toBe(401);
  });
});

describe("IgdbRateLimitError", () => {
  test("extends IgdbApiError with optional retryAfter", () => {
    const err = new IgdbRateLimitError(429, "games", "fields name;", "Too Many Requests", 60);

    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(IgdbError);
    expect(err).toBeInstanceOf(IgdbApiError);
    expect(err.name).toBe("IgdbRateLimitError");
    expect(err.message).toBe("IGDB API error (games): 429 Too Many Requests");
    expect(err.statusCode).toBe(429);
    expect(err.endpoint).toBe("games");
    expect(err.body).toBe("fields name;");
    expect(err.retryAfter).toBe(60);
  });

  test("retryAfter defaults to undefined", () => {
    const err = new IgdbRateLimitError(429, "games", "fields name;", "Rate limited");
    expect(err.retryAfter).toBeUndefined();
  });
});
