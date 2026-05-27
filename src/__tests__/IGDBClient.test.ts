import { describe, expect, test, mock, afterEach, spyOn } from "bun:test";
import { IGDBClient } from "../IGDBClient.js";
import { IgdbApiError, IgdbAuthError, IgdbRateLimitError } from "../errors.js";
import type { HttpClient } from "../http.js";

const TOKEN_URL = "https://id.twitch.tv/oauth2/token";
const BASE_URL = "https://api.igdb.com/v4";

afterEach(() => {
  mock.restore();
});

function okTokenFetch() {
  return mock((...args: any[]) => {
    const url = String(args[0]);
    if (url === TOKEN_URL) {
      return new Response(JSON.stringify({ access_token: "test_token", expires_in: 3600 }), { status: 200 });
    }
    return new Response(JSON.stringify([{ id: 1, name: "Test" }]), { status: 200 });
  });
}

describe("IGDBClient", () => {
  describe("constructor", () => {
    test("stores credentials and initializes all sub-clients", () => {
      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs" });

      expect(client.game).toBeDefined();
      expect(client.platform).toBeDefined();
      expect(client.company).toBeDefined();
      expect(client.ageRating).toBeDefined();
      expect(client.artwork).toBeDefined();
      expect(client.character).toBeDefined();
      expect(client.collection).toBeDefined();
      expect(client.event).toBeDefined();
      expect(client.externalGame).toBeDefined();
      expect(client.popularity).toBeDefined();
      expect(client.releaseDate).toBeDefined();
      expect(client.report).toBeDefined();
      expect(client.search).toBeDefined();
      expect(client.website).toBeDefined();
      expect(client.misc).toBeDefined();
    });

    test("applies retry and middleware options", () => {
      const mw = { name: "test", onRequest: (ctx: any) => ctx };
      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs", retry: { maxRetries: 5 }, middlewares: [mw] });
      expect((client as any).retryOptions.maxRetries).toBe(5);
      expect((client as any).middlewares).toEqual([mw]);
    });
  });

  describe("query", () => {
    test("fetches token on first call then queries the endpoint", async () => {
      global.fetch = okTokenFetch() as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs" });
      const result = await client.query("games", "fields name; limit 1;");

      expect(result).toEqual([{ id: 1, name: "Test" }]);
    });

    test("reuses cached token on subsequent calls", async () => {
      const fetcher = okTokenFetch();
      global.fetch = fetcher as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs" });
      await client.query("games", "fields name; limit 1;");
      await client.query("platforms", "fields name; limit 1;");

      const tokenCalls = fetcher.mock.calls.filter(
        c => String(c[0]) === TOKEN_URL,
      );
      expect(tokenCalls.length).toBe(1);
    });

    test("sends correct HTTP request shape", async () => {
      const fetcher = okTokenFetch();
      global.fetch = fetcher as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs" });
      await client.query("games", "fields name; limit 1;");

      const apiCalls = fetcher.mock.calls.filter(
        c => String(c[0]).startsWith(BASE_URL),
      );
      expect(apiCalls.length).toBe(1);

      const call = apiCalls[0]!;
      expect(String(call[0])).toBe(`${BASE_URL}/games`);
      const opts = (call as any)[1] as Record<string, any>;
      expect(opts.method).toBe("POST");
      expect(opts.headers["Content-Type"]).toBe("text/plain");
      expect(opts.headers["Client-ID"]).toBe("cid");
      expect(opts.body).toBe("fields name; limit 1;");
    });

    test("throws IgdbApiError on 4xx API error", async () => {
      global.fetch = mock((...args: any[]) => {
        if (String(args[0]) === TOKEN_URL) {
          return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
        }
        return new Response("Bad Request", { status: 400 });
      }) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs" });
      const promise = client.query("games", "bad query;");
      await expect(promise).rejects.toThrow(IgdbApiError);
      await expect(promise).rejects.toMatchObject({ statusCode: 400, endpoint: "games" });
    });

    test("throws IgdbAuthError on auth failure", async () => {
      global.fetch = mock((..._: any[]) => new Response("", { status: 401 })) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "bad", clientSecret: "bad" });
      const promise = client.query("games", "fields name;");
      await expect(promise).rejects.toThrow(IgdbAuthError);
      await expect(promise).rejects.toMatchObject({ statusCode: 401 });
    });

    test("throws IgdbRateLimitError on 429", async () => {
      global.fetch = mock((...args: any[]) => {
        if (String(args[0]) === TOKEN_URL) {
          return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
        }
        return new Response("Rate limited", { status: 429 });
      }) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs" });
      const promise = client.query("games", "fields name;");
      await expect(promise).rejects.toThrow(IgdbRateLimitError);
      await expect(promise).rejects.toMatchObject({ statusCode: 429 });
    });
  });

  describe("retry", () => {
    test("retries on 5xx up to maxRetries then throws", async () => {
      let attempts = 0;
      global.fetch = mock((...args: any[]) => {
        if (String(args[0]) === TOKEN_URL) {
          return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
        }
        attempts++;
        return new Response("Server Error", { status: 503 });
      }) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs", retry: { maxRetries: 2, baseDelayMs: 5 } });
      const promise = client.query("games", "fields name;");
      await expect(promise).rejects.toThrow(IgdbApiError);
      expect(attempts).toBe(3);
    });

    test("succeeds on retry after transient failure", async () => {
      let attempts = 0;
      global.fetch = mock((...args: any[]) => {
        if (String(args[0]) === TOKEN_URL) {
          return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
        }
        attempts++;
        if (attempts === 1) return new Response("Server Error", { status: 503 });
        return new Response(JSON.stringify([{ id: 1, name: "Recovered" }]), { status: 200 });
      }) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs", retry: { maxRetries: 2, baseDelayMs: 5 } });
      const result = await client.query("games", "fields name;");
      expect(attempts).toBe(2);
      expect(result).toEqual([{ id: 1, name: "Recovered" }]);
    });

    test("does not retry on 4xx errors", async () => {
      global.fetch = mock((...args: any[]) => {
        if (String(args[0]) === TOKEN_URL) {
          return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
        }
        return new Response("Bad Request", { status: 400 });
      }) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs", retry: { maxRetries: 3, baseDelayMs: 5 } });
      const promise = client.query("games", "bad;");
      await expect(promise).rejects.toThrow(IgdbApiError);
    });
  });

  describe("middleware", () => {
    test("onRequest can modify headers", async () => {
      global.fetch = okTokenFetch() as unknown as typeof fetch;

      const mw = {
        name: "header-modifier",
        onRequest(ctx: any) {
          ctx.headers["X-Custom"] = "value";
          return ctx;
        },
      };
      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs", middlewares: [mw] });
      await client.query("games", "fields name;");

      const apiCalls = (global.fetch as any).mock.calls.filter(
        (c: any) => String(c[0]).startsWith(BASE_URL),
      );
      expect(apiCalls[0][1].headers["X-Custom"]).toBe("value");
    });

    test("onResponse can modify the response", async () => {
      global.fetch = okTokenFetch() as unknown as typeof fetch;

      const mw = {
        name: "response-modifier",
        onResponse() {
          return { status: 200, body: JSON.stringify([{ id: 99, name: "Modified" }]), headers: {} };
        },
      };
      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs", middlewares: [mw] });
      const result = await client.query("games", "fields name;");
      expect(result).toEqual([{ id: 99, name: "Modified" }]);
    });

    test("onError is called on failure", async () => {
      global.fetch = mock((...args: any[]) => {
        if (String(args[0]) === TOKEN_URL) {
          return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
        }
        return new Response("Bad Request", { status: 400 });
      }) as unknown as typeof fetch;

      const onError = mock(() => {});
      const mw = { name: "error-logger", onError };
      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs", middlewares: [mw] });
      await expect(client.query("games", "bad;")).rejects.toThrow();
      expect(onError).toHaveBeenCalledTimes(1);
      expect((onError.mock.calls[0] as any)[0]).toBeInstanceOf(IgdbApiError);
    });

    test("middleware pipeline runs in order", async () => {
      global.fetch = okTokenFetch() as unknown as typeof fetch;

      const order: string[] = [];
      const mw1 = {
        name: "mw1",
        onRequest(ctx: any) { order.push("req1"); return ctx; },
        onResponse(r: any) { order.push("res1"); return r; },
      };
      const mw2 = {
        name: "mw2",
        onRequest(ctx: any) { order.push("req2"); return ctx; },
        onResponse(r: any) { order.push("res2"); return r; },
      };
      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs", middlewares: [mw1, mw2] });
      await client.query("games", "fields name;");
      expect(order).toEqual(["req1", "req2", "res2", "res1"]);
    });
  });

  describe("queryCount", () => {
    test("hits {endpoint}/count and returns count number", async () => {
      global.fetch = mock((...args: any[]) => {
        if (String(args[0]) === TOKEN_URL) {
          return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
        }
        return new Response(JSON.stringify([{ count: 42 }]), { status: 200 });
      }) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs" });
      const count = await client.queryCount("games", "where rating > 80;");
      expect(count).toBe(42);
    });

    test("returns 0 on empty response", async () => {
      global.fetch = mock((...args: any[]) => {
        if (String(args[0]) === TOKEN_URL) {
          return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
        }
        return new Response(JSON.stringify([]), { status: 200 });
      }) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs" });
      const count = await client.queryCount("games", "where id = 999999;");
      expect(count).toBe(0);
    });
  });

  describe("getById", () => {
    test("fetches single item by id", async () => {
      global.fetch = mock((...args: any[]) => {
        if (String(args[0]) === TOKEN_URL) {
          return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
        }
        return new Response(JSON.stringify([{ id: 42, name: "Half-Life" }]), { status: 200 });
      }) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs" });
      const result = await client.game.getById(42, "name,rating");
      expect(result).toEqual({ id: 42, name: "Half-Life" });
    });

    test("defaults fields to name", async () => {
      global.fetch = mock((...args: any[]) => {
        if (String(args[0]) === TOKEN_URL) {
          return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
        }
        return new Response(JSON.stringify([{ id: 7, name: "Test" }]), { status: 200 });
      }) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs" });
      await client.game.getById(7);
      const apiCalls = (global.fetch as any).mock.calls.filter(
        (c: any) => String(c[0]).startsWith(BASE_URL),
      );
      expect(apiCalls[0][1].body).toBe("fields name; where id = 7;");
    });

    test("returns null when not found", async () => {
      global.fetch = mock((...args: any[]) => {
        if (String(args[0]) === TOKEN_URL) {
          return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
        }
        return new Response(JSON.stringify([]), { status: 200 });
      }) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs" });
      const result = await client.game.getById(999);
      expect(result).toBeNull();
    });

    test("getCount on sub-client delegates to queryCount", async () => {
      global.fetch = mock((...args: any[]) => {
        if (String(args[0]) === TOKEN_URL) {
          return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
        }
        return new Response(JSON.stringify([{ count: 7 }]), { status: 200 });
      }) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs" });
      const count = await client.game.getCount("where rating > 80;");
      expect(count).toBe(7);
    });
  });

  describe("debug", () => {
    test("debug: true logs requests and responses", async () => {
      global.fetch = okTokenFetch() as unknown as typeof fetch;

      const logs: string[] = [];
      const spy = mock((...args: any[]) => logs.push(args.join(" ")));
      spyOn(console, "log").mockImplementation(spy);

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs", debug: true });
      await client.query("games", "fields name;");

      expect(logs.some((l) => l.includes("[IGDB] →"))).toBe(true);
      expect(logs.some((l) => l.includes("[IGDB] ←"))).toBe(true);
    });
  });

  describe("custom HttpClient", () => {
    test("can inject a custom HttpClient", async () => {
      let called = false;
      const mockHttp: HttpClient = {
        post: async (_url, _headers, _body) => {
          called = true;
          return { status: 200, body: JSON.stringify([{ id: 1, name: "Custom" }]), headers: {} };
        },
      };

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs", httpClient: mockHttp });
      const result = await client.query("games", "fields name;");
      expect(called).toBe(true);
      expect(result).toEqual([{ id: 1, name: "Custom" }]);
    });
  });
});
