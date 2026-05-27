import { describe, expect, test, mock } from "bun:test";
import { CharacterClient } from "../../client/character/index.js";

function createMockClient() {
  return {
    query: mock(async (endpoint: string, body: string) => [
      { id: 1, endpoint, body },
    ]),
  };
}

describe("CharacterClient", () => {
  const endpoints = [
    ["getCharacters", "characters"],
    ["getGenders", "character_genders"],
    ["getMugShots", "character_mug_shots"],
    ["getSpecies", "character_species"],
  ] as const;

  for (const [method, endpoint] of endpoints) {
    test(`${method} delegates to client.query with "${endpoint}"`, async () => {
      const mockClient = createMockClient();
      const client = new CharacterClient(mockClient as any);
      const body = "fields name; limit 1;";
      const result = await (client as any)[method](body);
      expect(mockClient.query).toHaveBeenCalledTimes(1);
      expect(mockClient.query).toHaveBeenCalledWith(endpoint, body);
      expect(result[0].endpoint).toBe(endpoint);
      expect(result[0].body).toBe(body);
    });
  }
});
