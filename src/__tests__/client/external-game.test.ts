import { describe, expect, test, mock } from "bun:test";
import { ExternalGameClient } from "../../client/external-game/index.js";

function createMockClient() {
  return {
    query: mock(async (endpoint: string, body: string) => [
      { id: 1, endpoint, body },
    ]),
  };
}

describe("ExternalGameClient", () => {
  const endpoints = [
    ["getExternalGames", "external_games"],
    ["getSources", "external_game_sources"],
  ] as const;

  for (const [method, endpoint] of endpoints) {
    test(`${method} delegates to client.query with "${endpoint}"`, async () => {
      const mockClient = createMockClient();
      const client = new ExternalGameClient(mockClient as any);
      const body = "fields name; limit 1;";
      const result = await (client as any)[method](body);
      expect(mockClient.query).toHaveBeenCalledTimes(1);
      expect(mockClient.query).toHaveBeenCalledWith(endpoint, body);
      expect(result[0].endpoint).toBe(endpoint);
      expect(result[0].body).toBe(body);
    });
  }
});
