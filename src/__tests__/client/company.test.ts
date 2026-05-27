import { describe, expect, test, mock } from "bun:test";
import { CompanyClient } from "../../client/company/index.js";

function createMockClient() {
  return {
    query: mock(async (endpoint: string, body: string) => [
      { id: 1, endpoint, body },
    ]),
  };
}

describe("CompanyClient", () => {
  const endpoints = [
    ["getCompanies", "companies"],
    ["getLogos", "company_logos"],
    ["getSizes", "company_sizes"],
    ["getStatuses", "company_statuses"],
    ["getTypeHistories", "company_type_histories"],
    ["getTypes", "company_types"],
    ["getWebsites", "company_websites"],
  ] as const;

  for (const [method, endpoint] of endpoints) {
    test(`${method} delegates to client.query with "${endpoint}"`, async () => {
      const mockClient = createMockClient();
      const client = new CompanyClient(mockClient as any);
      const body = "fields name; limit 1;";
      const result = await (client as any)[method](body);
      expect(mockClient.query).toHaveBeenCalledTimes(1);
      expect(mockClient.query).toHaveBeenCalledWith(endpoint, body);
      expect(result[0].endpoint).toBe(endpoint);
      expect(result[0].body).toBe(body);
    });
  }
});
