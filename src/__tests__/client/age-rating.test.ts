import { describe, expect, test, mock } from "bun:test";
import { AgeRatingClient } from "../../client/age-rating/index.js";

function createMockClient() {
  return {
    query: mock(async (endpoint: string, body: string) => [
      { id: 1, endpoint, body },
    ]),
  };
}

describe("AgeRatingClient", () => {
  const endpoints = [
    ["getAgeRatings", "age_ratings"],
    ["getCategories", "age_rating_categories"],
    ["getContentDescriptions", "age_rating_content_descriptions"],
    ["getContentDescriptionTypes", "age_rating_content_description_types"],
    ["getContentDescriptionsV2", "age_rating_content_descriptions_v2"],
    ["getOrganizations", "age_rating_organizations"],
  ] as const;

  for (const [method, endpoint] of endpoints) {
    test(`${method} delegates to client.query with "${endpoint}"`, async () => {
      const mockClient = createMockClient();
      const client = new AgeRatingClient(mockClient as any);
      const body = "fields name; limit 1;";
      const result = await (client as any)[method](body);
      expect(mockClient.query).toHaveBeenCalledTimes(1);
      expect(mockClient.query).toHaveBeenCalledWith(endpoint, body);
      expect(result[0].endpoint).toBe(endpoint);
      expect(result[0].body).toBe(body);
    });
  }
});
