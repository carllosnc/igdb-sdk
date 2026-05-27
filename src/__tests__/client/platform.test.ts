import { describe, expect, test, mock } from "bun:test";
import { PlatformClient } from "../../client/platform/index.js";

function createMockClient() {
  return { query: mock(async (endpoint: string, body: string) => [{ endpoint, body }]) };
}

describe("PlatformClient", () => {
  const endpoints = [
    ["getPlatforms", "platforms"],
    ["getFamilies", "platform_families"],
    ["getLogos", "platform_logos"],
    ["getTypes", "platform_types"],
    ["getVersions", "platform_versions"],
    ["getVersionCompanies", "platform_version_companies"],
    ["getVersionReleaseDates", "platform_version_release_dates"],
    ["getWebsites", "platform_websites"],
  ] as const;

  for (const [method, endpoint] of endpoints) {
    test(`${method} delegates to client.query with "${endpoint}"`, async () => {
      const mockClient = createMockClient();
      const client = new PlatformClient(mockClient as any);

      const body = "fields name; limit 1;";
      const result = await (client as any)[method](body);

      expect(mockClient.query).toHaveBeenCalledWith(endpoint, body);
      expect(result[0].endpoint).toBe(endpoint);
    });
  }
});
