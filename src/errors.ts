export class IgdbError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IgdbError";
  }
}

export class IgdbApiError extends IgdbError {
  statusCode: number;
  endpoint: string;
  body: string;

  constructor(statusCode: number, endpoint: string, body: string, responseText: string) {
    super(`IGDB API error (${endpoint}): ${statusCode} ${responseText}`);
    this.name = "IgdbApiError";
    this.statusCode = statusCode;
    this.endpoint = endpoint;
    this.body = body;
  }
}

export class IgdbAuthError extends IgdbError {
  statusCode: number;

  constructor(statusCode: number, responseText: string) {
    super(`Auth failed: ${statusCode} ${responseText}`);
    this.name = "IgdbAuthError";
    this.statusCode = statusCode;
  }
}

export class IgdbRateLimitError extends IgdbApiError {
  retryAfter?: number;

  constructor(statusCode: number, endpoint: string, body: string, responseText: string, retryAfter?: number) {
    super(statusCode, endpoint, body, responseText);
    this.name = "IgdbRateLimitError";
    this.retryAfter = retryAfter;
  }
}
