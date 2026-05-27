import { describe, expect, test, mock, afterEach } from "bun:test";
import { IGDBClient } from "../IGDBClient.js";

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

    test("throws on API error", async () => {
      global.fetch = mock((...args: any[]) => {
        if (String(args[0]) === TOKEN_URL) {
          return new Response(JSON.stringify({ access_token: "t", expires_in: 3600 }));
        }
        return new Response("Bad Request", { status: 400 });
      }) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "cid", clientSecret: "cs" });
      expect(client.query("games", "bad query;")).rejects.toThrow(
        "IGDB API error (games): 400 Bad Request",
      );
    });

    test("throws on auth failure", async () => {
      global.fetch = mock((..._: any[]) => new Response("", { status: 401 })) as unknown as typeof fetch;

      const client = new IGDBClient({ clientId: "bad", clientSecret: "bad" });
      expect(client.query("games", "fields name;")).rejects.toThrow(
        "Auth failed: 401 ",
      );
    });
  });
});
