import { describe, expect, test, mock } from "bun:test";
import { MiscClient } from "../../client/misc/index.js";

function createMockClient() {
  return { query: mock(async (endpoint: string, body: string) => [{ endpoint, body }]) };
}

describe("MiscClient", () => {
  const endpoints = [
    ["getAlternativeNames", "alternative_names"],
    ["getDateFormats", "date_formats"],
    ["getEntityTypes", "entity_types"],
    ["getFranchises", "franchises"],
    ["getGenres", "genres"],
    ["getInvolvedCompanies", "involved_companies"],
    ["getKeywords", "keywords"],
    ["getLanguages", "languages"],
    ["getLanguageSupports", "language_supports"],
    ["getLanguageSupportTypes", "language_support_types"],
    ["getMultiplayerModes", "multiplayer_modes"],
    ["getNetworkTypes", "network_types"],
    ["getPlayerPerspectives", "player_perspectives"],
    ["getRegions", "regions"],
    ["getThemes", "themes"],
  ] as const;

  for (const [method, endpoint] of endpoints) {
    test(`${method} delegates to client.query with "${endpoint}"`, async () => {
      const mockClient = createMockClient();
      const client = new MiscClient(mockClient as any);

      const body = "fields name; limit 1;";
      const result = await (client as any)[method](body);

      expect(mockClient.query).toHaveBeenCalledWith(endpoint, body);
      expect(result[0].endpoint).toBe(endpoint);
    });
  }
});
