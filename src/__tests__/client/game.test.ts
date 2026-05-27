import { describe, expect, test, mock } from "bun:test";
import { GameClient } from "../../client/game/index.js";

function createMockClient() {
  return {
    query: mock(async (endpoint: string, body: string) => [
      { id: 1, endpoint, body },
    ]),
  };
}

describe("GameClient", () => {
  const endpoints = [
    ["getGames", "games"],
    ["getEngines", "game_engines"],
    ["getEngineLogos", "game_engine_logos"],
    ["getLocalizations", "game_localizations"],
    ["getModes", "game_modes"],
    ["getReleaseFormats", "game_release_formats"],
    ["getStatuses", "game_statuses"],
    ["getTimeToBeats", "game_time_to_beats"],
    ["getTypes", "game_types"],
    ["getVideos", "game_videos"],
  ] as const;

  for (const [method, endpoint] of endpoints) {
    test(`${method} delegates to client.query with "${endpoint}"`, async () => {
      const mockClient = createMockClient();
      const game = new GameClient(mockClient as any);

      const body = "fields name; limit 1;";
      const result = await (game as any)[method](body);

      expect(mockClient.query).toHaveBeenCalledTimes(1);
      expect(mockClient.query).toHaveBeenCalledWith(endpoint, body);
      expect(result[0].endpoint).toBe(endpoint);
      expect(result[0].body).toBe(body);
    });
  }
});
