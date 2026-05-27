import { describe, expect, test, mock } from "bun:test";
import { CollectionClient } from "../../client/collection/index.js";

function createMockClient() {
  return {
    query: mock(async (endpoint: string, body: string) => [
      { id: 1, endpoint, body },
    ]),
  };
}

describe("CollectionClient", () => {
  const endpoints = [
    ["getCollections", "collections"],
    ["getMemberships", "collection_memberships"],
    ["getMembershipTypes", "collection_membership_types"],
    ["getRelations", "collection_relations"],
    ["getRelationTypes", "collection_relation_types"],
    ["getTypes", "collection_types"],
  ] as const;

  for (const [method, endpoint] of endpoints) {
    test(`${method} delegates to client.query with "${endpoint}"`, async () => {
      const mockClient = createMockClient();
      const client = new CollectionClient(mockClient as any);
      const body = "fields name; limit 1;";
      const result = await (client as any)[method](body);
      expect(mockClient.query).toHaveBeenCalledTimes(1);
      expect(mockClient.query).toHaveBeenCalledWith(endpoint, body);
      expect(result[0].endpoint).toBe(endpoint);
      expect(result[0].body).toBe(body);
    });
  }
});
